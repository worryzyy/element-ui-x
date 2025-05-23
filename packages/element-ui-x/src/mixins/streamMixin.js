/**
 * @fileoverview Vue2 流式数据处理 Mixin
 * 从 Vue3 useXStream hooks 转换而来，支持 SSE 数据解析和中断功能
 * @author Element UI X Team
 * @version 1.0.0
 */

/**
 * 默认流分隔符
 * @type {string}
 * @constant
 */
const DEFAULT_STREAM_SEPARATOR = '\n\n';

/**
 * 默认部分分隔符
 * @type {string}
 * @constant
 */
const DEFAULT_PART_SEPARATOR = '\n';

/**
 * 默认键值分隔符
 * @type {string}
 * @constant
 */
const DEFAULT_KV_SEPARATOR = ':';

/**
 * SSE 字段类型定义
 * @typedef {'data'|'event'|'id'|'retry'} SSEFields
 */

/**
 * SSE 输出对象类型
 * @typedef {Object} SSEOutput
 * @property {string} [data] - 数据字段
 * @property {string} [event] - 事件字段
 * @property {string} [id] - ID字段
 * @property {string} [retry] - 重试字段
 */

/**
 * 流配置选项
 * @typedef {Object} XStreamOptions
 * @property {ReadableStream<Uint8Array>} readableStream - 可读流
 * @property {TransformStream<string, *>} [transformStream] - 可选的转换流
 */

/**
 * 流状态对象
 * @typedef {Object} StreamState
 * @property {Array<*>} data - 流数据数组
 * @property {Error|null} error - 错误信息
 * @property {boolean} loading - 加载状态
 */

/**
 * 流回调函数配置
 * @typedef {Object} StreamCallbacks
 * @property {function(*): void} [onData] - 数据回调函数
 * @property {function(Array<*>): void} [onComplete] - 完成回调函数
 * @property {function(Error): void} [onError] - 错误回调函数
 * @property {function(): void} [onCancel] - 取消回调函数
 * @property {function(): void} [onFinish] - 结束回调函数
 */

/**
 * 流工具函数返回对象
 * @typedef {Object} StreamUtils
 * @property {StreamState} state - 流状态
 * @property {function(XStreamOptions): Promise<void>} startStream - 启动流处理
 * @property {function(): void} cancel - 取消流处理
 * @property {function(): void} reset - 重置流状态
 */

/**
 * 验证字符串是否有效（非空且非空白）
 * @param {string} str - 待验证的字符串
 * @returns {boolean} 是否为有效字符串
 */
const isValidString = str => (str === null || str === undefined ? '' : str).trim() !== '';

/**
 * 创建流分割转换器
 * 按照默认分隔符分割流数据
 * @returns {TransformStream<string, string>} 流分割转换器
 */
function splitStream() {
  let buffer = '';

  return new TransformStream({
    /**
     * 转换函数
     * @param {string} chunk - 数据块
     * @param {TransformStreamDefaultController<string>} controller - 控制器
     */
    transform(chunk, controller) {
      buffer += chunk;
      const parts = buffer.split(DEFAULT_STREAM_SEPARATOR);
      parts.slice(0, -1).forEach(part => {
        if (isValidString(part)) controller.enqueue(part);
      });
      buffer = parts[parts.length - 1];
    },
    /**
     * 刷新函数
     * @param {TransformStreamDefaultController<string>} controller - 控制器
     */
    flush(controller) {
      if (isValidString(buffer)) controller.enqueue(buffer);
    },
  });
}

/**
 * 创建 SSE 数据解析转换器
 * 将文本数据解析为 SSE 格式对象
 * @returns {TransformStream<string, SSEOutput>} SSE 解析转换器
 */
function splitPart() {
  return new TransformStream({
    /**
     * 转换函数
     * @param {string} partChunk - 数据块
     * @param {TransformStreamDefaultController<SSEOutput>} controller - 控制器
     */
    transform(partChunk, controller) {
      const lines = partChunk.split(DEFAULT_PART_SEPARATOR);
      const sseEvent = lines.reduce((acc, line) => {
        const sepIndex = line.indexOf(DEFAULT_KV_SEPARATOR);
        if (sepIndex === -1) return acc;

        const key = line.slice(0, sepIndex);
        if (!isValidString(key)) return acc;

        const value = line.slice(sepIndex + 1);
        return {
          ...acc,
          [key]: value,
        };
      }, {});

      if (Object.keys(sseEvent).length > 0) controller.enqueue(sseEvent);
    },
  });
}

/**
 * 核心流处理函数（支持中断）
 * @param {XStreamOptions} options - 配置选项
 * @param {ReadableStream<Uint8Array>} options.readableStream - 可读流
 * @param {TransformStream<string, *>} [options.transformStream] - 可选的转换流
 * @param {AbortSignal} [signal] - 中断信号
 * @returns {ReadableStream<*>} 处理后的流，支持异步迭代
 * @throws {TypeError} 当 readableStream 不是 ReadableStream 实例时抛出
 */
function XStream(options, signal) {
  const { readableStream, transformStream } = options;
  if (!(readableStream instanceof ReadableStream)) {
    throw new TypeError('options.readableStream 必须是 ReadableStream 的实例。');
  }

  const decoderStream = new TextDecoderStream();
  const processedStream = transformStream
    ? readableStream.pipeThrough(decoderStream).pipeThrough(transformStream)
    : readableStream.pipeThrough(decoderStream).pipeThrough(splitStream()).pipeThrough(splitPart());

  // 为流添加异步迭代器并处理中断信号
  processedStream[Symbol.asyncIterator] = async function* () {
    const reader = this.getReader();
    this.reader = reader; // 保存读取器引用
    try {
      while (true) {
        if (signal && signal.aborted) {
          await reader.cancel(); // 主动取消 reader
          break;
        }
        const { done, value } = await reader.read();
        if (done) break;
        if (value) yield value;
      }
    } finally {
      reader.releaseLock(); // 释放锁
    }
  };

  return processedStream;
}

/**
 * streamMixin - Vue2 版本
 * 用于处理流式数据的 mixin，支持 SSE 数据解析和中断功能
 * @namespace streamMixin
 * @type {Object}
 */
export const streamMixin = {
  /**
   * 组件数据
   * @returns {Object} 响应式数据对象
   * @property {Array<*>} streamData - 流数据数组
   * @property {Error|null} streamError - 流错误信息
   * @property {boolean} streamLoading - 流处理状态
   * @property {AbortController|null} _abortController - 私有：中断控制器
   * @property {ReadableStream|null} _currentStream - 私有：当前流引用
   */
  data() {
    return {
      streamData: [],
      streamError: null,
      streamLoading: false,
      _abortController: null,
      _currentStream: null,
    };
  },

  methods: {
    /**
     * 启动流式请求
     * @async
     * @param {XStreamOptions} options - 流配置选项
     * @param {ReadableStream<Uint8Array>} options.readableStream - 可读流
     * @param {TransformStream<string, *>} [options.transformStream] - 可选的转换流
     * @returns {Promise<void>} 流处理完成的 Promise
     * @fires streamMixin#stream-data - 收到新数据时触发
     * @fires streamMixin#stream-complete - 流完成时触发
     * @fires streamMixin#stream-error - 流错误时触发
     * @fires streamMixin#stream-finish - 流处理结束时触发
     * @example
     * // 基础使用
     * const response = await fetch('/api/stream')
     * await this.startStream({ readableStream: response.body })
     *
     * // 使用自定义转换流
     * const customTransform = new TransformStream({ ... })
     * await this.startStream({
     *   readableStream: response.body,
     *   transformStream: customTransform
     * })
     */
    async startStream(options) {
      this.streamLoading = true;
      this.streamError = null;
      this.streamData = [];
      this._abortController = new AbortController();
      this._currentStream = XStream(options, this._abortController.signal);

      try {
        for await (const item of this._currentStream) {
          this.streamData.push(item);
          // 触发数据更新事件
          /**
           * 流数据事件
           * @event streamMixin#stream-data
           * @type {*} 流数据项
           */
          this.$emit('stream-data', item);
        }
        // 流完成事件
        /**
         * 流完成事件
         * @event streamMixin#stream-complete
         * @type {Array<*>} 所有流数据
         */
        this.$emit('stream-complete', this.streamData);
      } catch (err) {
        if (err instanceof Error) {
          this.streamError = err;
          /**
           * 流错误事件
           * @event streamMixin#stream-error
           * @type {Error} 错误对象
           */
          this.$emit('stream-error', err);
        }
      } finally {
        this.streamLoading = false;
        this._currentStream = null; // 释放流引用
        this._abortController = null; // 释放控制器
        /**
         * 流处理结束事件
         * @event streamMixin#stream-finish
         */
        this.$emit('stream-finish');
      }
    },

    /**
     * 中断流式请求（强制关闭流）
     * @returns {void}
     * @fires streamMixin#stream-cancel - 流被中断时触发
     * @example
     * this.cancelStream()
     */
    cancelStream() {
      if (this._abortController) {
        this._abortController.abort();
        /**
         * 流取消事件
         * @event streamMixin#stream-cancel
         */
        this.$emit('stream-cancel');
      }
    },

    /**
     * 重置流状态
     * 清空所有数据和状态，但不触发事件
     * @returns {void}
     * @example
     * this.resetStream()
     */
    resetStream() {
      this.streamData = [];
      this.streamError = null;
      this.streamLoading = false;
      this._abortController = null;
      this._currentStream = null;
    },

    /**
     * 创建流处理器的便捷方法
     * @param {ReadableStream<Uint8Array>} readableStream - 可读流
     * @param {TransformStream<string, *>} [transformStream] - 可选的转换流
     * @returns {XStreamOptions} 流处理器配置对象
     * @example
     * const processor = this.createStreamProcessor(response.body)
     * await this.startStream(processor)
     */
    createStreamProcessor(readableStream, transformStream) {
      return {
        readableStream,
        transformStream,
      };
    },
  },

  /**
   * 组件销毁前的生命周期钩子
   * 自动清理流资源
   * @returns {void}
   */
  beforeDestroy() {
    // 组件销毁时清理资源
    this.cancelStream();
  },
};

/**
 * 工具函数版本 - 用于非组件场景
 * @param {StreamCallbacks} [callbacks={}] - 回调函数配置
 * @param {function(*): void} [callbacks.onData] - 数据回调函数
 * @param {function(Array<*>): void} [callbacks.onComplete] - 完成回调函数
 * @param {function(Error): void} [callbacks.onError] - 错误回调函数
 * @param {function(): void} [callbacks.onCancel] - 取消回调函数
 * @param {function(): void} [callbacks.onFinish] - 结束回调函数
 * @returns {StreamUtils} 包含流处理相关方法的对象
 * @example
 * // 基础使用
 * const streamUtils = createStreamUtils({
 *   onData: (item) => console.log('数据:', item),
 *   onComplete: (allData) => console.log('完成:', allData),
 *   onError: (error) => console.error('错误:', error)
 * })
 *
 * const response = await fetch('/api/stream')
 * await streamUtils.startStream({ readableStream: response.body })
 */
export function createStreamUtils(callbacks = {}) {
  /**
   * 流状态对象
   * @type {StreamState}
   */
  const state = {
    data: [],
    error: null,
    loading: false,
  };

  let abortController = null;
  let currentStream = null;

  /**
   * 启动流处理
   * @async
   * @param {XStreamOptions} options - 流配置选项
   * @returns {Promise<void>} 流处理完成的 Promise
   */
  const startStream = async options => {
    state.loading = true;
    state.error = null;
    state.data = [];
    abortController = new AbortController();
    currentStream = XStream(options, abortController.signal);

    try {
      for await (const item of currentStream) {
        state.data.push(item);
        if (callbacks.onData) {
          callbacks.onData(item);
        }
      }
      if (callbacks.onComplete) {
        callbacks.onComplete(state.data);
      }
    } catch (err) {
      if (err instanceof Error) {
        state.error = err;
        if (callbacks.onError) {
          callbacks.onError(err);
        }
      }
    } finally {
      state.loading = false;
      currentStream = null;
      abortController = null;
      if (callbacks.onFinish) {
        callbacks.onFinish();
      }
    }
  };

  /**
   * 取消流处理
   * @returns {void}
   */
  const cancel = () => {
    if (abortController) {
      abortController.abort();
      if (callbacks.onCancel) {
        callbacks.onCancel();
      }
    }
  };

  /**
   * 重置流状态
   * @returns {void}
   */
  const reset = () => {
    state.data = [];
    state.error = null;
    state.loading = false;
    abortController = null;
    currentStream = null;
  };

  return {
    state,
    startStream,
    cancel,
    reset,
  };
}

// 导出常量和工具函数
export {
  /**
   * 默认键值分隔符
   * @type {string}
   */
  DEFAULT_KV_SEPARATOR,
  /**
   * 默认部分分隔符
   * @type {string}
   */
  DEFAULT_PART_SEPARATOR,
  /**
   * 默认流分隔符
   * @type {string}
   */
  DEFAULT_STREAM_SEPARATOR,
  /**
   * 字符串验证函数
   * @type {function(string): boolean}
   */
  isValidString,
  /**
   * SSE 数据解析转换器
   * @type {function(): TransformStream<string, SSEOutput>}
   */
  splitPart,
  /**
   * 流分割转换器
   * @type {function(): TransformStream<string, string>}
   */
  splitStream,
  /**
   * 核心流处理函数
   * @type {function(XStreamOptions, AbortSignal=): ReadableStream}
   */
  XStream,
};

/**
 * 默认导出 streamMixin
 * @type {Object}
 */
export default streamMixin;
