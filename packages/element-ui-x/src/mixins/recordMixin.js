/**
 * @description 提供语音识别的混入，允许语音输入并处理开始、结束、结果及错误等各种事件。
 * @mixin recordMixin
 */

export default {
  data() {
    return {
      // 语音识别状态
      recordLoading: false,
      // 识别结果
      recordValue: '',
      // 识别实例
      recordRecognition: null,
      // 配置选项
      recordOptions: {
        onError: null,
        onStart: null,
        onEnd: null,
        onResult: null,
      },
    };
  },

  methods: {
    /**
     * 初始化语音识别配置
     * @param {Object} options - 配置选项
     * @param {Function} [options.onError] - 错误回调
     * @param {Function} [options.onStart] - 开始回调
     * @param {Function} [options.onEnd] - 结束回调
     * @param {Function} [options.onResult] - 结果回调
     */
    initRecord(options = {}) {
      this.recordOptions = {
        ...this.recordOptions,
        ...options,
      };
    },

    /**
     * 开始语音识别
     */
    startRecord() {
      if ('webkitSpeechRecognition' in window) {
        this.recordRecognition = new window.webkitSpeechRecognition();
        this.recordRecognition.continuous = true;
        this.recordRecognition.interimResults = true;
        this.recordRecognition.lang = 'zh-CN';

        this.recordRecognition.onstart = () => {
          this.recordLoading = true;
          this.recordValue = '';
          if (this.recordOptions.onStart) {
            this.recordOptions.onStart();
          }
        };

        this.recordRecognition.onend = () => {
          this.recordLoading = false;
          if (this.recordOptions.onEnd) {
            this.recordOptions.onEnd(this.recordValue);
          }
        };

        this.recordRecognition.onerror = e => {
          this.recordLoading = false;
          if (this.recordOptions.onError) {
            this.recordOptions.onError(e);
          }
        };

        this.recordRecognition.onresult = e => {
          let results = '';
          for (let i = 0; i <= e.resultIndex; i++) {
            results += e.results[i][0].transcript;
          }
          this.recordValue = results;
          if (this.recordOptions.onResult) {
            this.recordOptions.onResult(results);
          }
        };

        this.recordRecognition.start();
      } else {
        const error = {
          code: -1,
          message: 'The current browser does not support voice recognition',
        };
        if (this.recordOptions.onError) {
          this.recordOptions.onError(error);
        }
      }
    },

    /**
     * 停止语音识别
     */
    stopRecord() {
      if (this.recordRecognition) {
        this.recordRecognition.stop();
      }
    },

    /**
     * 清理语音识别资源
     */
    cleanupRecord() {
      this.stopRecord();
      this.recordRecognition = null;
    },
  },

  beforeDestroy() {
    this.cleanupRecord();
  },
};
