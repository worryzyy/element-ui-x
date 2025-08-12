/**
 * AI提供商基础抽象类
 */
export class BaseAIProvider {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.icon = config.icon;
    this.baseURL = config.baseURL;
    this.authConfig = config.authConfig;
  }

  /**
   * 获取认证配置
   */
  getAuthConfig() {
    return this.authConfig;
  }

  /**
   * 构建请求对象 - 需要子类实现
   */
  buildRequest(prompt, options = {}) {
    throw new Error('buildRequest method must be implemented by subclass');
  }

  /**
   * 解析响应数据 - 需要子类实现
   */
  parseResponse(data) {
    throw new Error('parseResponse method must be implemented by subclass');
  }

  /**
   * 处理错误 - 需要子类实现
   */
  handleError(error) {
    throw new Error('handleError method must be implemented by subclass');
  }

  /**
   * 验证认证配置
   */
  validateAuth(authData) {
    const requiredFields = this.authConfig.fields.filter(field => field.required);
    
    for (const field of requiredFields) {
      if (!authData[field.key] || !authData[field.key].trim()) {
        return {
          valid: false,
          message: `请填写${field.label}`
        };
      }
    }
    
    return { valid: true };
  }

  /**
   * 构建认证头
   */
  buildAuthHeaders(authData) {
    // 基础实现，子类可以重写
    return {};
  }
}