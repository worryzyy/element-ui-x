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
export function parseSSEChunk(chunk) {
  try {
    // console.log('chunk:', chunk);
    const data = chunk;

    // 根据 event 类型处理不同的数据
    switch (data.event) {
      case 'workflow_started':
        return {
          type: 'workflow_started',
          data: {
            id: data.message_id,
            conversation_id: data.conversation_id,
            created_at: data.created_at,
            task_id: data.task_id,
            metadata: { from_variable_selector: data.from_variable_selector || [] },
          },
        };
      case 'workflow_finished':
        return {
          type: 'workflow_finished',
          data: {
            id: data.message_id,
            conversation_id: data.conversation_id,
            created_at: data.created_at,
            task_id: data.task_id,
            metadata: { from_variable_selector: data.from_variable_selector || [] },
          },
        };
      case 'node_started':
        return {
          type: 'node_started',
          data: {
            id: data.message_id,
            conversation_id: data.conversation_id,
            created_at: data.created_at,
            task_id: data.task_id,
            data: data.data,
          },
        };
      case 'node_finished':
        return {
          type: 'node_finished',
          data: {
            id: data.message_id,
            conversation_id: data.conversation_id,
            created_at: data.created_at,
            task_id: data.task_id,
            data: data.data,
          },
        };
      case 'message':
        // 返回增量数据
        return {
          type: 'delta',
          data: {
            id: data.message_id,
            delta: data.answer, // answer 字段包含增量内容
            conversation_id: data.conversation_id,
            created_at: data.created_at,
            task_id: data.task_id,
            metadata: { from_variable_selector: data.from_variable_selector || [] },
          },
        };
      case 'message_end':
        return {
          type: 'end',
          data: {
            id: data.message_id,
            conversation_id: data.conversation_id,
            created_at: data.created_at,
            task_id: data.task_id,
            metadata: { from_variable_selector: data.from_variable_selector || [] },
          },
        };
      case 'error':
        return {
          type: 'error',
          data: {
            id: data.message_id,
            conversation_id: data.conversation_id,
            created_at: data.created_at,
            task_id: data.task_id,
            content: data.message,
            metadata: { from_variable_selector: data.from_variable_selector || [] },
          },
        };
      default:
        return {
          type: data.event,
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
  const { baseURL = 'https://api.dify.ai/v1', apiKey, user } = options;

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
    user,
    response_mode = 'streaming',
    inputs = {},
    parent_message_id,
    auto_generate_name = true,
  } = params;

  // 格式化文件对象，按照 Dify API 发送消息的文件字段要求
  const formattedFiles = files.map(file => {
    // 根据文件扩展名或 MIME 类型确定文件类型
    let fileType = 'custom';
    const extension = file.name ? (file.name.split('.').pop() || '').toUpperCase() : '';
    const mimeType = file.type || '';

    if (
      ['JPG', 'JPEG', 'PNG', 'GIF', 'WEBP', 'SVG'].includes(extension) ||
      mimeType.startsWith('image/')
    ) {
      fileType = 'image';
    } else if (
      [
        'TXT',
        'MD',
        'MARKDOWN',
        'PDF',
        'HTML',
        'XLSX',
        'XLS',
        'DOCX',
        'CSV',
        'EML',
        'MSG',
        'PPTX',
        'PPT',
        'XML',
        'EPUB',
      ].includes(extension)
    ) {
      fileType = 'document';
    } else if (
      ['MP3', 'M4A', 'WAV', 'WEBM', 'AMR'].includes(extension) ||
      mimeType.startsWith('audio/')
    ) {
      fileType = 'audio';
    } else if (
      ['MP4', 'MOV', 'MPEG', 'MPGA'].includes(extension) ||
      mimeType.startsWith('video/')
    ) {
      fileType = 'video';
    }

    return {
      type: fileType,
      transfer_method: 'local_file',
      upload_file_id: file.id,
    };
  });

  return {
    query,
    inputs,
    response_mode,
    parent_message_id,
    user,
    ...(conversation_id && { conversation_id }),
    ...(formattedFiles.length > 0 && { files: formattedFiles }),
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
