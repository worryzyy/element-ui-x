/**
 * 响应解析器基础工具
 */
export class ResponseParser {
  /**
   * 解析JSON字符串，容错处理
   */
  static safeParse(jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.warn('JSON解析失败:', jsonString);
      return null;
    }
  }

  /**
   * 从嵌套对象中安全获取值
   */
  static safeGet(obj, path, defaultValue = '') {
    try {
      return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : defaultValue;
      }, obj);
    } catch (error) {
      return defaultValue;
    }
  }

  /**
   * 标准化响应格式
   */
  static standardizeResponse(content, metadata = {}) {
    return {
      content: String(content || ''),
      isComplete: metadata.isComplete !== false,
      metadata: {
        usage: metadata.usage || {},
        model: metadata.model || '',
        finish_reason: metadata.finish_reason || '',
        ...metadata
      }
    };
  }

  /**
   * 处理流式响应数据
   */
  static parseStreamData(rawData, config = {}) {
    const { 
      eventField = 'event',
      dataField = 'data',
      skipEvents = ['start', 'ping']
    } = config;

    try {
      const lines = rawData.split('\n').filter(line => line.trim());
      const results = [];

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const dataStr = line.slice(6).trim();
          
          if (dataStr === '[DONE]') {
            results.push({ isComplete: true });
            continue;
          }

          const data = this.safeParse(dataStr);
          if (data) {
            results.push(data);
          }
        }
      }

      return results;
    } catch (error) {
      console.error('解析流式数据失败:', error);
      return [];
    }
  }

  /**
   * 提取文本内容的通用方法
   */
  static extractContent(data, contentPaths = []) {
    if (typeof data === 'string') {
      return data;
    }

    // 默认的内容路径
    const defaultPaths = [
      'output.text',
      'output.content', 
      'result.content',
      'choices.0.delta.content',
      'choices.0.message.content',
      'content',
      'text',
      'message'
    ];

    const paths = [...contentPaths, ...defaultPaths];

    for (const path of paths) {
      const content = this.safeGet(data, path);
      if (content) {
        return String(content);
      }
    }

    return '';
  }
}

/**
 * 错误处理器
 */
export class ErrorHandler {
  /**
   * 标准化错误格式
   */
  static standardizeError(error, providerName = '') {
    let message = '未知错误';
    let code = 'UNKNOWN_ERROR';
    let details = {};

    if (error.response) {
      // HTTP错误
      const status = error.response.status;
      const data = error.response.data || {};
      
      code = `HTTP_${status}`;
      message = this.getHttpErrorMessage(status, data);
      details = { status, data };
    } else if (error.request) {
      // 网络错误
      code = 'NETWORK_ERROR';
      message = '网络连接失败，请检查网络设置';
    } else if (error.message) {
      // 其他错误
      message = error.message;
    }

    return {
      code,
      message: `[${providerName}] ${message}`,
      details,
      originalError: error
    };
  }

  /**
   * 获取HTTP错误信息
   */
  static getHttpErrorMessage(status, data) {
    const commonMessages = {
      400: '请求参数错误',
      401: '认证失败，请检查API密钥',
      403: '访问被拒绝，请检查权限',
      404: '接口不存在',
      429: '请求频率过高，请稍后重试',
      500: '服务器内部错误',
      502: '网关错误',
      503: '服务暂不可用'
    };

    let message = commonMessages[status] || `HTTP错误 ${status}`;
    
    // 尝试从响应中提取更详细的错误信息
    if (data) {
      const errorMsg = (data.error && data.error.message) || data.message || data.error_description;
      if (errorMsg) {
        message += `: ${errorMsg}`;
      }
    }

    return message;
  }
}