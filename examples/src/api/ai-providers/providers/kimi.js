import { AuthConfigs } from '../base/auth.js';
import { BaseAIProvider } from '../base/provider.js';
import { ErrorHandler, ResponseParser } from '../base/response-parser.js';

/**
 * 月之暗面Kimi提供商
 */
export class KimiProvider extends BaseAIProvider {
  constructor() {
    super({
      id: 'kimi',
      name: '月之暗面Kimi (kimi-k2-0711-preview)',
      icon: '🌙',
      baseURL: 'https://api.moonshot.cn',
      authConfig: AuthConfigs.SIMPLE_API_KEY,
    });
  }

  /**
   * 构建请求
   */
  buildRequest(prompt, options = {}) {
    const { authData, model = 'kimi-k2-0711-preview' } = options;

    if (!authData || !authData.apiKey) {
      throw new Error('缺少必要的认证信息');
    }

    return {
      url: '/v1/chat/completions',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authData.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content:
              '你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.6,
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

      // 提取内容（OpenAI格式）
      const content = ResponseParser.extractContent(data, [
        'choices.0.delta.content',
        'choices.0.message.content',
      ]);

      // 提取元数据
      const metadata = {
        isComplete: data.choices && data.choices[0] && data.choices[0].finish_reason === 'stop',
        usage: data.usage || {},
        model: data.model || 'kimi',
        finish_reason: (data.choices && data.choices[0] && data.choices[0].finish_reason) || '',
      };

      return ResponseParser.standardizeResponse(content, metadata);
    } catch (error) {
      console.error('Kimi响应解析失败:', error);
      return ResponseParser.standardizeResponse('', { error: error.message });
    }
  }

  /**
   * 处理错误
   */
  handleError(error) {
    return ErrorHandler.standardizeError(error, '月之暗面Kimi');
  }

  /**
   * 构建认证头
   */
  buildAuthHeaders(authData) {
    return { Authorization: `Bearer ${authData.apiKey}` };
  }
}
