import { AuthConfigs } from '../base/auth.js';
import { BaseAIProvider } from '../base/provider.js';
import { ErrorHandler, ResponseParser } from '../base/response-parser.js';

/**
 * 字节豆包提供商
 */
export class DoubaoProvider extends BaseAIProvider {
  constructor() {
    super({
      id: 'doubao',
      name: '字节豆包 (doubao-seed-1-6-250615)',
      icon: '🚀',
      baseURL: 'https://ark.cn-beijing.volces.com',
      authConfig: AuthConfigs.SIMPLE_API_KEY,
    });
  }

  /**
   * 构建请求
   */
  buildRequest(prompt, options = {}) {
    const { authData, model = 'doubao-seed-1-6-250615' } = options;

    if (!authData || !authData.apiKey) {
      throw new Error('缺少必要的认证信息');
    }

    return {
      url: '/api/v3/chat/completions',
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

      // 提取内容（OpenAI格式 + 豆包思考内容）
      let content = '';

      // 优先提取思考内容
      if (data.choices && data.choices[0] && data.choices[0].delta) {
        const delta = data.choices[0].delta;

        // 豆包的思考内容字段
        if (delta.reasoning_content) {
          content = `[思考] ${delta.reasoning_content}`;
        }
        // 普通内容字段
        else if (delta.content) {
          content = delta.content;
        }
      }

      // 如果没有delta，尝试从message中提取
      if (!content) {
        content = ResponseParser.extractContent(data, [
          'choices.0.delta.content',
          'choices.0.message.content',
        ]);
      }

      // 提取元数据
      const metadata = {
        isComplete: data.choices && data.choices[0] && data.choices[0].finish_reason === 'stop',
        usage: data.usage || {},
        model: data.model || 'doubao',
        finish_reason: (data.choices && data.choices[0] && data.choices[0].finish_reason) || '',
        has_reasoning: !!(
          data.choices &&
          data.choices[0] &&
          data.choices[0].delta &&
          data.choices[0].delta.reasoning_content
        ),
      };

      return ResponseParser.standardizeResponse(content, metadata);
    } catch (error) {
      console.error('Doubao响应解析失败:', error);
      return ResponseParser.standardizeResponse('', { error: error.message });
    }
  }

  /**
   * 处理错误
   */
  handleError(error) {
    return ErrorHandler.standardizeError(error, '字节豆包');
  }
}
