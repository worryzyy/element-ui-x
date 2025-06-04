/**
 * Dify API 适配器
 * 用于处理 dify API 响应格式转换和流式数据处理
 */

/**
 * 统一消息格式
 * @typedef {Object} MessageFormat
 * @property {string} id - 消息ID
 * @property {string} content - 消息内容
 * @property {string} placement - 消息位置 ('start' | 'end')
 * @property {string} avatar - 头像URL
 * @property {number} created_at - 创建时间戳
 * @property {string} conversation_id - 会话ID
 * @property {Object} metadata - 元数据
 */

/**
 * 转换 ChatCompletionResponse 为统一格式
 * @param {Object} response - dify blocking 模式响应
 * @returns {MessageFormat} 统一格式消息
 */
export function transformBlockingResponse(response) {
  return {
    id: response.message_id,
    content: response.answer,
    placement: 'start',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    created_at: response.created_at,
    conversation_id: response.conversation_id,
    metadata: response.metadata || {},
  };
}

/**
 * 解析 SSE 流式数据块
 * @param {string} chunk - SSE 数据块
 * @returns {Object|null} 解析后的数据对象
 */
/**
 * 解析 SSE 流式数据块
 * @param {string} chunk - SSE 数据块
 * @returns {Object|null} 解析后的数据对象
 */
export function parseSSEChunk(chunk) {
  try {
    // console.log('chunk:', chunk);
    const data = chunk;

    // 根据 event 类型处理不同的数据
    switch (data.event) {
      case 'message':
        // 检查是否是结束标志（answer 为空字符串）
        if (data.answer === '') {
          return {
            type: 'end',
            data: {
              id: data.message_id,
              conversation_id: data.conversation_id,
              created_at: data.created_at,
              task_id: data.task_id,
              metadata: {
                from_variable_selector: data.from_variable_selector || [],
              },
            },
          };
        }

        // 返回增量数据
        return {
          type: 'delta',
          data: {
            id: data.message_id,
            delta: data.answer, // answer 字段包含增量内容
            conversation_id: data.conversation_id,
            created_at: data.created_at,
            task_id: data.task_id,
            metadata: {
              from_variable_selector: data.from_variable_selector || [],
            },
          },
        };

      default:
        return {
          type: 'unknown',
          data: data,
        };
    }
  } catch (error) {
    console.warn('解析 SSE 数据块失败:', error, chunk);
    return null;
  }
}

/**
 * 创建 dify 专用的数据转换器
 * @returns {Function} 转换器函数
 */
export function createDifyTransformer() {
  return chunk => {
    return parseSSEChunk(chunk);
  };
}

/**
 * 创建 dify 请求配置
 * @param {Object} options - 配置选项
 * @param {string} options.baseURL - API 基础URL
 * @param {string} options.apiKey - API密钥
 * @param {string} options.user - 用户标识
 * @returns {Object} 请求配置
 */
export function createDifyRequestConfig(options = {}) {
  const { baseURL = 'https://api.dify.ai/v1', apiKey, user = 'default-user' } = options;

  return {
    baseURL,
    baseOptions: {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    },
    defaultParams: {
      user,
      response_mode: 'streaming',
      inputs: {},
      auto_generate_name: true,
    },
  };
}

/**
 * 构建发送消息的请求体
 * @param {Object} params - 参数
 * @param {string} params.query - 用户输入
 * @param {string} [params.conversation_id] - 会话ID
 * @param {Array} [params.files] - 文件列表
 * @param {string} [params.user] - 用户标识
 * @param {string} [params.response_mode] - 响应模式
 * @returns {Object} 请求体
 */
export function buildChatMessageRequest(params) {
  const {
    query,
    conversation_id,
    files = [],
    user = 'default-user',
    response_mode = 'streaming',
    inputs = {},
    auto_generate_name = true,
  } = params;

  return {
    query,
    inputs,
    response_mode,
    user,
    ...(conversation_id && {
      conversation_id,
    }),
    ...(files.length > 0 && {
      files,
    }),
    auto_generate_name,
  };
}

export default {
  transformBlockingResponse,
  parseSSEChunk,
  createDifyTransformer,
  createDifyRequestConfig,
  buildChatMessageRequest,
};
