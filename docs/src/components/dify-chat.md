# DifyChat 智能聊天

## 功能说明

DifyChat 是一个集成了 Dify AI 平台的完整聊天应用组件，提供开箱即用的智能对话功能。

## 预览图

![Dify Chat Demo](https://element-ui-x.com/demo/project1.png)
![Dify Chat Demo](https://element-ui-x.com/demo/project2.png)
![Dify Chat Demo](https://element-ui-x.com/demo/project3.png)

### 核心特性

- 完整的聊天界面
- Dify API 集成
- 对话管理（创建、切换、删除）
- 流式消息处理
- 文件上传支持
- 消息操作（编辑、重试、反馈）

当前接入的只是一个简单的工作流，如下

![Dify Chat Demo](https://element-ui-x.com/demo/project4.png)

## 使用的 Dify API 接口

DifyChat 组件集成了以下 Dify API 接口：

### 对话接口

- `GET /conversations` - 获取对话列表
- `POST /chat-messages` - 发送聊天消息（支持流式）
- `GET /messages` - 获取消息历史
- `POST /conversations` - 创建新对话
- `DELETE /conversations/{conversation_id}` - 删除对话

### 文件接口 (需要模型可以识别文件)

- `POST /files/upload` - 上传文件
- 支持文档、图片、音频、视频等多种文件类型

### 其他接口

- `GET /suggested-questions` - 获取建议问题
- `POST /messages/{message_id}/feedbacks` - 消息反馈

## 立即体验

<a href="https://demo.element-ui-x.com/#/difychat" target="_blank" style="display: inline-block; padding: 8px 12px; background-color: #409EFF; color: #fff; text-decoration: none; border-radius: 4px; font-weight: 500;margin-top:10px;">在线体验 DifyChat</a>

## 相关链接

- [Dify 官方文档](https://docs.dify.ai/getting-started/introduction) - 了解 Dify AI 平台的完整功能和 API 文档
- [Dify API 参考](https://docs.dify.ai/api-reference/overview) - 详细的 API 接口说明和调用方法
