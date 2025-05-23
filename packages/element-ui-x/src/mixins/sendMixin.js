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
            this._onFinish && this._onFinish(this._messages);
            return;
          }

          if (value) {
            const chunk = decoder.decode(value, {
              stream: true,
            });
            const chunkUse = chunk.startsWith('data: ') ? chunk.slice(6) : chunk;

            try {
              const res = this._transformer ? this._transformer(chunkUse) : chunkUse;
              this._messages.push(res);
              this._onMessage && this._onMessage(res);
            } catch (error) {
              this._onError && this._onError(error);
              this._controller && this._controller.abort();
              return Promise.reject(error);
            }
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

  _sendWithSSE(url, options = {}) {
    const es = new EventSource(this._baseURL + url, {
      ...this._baseOptions,
      ...options,
    });

    es.onmessage = e => {
      const res = this._transformer ? this._transformer(e.data) : e;
      this._onMessage && this._onMessage(res);
    };

    es.onopen = () => {
      this._onOpen && this._onOpen();
    };

    es.onerror = ev => {
      if (es.readyState === EventSource.CLOSED) {
        this._onFinish && this._onFinish(this._messages);
      } else {
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
    if (this._instance && this._instance.close) {
      this._instance.close();
    }
    this._instance = null;

    if (this._controller) {
      this._controller.abort();
    }
    this._controller = null;

    this._onAbort && this._onAbort(this._messages);
    this._messages = [];
  }
}

/**
 * sendMixin - Vue2 版本
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
