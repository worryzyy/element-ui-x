import { AuthType } from '../base/auth.js';
import { BaseAIProvider } from '../base/provider.js';
import { ErrorHandler, ResponseParser } from '../base/response-parser.js';

/**
 * Dify API提供商
 */
export class DifyProvider extends BaseAIProvider {
  constructor() {
    super({
      id: 'dify',
      name: 'Dify API (自定义应用)',
      icon: '🤖',
      baseURL: '', // 用户自定义
      authConfig: {
        type: AuthType.API_KEY,
        fields: [
          {
            key: 'baseURL',
            label: 'API Base URL',
            type: 'text',
            required: true,
            placeholder: '你自己的服务器 或 https://api.dify.ai',
          },
          {
            key: 'apiKey',
            label: 'API Key',
            type: 'password',
            required: true,
            placeholder: '请输入Dify API Key',
          },
          {
            key: 'userId',
            label: 'User ID',
            type: 'text',
            required: false,
            placeholder: '用户标识，如: abc-123',
          },
        ],
      },
    });
  }

  /**
   * 构建请求
   */
  buildRequest(prompt, options = {}) {
    const { authData } = options;

    if (!authData || !authData.apiKey || !authData.baseURL) {
      throw new Error('缺少必要的认证信息');
    }

    // 动态设置baseURL
    this.baseURL = authData.baseURL.replace(/\/$/, ''); // 移除末尾斜杠

    return {
      url: '/v1/chat-messages',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authData.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {},
        query: prompt,
        response_mode: 'streaming',
        conversation_id: '',
        user: authData.userId || 'user-' + Date.now(),
        files: [],
      }),
      streamConfig: {
        enabled: true,
        eventField: 'event',
        dataField: 'data',
      },
    };
  }

  /**
   * 解析响应
   */
  parseResponse(data) {
    try {
      if (typeof data === 'string') {
        const parsed = ResponseParser.safeParse(data);
        if (parsed) {
          data = parsed;
        } else {
          return ResponseParser.standardizeResponse(data);
        }
      }

      // Dify特殊的响应格式
      let content = '';
      let isComplete = false;

      if (data.event === 'message') {
        content = data.answer || '';
      } else if (data.event === 'message_end') {
        isComplete = true;
        content = ''; // message_end事件通常不包含内容
      } else if (data.event === 'error') {
        throw new Error(data.message || 'Dify API错误');
      }

      // 提取元数据
      const metadata = {
        isComplete,
        usage: (data.metadata && data.metadata.usage) || {},
        model: 'dify',
        finish_reason: isComplete ? 'stop' : 'incomplete',
        conversation_id: data.conversation_id || '',
        message_id: data.id || '',
      };

      return ResponseParser.standardizeResponse(content, metadata);
    } catch (error) {
      console.error('Dify响应解析失败:', error);
      return ResponseParser.standardizeResponse('', { error: error.message });
    }
  }

  /**
   * 处理错误
   */
  handleError(error) {
    return ErrorHandler.standardizeError(error, 'Dify API');
  }

  /**
   * 构建认证头
   */
  buildAuthHeaders(authData) {
    return { Authorization: `Bearer ${authData.apiKey}` };
  }

  /**
   * 验证认证配置（重写以支持自定义baseURL验证）
   */
  validateAuth(authData) {
    const validation = super.validateAuth(authData);
    if (!validation.valid) {
      return validation;
    }

    // 验证baseURL格式
    const baseURL = authData.baseURL;
    if (baseURL && !baseURL.match(/^https?:\/\/.+/)) {
      return {
        valid: false,
        message: 'API Base URL格式不正确，请以http://或https://开头',
      };
    }

    return { valid: true };
  }
}
