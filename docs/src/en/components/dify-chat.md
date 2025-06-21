# DifyChat Smart Chat

## Feature Description

DifyChat is a complete chat application component integrated with the Dify AI platform, providing out-of-the-box intelligent conversation capabilities.

## Preview

![Dify Chat Demo](https://element-ui-x.com/demo/project1.png)
![Dify Chat Demo](https://element-ui-x.com/demo/project2.png)
![Dify Chat Demo](https://element-ui-x.com/demo/project3.png)

### Core Features

- Complete chat interface
- Dify API integration
- Conversation management (create, switch, delete)
- Streaming message processing
- File upload support
- Message operations (edit, retry, feedback)

Currently, only a simple workflow is integrated, as shown below:

![Dify Chat Demo](https://element-ui-x.com/demo/project4.png)

## Dify API Endpoints Used

The DifyChat component integrates the following Dify API endpoints:

### Conversation Endpoints

- `GET /conversations` - Get conversation list
- `POST /chat-messages` - Send chat message (supports streaming)
- `GET /messages` - Get message history
- `POST /conversations` - Create a new conversation
- `DELETE /conversations/{conversation_id}` - Delete a conversation

### File Endpoints (Requires a model that can recognize files)

- `POST /files/upload` - Upload file
- Supports various file types such as documents, images, audio, and video

### Other Endpoints

- `GET /suggested-questions` - Get suggested questions
- `POST /messages/{message_id}/feedbacks` - Message feedback

## Try It Live

<a href="https://demo.element-ui-x.com/#/difychat" target="_blank" style="display: inline-block; padding: 8px 12px; background-color: #409EFF; color: #fff; text-decoration: none; border-radius: 4px; font-weight: 500;margin-top:10px;">Try DifyChat Live</a>

## Related Links

- [Dify Official Documentation](https://docs.dify.ai/getting-started/introduction) - Learn about the full features and API documentation of the Dify AI platform
- [Dify API Reference](https://docs.dify.ai/api-reference/overview) - Detailed API endpoint descriptions and invocation methods
