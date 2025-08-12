import { registerProvider } from '../index.js';
import { DifyProvider } from './dify.js';
import { DoubaoProvider } from './doubao.js';
import { ErnieProvider } from './ernie.js';
import { HunyuanProvider } from './hunyuan.js';
import { KimiProvider } from './kimi.js';
import { QwenProvider } from './qwen.js';
import { ZhipuProvider } from './zhipu.js';

/**
 * 初始化所有AI提供商
 */
export function initializeProviders() {
  // 注册阿里云通义千问
  registerProvider(new QwenProvider());

  // 注册百度文心一言
  registerProvider(new ErnieProvider());

  // 注册腾讯混元
  registerProvider(new HunyuanProvider());

  // 注册字节豆包
  registerProvider(new DoubaoProvider());

  // 注册智谱AI
  registerProvider(new ZhipuProvider());

  // 注册月之暗面Kimi
  registerProvider(new KimiProvider());

  // 注册Dify API
  registerProvider(new DifyProvider());

  console.log('AI提供商初始化完成');
}

/**
 * 获取支持的提供商列表
 */
export function getSupportedProviders() {
  return [
    {
      id: 'qwen',
      name: '阿里云通义千问 (qwen-turbo)',
      icon: '🔥',
      description: '阿里云推出的大语言模型，支持多轮对话和流式输出',
    },
    {
      id: 'ernie',
      name: '百度文心一言 (ernie-bot-turbo)',
      icon: '🐻',
      description: '百度推出的知识增强大语言模型',
    },
    {
      id: 'hunyuan',
      name: '腾讯混元 (hunyuan-lite)',
      icon: '🐧',
      description: '腾讯推出的大语言模型，具备强大的中文理解能力',
    },
    {
      id: 'doubao',
      name: '字节豆包 (doubao-seed-1-6-250615)',
      icon: '🚀',
      description: '字节跳动推出的AI助手，支持多种场景应用',
    },
    {
      id: 'zhipu',
      name: '智谱AI (glm-4)',
      icon: '🧠',
      description: '清华大学技术成果转化的大语言模型',
    },
    {
      id: 'kimi',
      name: '月之暗面Kimi (kimi-k2-0711-preview)',
      icon: '🌙',
      description: 'Moonshot AI推出的智能助手，擅长中英文对话',
    },
    {
      id: 'dify',
      name: 'Dify API (自定义应用)',
      icon: '🤖',
      description: 'Dify平台的AI工作流API，支持自定义应用和知识库',
    },
  ];
}
