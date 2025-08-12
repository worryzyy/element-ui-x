import { XRequest } from 'vue-element-ui-x';
import { getAllProviders, getProvider } from './index.js';
import { initializeProviders } from './providers/index.js';

/**
 * AI API统一管理器
 */
export class AIAPIManager {
  constructor() {
    this.currentProvider = null;
    this.xRequest = null;
    this.isInitialized = false;
  }

  /**
   * 初始化管理器
   */
  initialize() {
    if (!this.isInitialized) {
      initializeProviders();
      this.isInitialized = true;
    }
  }

  /**
   * 获取所有可用的提供商
   */
  getAvailableProviders() {
    this.initialize();
    return getAllProviders().map(provider => ({
      id: provider.id,
      name: provider.name,
      icon: provider.icon,
      authConfig: provider.getAuthConfig(),
    }));
  }

  /**
   * 设置当前提供商
   */
  setProvider(providerId) {
    this.initialize();
    this.currentProvider = getProvider(providerId);
    if (!this.currentProvider) {
      throw new Error(`未找到提供商: ${providerId}`);
    }
  }

  /**
   * 验证认证配置
   */
  validateAuth(authData) {
    if (!this.currentProvider) {
      throw new Error('请先选择AI提供商');
    }
    return this.currentProvider.validateAuth(authData);
  }

  /**
   * 发送请求
   */
  async sendRequest(prompt, authData, options = {}) {
    if (!this.currentProvider) {
      throw new Error('请先选择AI提供商');
    }

    // 验证认证
    const authValidation = this.validateAuth(authData);
    if (!authValidation.valid) {
      throw new Error(authValidation.message);
    }

    // 构建请求
    const requestConfig = this.currentProvider.buildRequest(prompt, {
      authData,
      ...options,
    });

    // 获取baseURL（支持动态设置）
    let baseURL = this.currentProvider.baseURL;
    if (authData.baseURL) {
      baseURL = authData.baseURL.replace(/\/$/, ''); // 移除末尾斜杠
    }

    // 创建XRequest实例
    this.xRequest = new XRequest({
      type: 'fetch',
      baseURL: baseURL,
      transformer: data => {
        const parsed = this.currentProvider.parseResponse(data);
        return parsed.content;
      },
      onMessage: options.onMessage || (() => {}),
      onError: error => {
        const standardError = this.currentProvider.handleError(error);
        if (options.onError) {
          options.onError(standardError);
        }
      },
      onAbort: options.onAbort || (() => {}),
      onFinish: options.onFinish || (() => {}),
      onOpen: options.onOpen || (() => {}),
    });

    // 发送请求
    return this.xRequest.send(requestConfig.url, {
      method: requestConfig.method,
      headers: requestConfig.headers,
      body: requestConfig.body,
    });
  }

  /**
   * 中止当前请求
   */
  abort() {
    if (this.xRequest) {
      this.xRequest.abort();
    }
  }

  /**
   * 获取当前提供商信息
   */
  getCurrentProvider() {
    return this.currentProvider
      ? {
          id: this.currentProvider.id,
          name: this.currentProvider.name,
          icon: this.currentProvider.icon,
        }
      : null;
  }

  /**
   * 获取提供商的认证配置
   */
  getProviderAuthConfig(providerId) {
    this.initialize();
    const provider = getProvider(providerId);
    return provider ? provider.getAuthConfig() : null;
  }
}

// 创建全局实例
export const aiAPIManager = new AIAPIManager();
