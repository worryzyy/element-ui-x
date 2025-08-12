/**
 * AI提供商注册中心
 */
class AIProviderRegistry {
  constructor() {
    this.providers = new Map();
  }

  /**
   * 注册提供商
   */
  register(provider) {
    if (!provider.id) {
      throw new Error('Provider must have an id');
    }
    this.providers.set(provider.id, provider);
  }

  /**
   * 获取提供商
   */
  getProvider(id) {
    return this.providers.get(id);
  }

  /**
   * 获取所有提供商
   */
  getAllProviders() {
    return Array.from(this.providers.values());
  }

  /**
   * 获取提供商列表（用于UI选择）
   */
  getProviderList() {
    return this.getAllProviders().map(provider => ({
      id: provider.id,
      name: provider.name,
      icon: provider.icon
    }));
  }

  /**
   * 检查提供商是否存在
   */
  hasProvider(id) {
    return this.providers.has(id);
  }
}

// 创建全局注册中心实例
export const providerRegistry = new AIProviderRegistry();

// 便捷方法
export const registerProvider = (provider) => providerRegistry.register(provider);
export const getProvider = (id) => providerRegistry.getProvider(id);
export const getAllProviders = () => providerRegistry.getAllProviders();
export const getProviderList = () => providerRegistry.getProviderList();