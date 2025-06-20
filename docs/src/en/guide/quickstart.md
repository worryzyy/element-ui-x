# Quick Start

This section will introduce how to quickly use Element-UI-X components in your project.

## Basic Usage

After successfully [installing](./installation.md) Element-UI-X, you can start using components from the component library. Here's a simple example showing how to use the typewriter component:

:::demo

```html
<template>
  <div class="demo-container">
    <h3>AI Response Example</h3>

    <div class="chat-container">
      <div class="message user">
        <div class="avatar">User</div>
        <div class="content">Explain Vue's lifecycle hook functions</div>
      </div>

      <div class="message ai">
        <div class="avatar">AI</div>
        <div class="content">
          <el-x-typewriter
            :content="aiResponse"
            :typing="{ interval: 30, step: 1 }"
            @finish="onTypingComplete"
            ref="typewriter"
          />
        </div>
      </div>
    </div>

    <div class="actions">
      <el-button
        type="primary"
        @click="regenerateResponse"
      >
        Regenerate
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        aiResponse:
          'Vue lifecycle hook functions are functions that are automatically executed at specific stages of a Vue instance. They mainly include:\n\n1. beforeCreate: Called after instance initialization, before data observation and event configuration\n2. created: Called after instance creation is complete, when data observation, properties and methods computation are finished\n3. beforeMount: Called before mounting begins\n4. mounted: Called after mounting is complete, when DOM elements can be accessed\n5. beforeUpdate: Called when data updates, before virtual DOM re-rendering\n6. updated: Called after virtual DOM re-rendering caused by data changes\n7. beforeDestroy: Called before instance destruction\n8. destroyed: Called after instance destruction',
      };
    },
    mounted() {
      // Automatically start typing effect after page load
      this.$nextTick(() => {
        this.$refs.typewriter.restart();
      });
    },
    methods: {
      onTypingComplete(instance) {
        console.log('Typing effect completed:', instance);
      },
      regenerateResponse() {
        // Simulate regenerating response
        this.$refs.typewriter.restart();
      },
    },
  };
</script>

<style>
  .demo-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .chat-container {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    padding: 15px;
    background-color: #f8f8f8;
    margin-bottom: 20px;
  }

  .message {
    display: flex;
    margin-bottom: 15px;
  }

  .message .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .message .content {
    margin-left: 10px;
    padding: 10px;
    border-radius: 4px;
    max-width: 80%;
  }
  .message.user {
    flex-direction: row-reverse;
  }
  .message.user .avatar {
    background-color: #67c23a;
  }

  .message.user .content {
    background-color: #f0f9eb;
  }

  .message.ai .avatar {
    background-color: #409eff;
  }

  .message.ai .content {
    background-color: #ecf5ff;
    white-space: pre-wrap;
  }

  .actions {
    text-align: center;
  }
</style>
```

:::

## Using Multiple Components

Element-UI-X provides multiple components that you can combine to build complete AI interaction interfaces. Here's a simplified example:

:::demo

```html
<template>
  <div class="ai-chat">
    <!-- Thinking animation component -->
    <el-x-thinking
      v-if="isThinking"
      status="thinking"
      content="AI is thinking..."
    />

    <!-- Typewriter component -->
    <el-x-typewriter
      v-else-if="aiResponse"
      :content="aiResponse"
      :typing="{ interval: 40, step: 1 }"
      ref="typewriter"
    />
    <br />
    <!-- Sender component -->
    <el-x-sender
      v-model="userInput"
      @submit="sendMessage"
      :disabled="isThinking"
      :loading="senderLoading"
      ref="sender"
      clearable
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userInput: '',
        aiResponse: '',
        isThinking: false,
        senderLoading: false,
        timeoutId: null,
      };
    },
    methods: {
      sendMessage(message) {
        if (!message.trim()) return;

        const userMessage = message;
        this.senderLoading = true;

        // Simulate AI response
        this.timeoutId = setTimeout(() => {
          this.isThinking = true;
          this.senderLoading = false;

          setTimeout(() => {
            this.isThinking = false;
            this.aiResponse = `Your message was: "${userMessage}". This is an AI response example.`;

            this.$nextTick(() => {
              this.$refs.typewriter.restart();
            });
          }, 1500);
        }, 500);
      },
      handleCancel() {
        this.senderLoading = false;
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
          this.timeoutId = null;
        }
        this.$message.info('Send cancelled');
      },
    },
  };
</script>

<style>
  .ai-chat {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
  }
</style>
```

:::

## Component References and Method Calls

Element-UI-X components support calling component methods through ref references:

:::demo

```html
<template>
  <div>
    <el-x-typewriter
      ref="typewriter"
      :content="text"
      :typing="{ interval: 40, step: 1 }"
    />

    <div class="demo-controls">
      <el-button-group>
        <el-button @click="finishTyping">Finish Immediately</el-button>
        <el-button @click="restart">Restart</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: 'This is a sample text',
      };
    },
    methods: {
      finishTyping() {
        this.$refs.typewriter.finishTyping();
      },
      restart() {
        this.$refs.typewriter.restart();
      },
    },
  };
</script>

<style>
  .demo-controls {
    margin-top: 15px;
  }
</style>
```

:::

## Next Steps

Now that you understand the basic usage of Element-UI-X, you can:

- Check the [Components](../components/) documentation to learn detailed usage of each component
