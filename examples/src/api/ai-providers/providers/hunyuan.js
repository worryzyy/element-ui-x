import { BaseAIProvider } from '../base/provider.js';
import { ErrorHandler, ResponseParser } from '../base/response-parser.js';

/**
 * 腾讯混元提供商
 */
export class HunyuanProvider extends BaseAIProvider {
  constructor() {
    super({
      id: 'hunyuan',
      name: '腾讯混元 (hunyuan-lite)',
      icon: '🐧',
      baseURL: 'https://hunyuan.tencentcloudapi.com',
      authConfig: {
        type: 'app_secret',
        fields: [
          {
            key: 'secretId',
            label: 'Secret ID',
            type: 'text',
            required: true,
            placeholder: '请输入腾讯云Secret ID',
          },
          {
            key: 'secretKey',
            label: 'Secret Key',
            type: 'password',
            required: true,
            placeholder: '请输入腾讯云Secret Key',
          },
        ],
      },
    });
  }

  /**
   * 构建请求
   */
  buildRequest(prompt, options = {}) {
    const { authData, model = 'hunyuan-lite' } = options;

    if (!authData || !authData.secretId || !authData.secretKey) {
      throw new Error('缺少必要的认证信息');
    }

    return {
      url: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Host: 'hunyuan.tencentcloudapi.com',
        'X-TC-Action': 'ChatCompletions',
        'X-TC-Version': '2023-09-01',
        // 腾讯云需要复杂的签名算法，这里简化处理
        Authorization: this.buildTencentAuth(authData),
      },
      body: JSON.stringify({
        Model: model,
        Messages: [
          {
            Role: 'user',
            Content: prompt,
          },
        ],
        Stream: true,
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
      const content = ResponseParser.extractContent(data, [
        'Choices.0.Delta.Content',
        'Choices.0.Message.Content',
      ]);

      // 提取元数据
      const metadata = {
        isComplete: data.Choices && data.Choices[0] && data.Choices[0].FinishReason === 'stop',
        usage: data.Usage || {},
        model: data.Model || 'hunyuan',
        finish_reason: (data.Choices && data.Choices[0] && data.Choices[0].FinishReason) || '',
      };

      return ResponseParser.standardizeResponse(content, metadata);
    } catch (error) {
      console.error('Hunyuan响应解析失败:', error);
      return ResponseParser.standardizeResponse('', { error: error.message });
    }
  }

  /**
   * 处理错误
   */
  handleError(error) {
    return ErrorHandler.standardizeError(error, '腾讯混元');
  }

  /**
   * 构建腾讯云认证（简化版，实际需要完整的签名算法）
   */
  buildTencentAuth(authData) {
    // 这里应该实现腾讯云的签名算法
    // 为了示例，这里返回一个占位符
    return `TC3-HMAC-SHA256 Credential=${authData.secretId}/...`;
  }
}
