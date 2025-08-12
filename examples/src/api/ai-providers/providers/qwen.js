import { AuthConfigs } from '../base/auth.js';
import { BaseAIProvider } from '../base/provider.js';
import { ErrorHandler, ResponseParser } from '../base/response-parser.js';

/**
 * 阿里云通义千问提供商
 */
export class QwenProvider extends BaseAIProvider {
  constructor() {
    super({
      id: 'qwen',
      name: '阿里云通义千问 (qwen-turbo)',
      icon: '🔥',
      baseURL: 'https://dashscope.aliyuncs.com',
      authConfig: AuthConfigs.API_KEY_WITH_APP_ID,
    });
  }

  /**
   * 构建请求
   */
  buildRequest(prompt, options = {}) {
    const { authData, model = 'qwen-turbo' } = options;

    if (!authData || !authData.appId || !authData.apiKey) {
      throw new Error('缺少必要的认证信息');
    }

    return {
      url: `/api/v1/apps/${authData.appId}/completion`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authData.apiKey}`,
        'Content-Type': 'application/json',
        'X-DashScope-SSE': 'enable',
      },
      body: JSON.stringify({
        input: { prompt },
        parameters: {
          incremental_output: true,
          result_format: 'message',
        },
        debug: {},
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
      // 处理字符串数据
      if (typeof data === 'string') {
        const parsed = ResponseParser.safeParse(data);
        if (parsed) {
          data = parsed;
        } else {
          // 如果不是JSON，直接作为文本内容
          return ResponseParser.standardizeResponse(data);
        }
      }

      // 提取内容
      const content = ResponseParser.extractContent(data, ['output.text', 'output.content']);

      // 提取元数据
      const metadata = {
        isComplete: data.output && data.output.finish_reason === 'stop',
        usage: data.usage || {},
        model: data.model || 'qwen',
        finish_reason: (data.output && data.output.finish_reason) || '',
      };

      return ResponseParser.standardizeResponse(content, metadata);
    } catch (error) {
      console.error('Qwen响应解析失败:', error);
      return ResponseParser.standardizeResponse('', { error: error.message });
    }
  }

  /**
   * 处理错误
   */
  handleError(error) {
    return ErrorHandler.standardizeError(error, '阿里云通义千问');
  }

  /**
   * 构建认证头
   */
  buildAuthHeaders(authData) {
    return {
      Authorization: `Bearer ${authData.apiKey}`,
      'X-DashScope-SSE': 'enable',
    };
  }

  /**
   * 检查服务可用性
   */
  checkAvailability(authData) {
    return { available: true };
  }
}
