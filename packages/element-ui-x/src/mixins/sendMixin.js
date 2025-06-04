/**
 * XRequest 类 - 用于处理 SSE 和 Fetch 请求
 */
export class XRequest {
  constructor(options = {}) {
    const {
      baseURL,
      onAbort,
      onMessage,
      onError,
      baseOptions,
      transformer,
      type,
      onFinish,
      onOpen,
    } = options;

    this._instance = null;
    this._transformer = transformer;
    this._baseURL = baseURL || '';
    this._baseOptions = baseOptions || {};
    this._onAbort = onAbort;
    this._onMessage = onMessage;
    this._onError = onError;
    this._onOpen = onOpen;
    this._type = type || 'sse';
    this._controller = null;
    this._onFinish = onFinish;
    this._messages = [];
    // 添加结束标志和超时控制
    this._isFinished = false;
    this._finishTimeout = null;

    // 绑定方法上下文
    this.abort = this.abort.bind(this);
    this.send = this.send.bind(this);
  }

  _sendWithFetch(url, options = {}) {
    this._controller = new AbortController();
    const signal = this._controller.signal;
    const fetchOptions = {
      ...options,
      signal,
    };

    // 用于存储跨 chunk 的不完整数据
    let buffer = '';

    return fetch(this._baseURL + url, fetchOptions)
      .then(res => res.body)
      .then(async body => {
        if (!body) {
          return Promise.reject(new Error('Response body is null in stream mode'));
        }

        const reader = body.getReader();
        const decoder = new TextDecoder('utf-8');
        let done = false;

        while (!done) {
          const { value, done: streamDone } = await reader.read();
          done = streamDone;

          if (streamDone) {
            // 处理缓冲区中剩余的数据
            if (buffer.trim()) {
              this.processBufferData(buffer);
            }
            this._onFinish && this._onFinish(this._messages);
            return;
          }

          if (value) {
            const chunk = decoder.decode(value, {
              stream: true,
            });
            // console.log('chunk:', chunk);
            // 将新数据添加到缓冲区
            buffer += chunk;

            // 处理缓冲区中的完整行
            buffer = this.processBuffer(buffer);
            // const chunkUse = chunk.startsWith('data: ') ? chunk.slice(6) : chunk;

            // try {
            //   const res = this._transformer ? this._transformer(chunkUse) : chunkUse;
            //   this._messages.push(res);
            //   this._onMessage && this._onMessage(res);
            // } catch (error) {
            //   this._onError && this._onError(error);
            //   this._controller && this._controller.abort();
            //   return Promise.reject(error);
            // }
          }
        }
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          this._onAbort && this._onAbort(this._messages);
          return;
        }
        this._onError && this._onError(err);
        this._controller && this._controller.abort();
      });
  }
  /**
   * 处理缓冲区数据，提取完整的行
   * @param {string} buffer - 缓冲区数据
   * @returns {string} 剩余的不完整数据
   */
  processBuffer(buffer) {
    const lines = buffer.split('\n');
    // console.log('lines:', lines);
    // 保留最后一行（可能不完整）
    const remainingData = lines.pop();

    // 处理完整的行
    for (const line of lines) {
      this.processLine(line);
    }

    return remainingData || '';
  }

  /**
   * 处理单行数据
   * @param {string} line - 单行数据
   */
  processLine(line) {
    // 跳过空行
    if (!line.trim()) {
      return;
    }

    // 处理 data: 开头的行
    if (line.startsWith('data: ')) {
      const dataContent = line.slice(6);

      // 检查是否是结束标识
      if (dataContent.trim() === '[DONE]') {
        this._isFinished = true;
        this._onFinish && this._onFinish(this._messages);
        this.abort();
        return;
      }

      // 跳过空数据
      if (!dataContent.trim()) {
        return;
      }

      try {
        // 尝试解析和处理数据
        let processedData;
        try {
          // 首先尝试作为 JSON 解析
          processedData = JSON.parse(dataContent);
        } catch {
          // 如果不是 JSON，使用原始数据
          processedData = dataContent;
        }
        // console.log('processedData:', processedData, processedData.answer);

        const res = this._transformer ? this._transformer(processedData) : processedData;
        this._messages.push(res);
        this._onMessage && this._onMessage(res);
      } catch (error) {
        console.error('Error processing line:', line, error);
        this._onError && this._onError(error);
        this._controller && this._controller.abort();
      }
    }
    // 可以在这里处理其他类型的行（如果需要）
  }

  /**
   * 处理缓冲区中剩余的数据（在流结束时调用）
   * @param {string} buffer - 剩余的缓冲区数据
   */
  processBufferData(buffer) {
    const lines = buffer.split('\n');
    for (const line of lines) {
      this.processLine(line);
    }
  }

  _sendWithSSE(url, options = {}) {
    const es = new EventSource(this._baseURL + url, {
      ...this._baseOptions,
      ...options,
    });

    es.onmessage = e => {
      // 检查是否是结束消息
      if (e.data === '[DONE]' || e.data === 'data: [DONE]') {
        this._isFinished = true;
        this._onFinish && this._onFinish(this._messages);
        this.abort();
        return;
      }

      const res = this._transformer ? this._transformer(e.data) : e;
      this._messages.push(res);
      this._onMessage && this._onMessage(res);

      // 重置超时定时器
      if (this._finishTimeout) {
        clearTimeout(this._finishTimeout);
      }

      // 设置超时检测：如果 10 秒内没有新消息，认为连接可能已结束
      this._finishTimeout = setTimeout(() => {
        if (!this._isFinished && es.readyState !== EventSource.CONNECTING) {
          this._isFinished = true;
          this._onFinish && this._onFinish(this._messages);
          this.abort();
        }
      }, 10000);
    };

    es.onopen = () => {
      this._onOpen && this._onOpen();
    };

    es.onerror = ev => {
      // 清除超时定时器
      if (this._finishTimeout) {
        clearTimeout(this._finishTimeout);
        this._finishTimeout = null;
      }

      // 如果已经标记为结束，直接返回
      if (this._isFinished) {
        return;
      }

      // 更可靠的结束检测逻辑
      if (
        es.readyState === EventSource.CLOSED ||
        (this._messages.length > 0 && es.readyState !== EventSource.CONNECTING)
      ) {
        // 有消息且连接状态不是正在连接，很可能是正常结束
        this._isFinished = true;
        this._onFinish && this._onFinish(this._messages);
      } else {
        // 真正的错误情况
        this._onError && this._onError(es, ev);
      }
      this.abort();
    };

    this._instance = es;
    return es;
  }

  send(url, options = {}) {
    switch (this._type) {
      case 'fetch':
        this._sendWithFetch(url, options);
        break;
      default:
        this._sendWithSSE(url, options);
    }
    return this;
  }

  abort() {
    // 清除超时定时器
    if (this._finishTimeout) {
      clearTimeout(this._finishTimeout);
      this._finishTimeout = null;
    }

    if (this._instance && this._instance.close) {
      this._instance.close();
    }
    this._instance = null;

    if (this._controller) {
      this._controller.abort();
    }
    this._controller = null;

    // 只有在未正常结束时才调用 onAbort
    if (!this._isFinished) {
      this._onAbort && this._onAbort(this._messages);
    }

    this._messages = [];
    this._isFinished = false;
  }
}

/**
 * sendMixin -
 * 用于处理发送操作管理请求状态的 mixin，支持可选的中止功能，同时支持 Promise 和 SSE（服务端事件）
 */
export const sendMixin = {
  data() {
    return {
      loading: false,
      _sendPromise: null,
      _sendController: null,
    };
  },

  methods: {
    /**
     * 初始化发送配置
     * @param {Object} options - 配置选项
     * @param {Function} options.onAbort - 中止回调
     * @param {Function} options.sendHandler - 发送处理器
     * @param {Function} options.abortHandler - 中止处理器
     * @param {Function} options.finishHandler - 完成处理器
     */
    initSend(options = {}) {
      this._sendOptions = {
        onAbort: options.onAbort,
        sendHandler: options.sendHandler,
        abortHandler: options.abortHandler,
        finishHandler: options.finishHandler,
      };
    },

    /**
     * 发送操作
     * @param {...any} args - 传递给 sendHandler 的参数
     */
    handleSend(...args) {
      if (this.loading) {
        return;
      }

      if (this._sendOptions && this._sendOptions.sendHandler) {
        this._sendOptions.sendHandler(...args);
      }

      this.loading = true;
    },

    /**
     * 中止操作
     */
    handleAbort() {
      this.loading = false;

      if (this._sendOptions && this._sendOptions.abortHandler) {
        this._sendOptions.abortHandler();
      }

      if (this._sendOptions && this._sendOptions.onAbort) {
        this._sendOptions.onAbort();
      }
    },

    /**
     * 完成操作
     */
    handleFinish() {
      this.loading = false;

      if (this._sendOptions && this._sendOptions.finishHandler) {
        this._sendOptions.finishHandler();
      }
    },

    /**
     * 创建 XRequest 实例的便捷方法
     * @param {Object} options - XRequest 配置选项
     * @returns {XRequest} XRequest 实例
     */
    createXRequest(options = {}) {
      return new XRequest({
        ...options,
        onAbort: (...args) => {
          this.handleAbort();
          if (options.onAbort) {
            options.onAbort(...args);
          }
        },
        onFinish: (...args) => {
          this.handleFinish();
          if (options.onFinish) {
            options.onFinish(...args);
          }
        },
      });
    },
  },

  beforeDestroy() {
    // 组件销毁时清理资源
    if (this._sendController) {
      this._sendController.abort();
    }
  },
};

/**
 * 工具函数版本 - 用于非组件场景
 * @param {Object} options - 配置选项
 * @returns {Object} 包含发送相关方法的对象
 */
export function createSendUtils(options = {}) {
  const state = {
    loading: false,
  };

  const handleSend = (...args) => {
    if (state.loading) {
      return;
    }

    if (options.sendHandler) {
      options.sendHandler(...args);
    }

    state.loading = true;
  };

  const handleAbort = () => {
    state.loading = false;

    if (options.abortHandler) {
      options.abortHandler();
    }

    if (options.onAbort) {
      options.onAbort();
    }
  };

  const handleFinish = () => {
    state.loading = false;

    if (options.finishHandler) {
      options.finishHandler();
    }
  };

  return {
    state,
    send: handleSend,
    abort: handleAbort,
    finish: handleFinish,
  };
}

export default sendMixin;
