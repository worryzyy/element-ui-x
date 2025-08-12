import { AuthConfigs } from '../base/auth.js';
import { BaseAIProvider } from '../base/provider.js';
import { ErrorHandler, ResponseParser } from '../base/response-parser.js';

/**
 * 百度文心一言提供商
 */
export class ErnieProvider extends BaseAIProvider {
  constructor() {
    super({
      id: 'ernie',
      name: '百度文心一言 (ernie-bot-turbo)',
      icon: '🐻',
      baseURL: 'https://aip.baidubce.com',
      authConfig: AuthConfigs.APP_KEY_SECRET,
    });
  }

  /**
   * 构建请求
   */
  buildRequest(prompt, options = {}) {
    const { authData, model = 'ernie-bot-turbo' } = options;

    if (!authData || !authData.apiKey || !authData.secretKey) {
      throw new Error('缺少必要的认证信息');
    }

    // 百度需要先获取access_token，这里简化处理
    // 实际使用时应该实现token缓存机制
    return {
      url: `/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/${model}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        stream: true,
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

      // 提取内容
      const content = ResponseParser.extractContent(data, ['result', 'content']);

      // 提取元数据
      const metadata = {
        isComplete: data.is_end === true,
        usage: data.usage || {},
        model: 'ernie-bot',
        finish_reason: data.is_end ? 'stop' : 'incomplete',
      };

      return ResponseParser.standardizeResponse(content, metadata);
    } catch (error) {
      console.error('Ernie响应解析失败:', error);
      return ResponseParser.standardizeResponse('', { error: error.message });
    }
  }

  /**
   * 处理错误
   */
  handleError(error) {
    return ErrorHandler.standardizeError(error, '百度文心一言');
  }

  /**
   * 获取访问令牌（实际使用时应该缓存）
   */
  async getAccessToken(apiKey, secretKey) {
    try {
      const response = await fetch(`${this.baseURL}/oauth/2.0/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: apiKey,
          client_secret: secretKey,
        }),
      });

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      throw new Error('获取百度访问令牌失败: ' + error.message);
    }
  }
}
