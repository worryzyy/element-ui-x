import { AuthConfigs } from '../base/auth.js';
import { BaseAIProvider } from '../base/provider.js';
import { ErrorHandler, ResponseParser } from '../base/response-parser.js';

/**
 * 智谱AI提供商
 */
export class ZhipuProvider extends BaseAIProvider {
  constructor() {
    super({
      id: 'zhipu',
      name: '智谱AI (glm-4)',
      icon: '🧠',
      baseURL: 'https://open.bigmodel.cn',
      authConfig: AuthConfigs.SIMPLE_API_KEY,
    });
  }

  /**
   * 构建请求
   */
  buildRequest(prompt, options = {}) {
    const { authData, model = 'glm-4' } = options;

    if (!authData || !authData.apiKey) {
      throw new Error('缺少必要的认证信息');
    }

    return {
      url: '/api/paas/v4/chat/completions',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authData.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        stream: true,
        max_tokens: 2048,
        temperature: 0.95,
        top_p: 0.7,
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
        model: data.model || 'glm-4',
        finish_reason: (data.choices && data.choices[0] && data.choices[0].finish_reason) || '',
      };

      return ResponseParser.standardizeResponse(content, metadata);
    } catch (error) {
      console.error('Zhipu响应解析失败:', error);
      return ResponseParser.standardizeResponse('', { error: error.message });
    }
  }

  /**
   * 处理错误
   */
  handleError(error) {
    return ErrorHandler.standardizeError(error, '智谱AI');
  }
}
