// HTTP请求工具类
import axios from 'axios';

// 创建axios实例
const request = axios.create({
  baseURL: 'https://api.dify.ai/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 从环境变量获取API Key
    const apiKey = process.env.VUE_APP_DIFY_API_KEY;
    if (apiKey) {
      config.headers.Authorization = `Bearer ${apiKey}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.error('API请求错误:', error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      '请求失败';
    return Promise.reject(new Error(message));
  },
);

export default request;
