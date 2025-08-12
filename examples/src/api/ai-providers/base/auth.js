/**
 * 认证类型枚举
 */
export const AuthType = {
  API_KEY: 'api_key',
  APP_SECRET: 'app_secret',
  TOKEN: 'token',
  OAUTH: 'oauth',
};

/**
 * 通用认证配置模板
 */
export const AuthConfigs = {
  // API Key + App ID 模式（如阿里云）
  API_KEY_WITH_APP_ID: {
    type: AuthType.API_KEY,
    fields: [
      {
        key: 'appId',
        label: 'APP ID',
        type: 'text',
        required: true,
        placeholder: '请输入APP ID',
      },
      {
        key: 'apiKey',
        label: 'API Key',
        type: 'password',
        required: true,
        placeholder: '请输入API Key',
      },
    ],
  },

  // 简单API Key模式（如OpenAI）
  SIMPLE_API_KEY: {
    type: AuthType.API_KEY,
    fields: [
      {
        key: 'apiKey',
        label: 'API Key',
        type: 'password',
        required: true,
        placeholder: '请输入API Key',
      },
    ],
  },

  // App Key + Secret模式（如百度）
  APP_KEY_SECRET: {
    type: AuthType.APP_SECRET,
    fields: [
      {
        key: 'apiKey',
        label: 'API Key',
        type: 'text',
        required: true,
        placeholder: '请输入API Key',
      },
      {
        key: 'secretKey',
        label: 'Secret Key',
        type: 'password',
        required: true,
        placeholder: '请输入Secret Key',
      },
    ],
  },

  // Access Token模式
  ACCESS_TOKEN: {
    type: AuthType.TOKEN,
    fields: [
      {
        key: 'accessToken',
        label: 'Access Token',
        type: 'password',
        required: true,
        placeholder: '请输入Access Token',
      },
    ],
  },
};

/**
 * 认证管理器
 */
export class AuthManager {
  /**
   * 验证认证数据
   */
  static validate(authConfig, authData) {
    const requiredFields = authConfig.fields.filter(field => field.required);

    for (const field of requiredFields) {
      if (!authData[field.key] || !authData[field.key].trim()) {
        return {
          valid: false,
          message: `请填写${field.label}`,
          field: field.key,
        };
      }
    }

    return { valid: true };
  }

  /**
   * 格式化认证数据（去除空白字符等）
   */
  static formatAuthData(authData) {
    const formatted = {};
    for (const [key, value] of Object.entries(authData)) {
      if (typeof value === 'string') {
        formatted[key] = value.trim();
      } else {
        formatted[key] = value;
      }
    }
    return formatted;
  }
}
