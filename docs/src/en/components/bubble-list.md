# BubbleList Message List Component

## Features

Message list component for displaying a group of conversation messages, supporting the following features:

- Auto scroll to latest message
- Back to bottom button
- Unified bubble style settings
- Custom scroll control
- Custom avatar and content rendering

## Usage Examples

### Basic Usage

Basic usage of the message list component to display multiple messages.

:::demo

```html
<template>
  <div>
    <client-only>
      <el-x-bubble-list :list="messageList" />
    </client-only>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        messageList: [
          {
            content: 'Hello, I am an AI assistant. How can I help you?',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
            avatarSize: 40,
          },
          {
            content: 'I want to learn how to use the Element UI component library',
            placement: 'end',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/tft_set10_emblem_pbj.png',
            avatarSize: 40,
          },
          {
            content:
              'Element UI is a Vue 2.0-based desktop component library for developers, designers, and product managers, providing rich components and features.',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
            avatarSize: 40,
          },
        ],
      };
    },
  };
</script>
```

:::

### Global Default Configuration(Can be used in the scene of displaying historical message records, unified setting)

Unify the style of all bubbles through `default*` prefix attributes, with higher priority than settings within the Bubble component.

:::demo

```html
<template>
  <div>
    <client-only>
      <el-x-bubble-list
        :list="messageList"
        defaultShape="round"
        defaultVariant="shadow"
        :defaultAvatarSize="40"
        defaultAvatarShape="circle"
      />
    </client-only>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        messageList: [
          {
            content: 'Global settings for round bubbles and shadow effects',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
            avatarSize: 40,
          },
          {
            content: 'All bubbles will apply these default settings',
            placement: 'end',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/tft_set10_emblem_pbj.png',
            avatarSize: 40,
          },
          {
            content: 'Even if individual bubbles do not specify these properties',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
            avatarSize: 40,
          },
        ],
      };
    },
  };
</script>
```

:::

### Typewriter Effect and Auto Scroll

Demonstrate typewriter effect and auto scroll to latest message functionality.

:::demo

```html
<template>
  <div>
    <client-only>
      <el-x-bubble-list
        :list="typingMessages"
        :max-height="'300px'"
        :defaultIsMarkdown="true"
        :defaultTyping="{ interval: 30, step: 2 }"
        @complete="onTypingComplete"
      />

      <div style="margin-top: 15px;">
        <el-button
          type="primary"
          size="small"
          @click="addMessage"
        >
          Add Message
        </el-button>
        <el-button
          type="success"
          size="small"
          @click="addTypingMessage"
        >
          Add Typing Effect Message
        </el-button>
      </div>
    </client-only>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        typingMessages: [
          {
            content: 'This is a normal message',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
            avatarSize: 40,
          },
          {
            content: 'This is my reply',
            placement: 'end',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/tft_set10_emblem_pbj.png',
            avatarSize: 40,
          },
          {
            content:
              'This is a message **with typewriter effect** that will be displayed character by character.\n\nWhen the message is long, it will automatically scroll to the bottom.',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
            avatarSize: 40,
            typing: true,
          },
        ],
        messageCounter: 0,
      };
    },
    methods: {
      addMessage() {
        this.messageCounter++;
        this.typingMessages.push({
          content: `This is the newly added ${this.messageCounter}th normal message`,
          placement: this.messageCounter % 2 === 0 ? 'end' : 'start',
          avatarSize: 40,
          avatar:
            this.messageCounter % 2 === 0
              ? 'https://game.gtimg.cn/images/lol/act/img/tft/equip/tft_set10_emblem_pbj.png'
              : 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
        });
      },
      addTypingMessage() {
        this.messageCounter++;
        this.typingMessages.push({
          content: `This is the newly added ${this.messageCounter}th **typewriter effect** message that will automatically scroll to the bottom.\n\n- Item 1\n- Item 2\n- Item 3`,
          placement: 'start',
          avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
          typing: true,
          avatarSize: 40,
        });
      },
      onTypingComplete(instance, index) {
        console.log(`Message at index ${index} completed typing`);
      },
    },
  };
</script>
```

:::

### Back to Bottom Button

When scrolled to the top, a back to bottom button is displayed.

:::demo

```html
<template>
  <div>
    <client-only>
      <el-x-bubble-list
        :list="longMessages"
        :max-height="'300px'"
        :back-button-threshold="80"
        :show-back-button="true"
        :btn-color="'#409EFF'"
        :btn-icon-size="24"
      />
    </client-only>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        longMessages: Array.from({ length: 20 }, (_, i) => ({
          content: `This is the ${
            i + 1
          } message. Scroll up to view more content. When the scroll distance exceeds the threshold, a back to bottom button will be displayed.${
            i % 3 === 0
              ? ' This is a longer message content for testing line wrapping and layout effects.'
              : ''
          }`,
          placement: i % 2 === 0 ? 'start' : 'end',
          avatarSize: 40,
          avatar:
            i % 2 === 0
              ? 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png'
              : 'https://game.gtimg.cn/images/lol/act/img/tft/equip/tft_set10_emblem_pbj.png',
        })),
      };
    },
  };
</script>
```

:::

### Custom Slots

Use slots to customize bubble avatar and content.

:::demo

```html
<template>
  <div>
    <client-only>
      <el-x-bubble-list
        :list="customMessages"
        :max-height="'300px'"
      >
        <template #avatar="{ item }">
          <el-avatar
            :size="40"
            :icon="
              item.placement === 'start' ? 'el-icon-s-custom' : 'el-icon-user'
            "
            :style="{
              backgroundColor: item.placement === 'start' ? '#409EFF' : '#67C23A',
            }"
          ></el-avatar>
        </template>

        <template #header="{ item }">
          <div style="font-weight: bold; margin-bottom: 5px; color: #606266;">
            {{ item.placement === "start" ? "AI Assistant" : "User" }}
            <span style="font-size: 12px; margin-left: 10px; font-weight: normal;">
              {{ item.time }}
            </span>
          </div>
        </template>

        <template #footer="{ item }">
          <div style=" color: #909399; text-align: right; ">
            <el-button
              circle
              size="mini"
              @click="copyMessage(item)"
            >
              <i class="el-icon-document-copy"></i>
            </el-button>
            <el-button
              circle
              size="mini"
              @click="favoriteMessage(item)"
            >
              <i class="el-icon-star-off"></i>
            </el-button>

            <!-- 只在AI消息中显示点赞和踩按钮 -->
            <template v-if="item.placement === 'start'">
              <el-button
                circle
                size="mini"
                @click="likeMessage(item)"
              >
                <i class="el-icon-thumb"></i>
              </el-button>
              <el-button
                circle
                size="mini"
                @click="dislikeMessage(item)"
              >
                <i class="el-icon-bottom"></i>
              </el-button>
            </template>
          </div>
        </template>

        <template #backToBottom>
          <el-button
            type="primary"
            size="mini"
            circle
          >
            <i class="el-icon-bottom"></i>
          </el-button>
        </template>
      </el-x-bubble-list>
    </client-only>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        customMessages: Array.from({ length: 5 }, (_, i) => ({
          content: `This is the ${
            i + 1
          } custom message, using slots to customize avatar, header and footer content.`,
          placement: i % 2 === 0 ? 'start' : 'end',
          time: new Date().toLocaleTimeString(),
          id: i,
          avatarSize: 40,
        })),
      };
    },
    methods: {
      copyMessage(item) {
        this.$message.success(`Message copied: ${item.id}`);
      },
      favoriteMessage(item) {
        this.$message.success(`Message favorited: ${item.id}`);
      },
      likeMessage(item) {
        this.$message.success(`Message liked: ${item.id}`);
      },
      dislikeMessage(item) {
        this.$message.warning(`Message disliked: ${item.id}`);
      },
    },
  };
</script>
```

:::

### Loading State and Complex Messages

Display loading states and different types of message content.

:::demo

```html
<template>
  <div>
    <client-only>
      <el-x-bubble-list
        :list="complexMessages"
        :max-height="'400px'"
        :defaultIsMarkdown="true"
        :defaultAvatarSize="40"
      />

      <div style="margin-top: 15px;">
        <el-button
          type="primary"
          size="small"
          @click="sendMessage"
        >
          Send Message
        </el-button>
      </div>
    </client-only>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        complexMessages: [
          {
            content: 'Hello, how can I help you?',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
            avatarSize: 40,
          },
          {
            content: 'I want to learn about Element UI table components',
            placement: 'end',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/tft_set10_emblem_pbj.png',
            avatarSize: 40,
          },
          {
            content: `# Element UI Table Component

The Element UI table component is a powerful data display tool that provides the following features:

- Multi-selection support
- Sorting and filtering
- Fixed headers and columns
- Custom cell content

\`\`\`javascript
<el-table :data="tableData">
  <el-table-column prop="date" label="Date" width="180"></el-table-column>
  <el-table-column prop="name" label="Name" width="180"></el-table-column>
  <el-table-column prop="address" label="Address"></el-table-column>
</el-table>
\`\`\``,
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
            isMarkdown: true,
            avatarSize: 40,
          },
          {
            loading: true,
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
            avatarSize: 40,
          },
        ],
      };
    },
    methods: {
      sendMessage() {
        // Remove loading message
        this.complexMessages.pop();

        // Add user message
        this.complexMessages.push({
          content: 'Thank you, this table component looks very powerful!',
          placement: 'end',
          avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/tft_set10_emblem_pbj.png',
          avatarSize: 40,
        });

        // Add loading state
        this.complexMessages.push({
          loading: true,
          placement: 'start',
          avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
          avatarSize: 40,
        });

        // Simulate adding new message after loading completes
        setTimeout(() => {
          // Remove loading message
          this.complexMessages.pop();

          // Add new message
          this.complexMessages.push({
            avatarSize: 40,
            content: 'Do you have any other questions about Element UI?',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
            typing: true,
          });
        }, 2000);
      },
    },
  };
</script>
```

:::

## Attributes

| Parameter           | Description                                                                    | Type           | Default                                      |
| ------------------- | ------------------------------------------------------------------------------ | -------------- | -------------------------------------------- |
| list                | Bubble list data                                                               | Array          | []                                           |
| maxHeight           | Maximum height of the list                                                     | String         | '500px'                                      |
| triggerIndices      | Indices that trigger bubble completion event, options: 'only-last'/'all'/Array | String/Array   | 'only-last'                                  |
| alwaysShowScrollbar | Whether to always show scrollbar                                               | Boolean        | false                                        |
| backButtonThreshold | Scroll threshold for showing back to bottom button                             | Number         | 80                                           |
| showBackButton      | Whether to show back to bottom button                                          | Boolean        | true                                         |
| backButtonPosition  | Position of back to bottom button                                              | Object         | { bottom: '20px', left: 'calc(50% - 19px)' } |
| btnLoading          | Whether button shows loading animation                                         | Boolean        | true                                         |
| btnColor            | Button color                                                                   | String         | '#409EFF'                                    |
| btnIconSize         | Button icon size                                                               | Number         | 24                                           |
| defaultPlacement    | Default bubble placement, higher priority than bubble component                | String         | ''                                           |
| defaultLoading      | Default loading state, higher priority than bubble component                   | Boolean        | undefined                                    |
| defaultShape        | Default bubble shape, higher priority than bubble component                    | String         | ''                                           |
| defaultVariant      | Default bubble variant, higher priority than bubble component                  | String         | ''                                           |
| defaultIsMarkdown   | Default whether to parse Markdown, higher priority than bubble component       | Boolean        | true                                         |
| defaultIsFog        | Default whether to enable fog effect, higher priority than bubble component    | Boolean        | false                                        |
| defaultTyping       | Default typing effect config, higher priority than bubble component            | Boolean/Object | undefined                                    |
| defaultMaxWidth     | Default bubble max width, higher priority than bubble component                | String         | ''                                           |
| defaultAvatar       | Default avatar URL, higher priority than bubble component                      | String         | ''                                           |
| defaultAvatarSize   | Default avatar size, higher priority than bubble component                     | Number         | undefined                                    |
| defaultAvatarGap    | Default avatar gap, higher priority than bubble component                      | Number         | undefined                                    |
| defaultAvatarShape  | Default avatar shape, higher priority than bubble component                    | String         | ''                                           |
| defaultAvatarSrcSet | Default avatar srcset, higher priority than bubble component                   | String         | ''                                           |
| defaultAvatarAlt    | Default avatar alt, higher priority than bubble component                      | String         | ''                                           |
| defaultAvatarFit    | Default avatar fit mode, higher priority than bubble component                 | String         | ''                                           |
| defaultNoStyle      | Default whether to remove styles, higher priority than bubble component        | Boolean        | undefined                                    |

## Methods

| Method         | Description                          | Parameters           |
| -------------- | ------------------------------------ | -------------------- |
| scrollToBottom | Scroll to bottom                     | —                    |
| scrollToTop    | Scroll to top                        | —                    |
| scrollToIndex  | Scroll to message at specified index | index: message index |

## Events

| Event                | Description                                     | Callback Parameters                             |
| -------------------- | ----------------------------------------------- | ----------------------------------------------- |
| scroll               | Triggered when scrolling                        | event: scroll event object                      |
| typing-complete      | Triggered when a message typing is completed    | instance: bubble instance, index: message index |
| back-to-bottom-click | Triggered when back to bottom button is clicked | —                                               |

## Slots

| Slot Name      | Description                  | Parameters                             |
| -------------- | ---------------------------- | -------------------------------------- |
| default        | Custom message content       | { item: message object, index: index } |
| avatar         | Custom avatar                | { item: message object, index: index } |
| header         | Custom header content        | { item: message object, index: index } |
| footer         | Custom footer content        | { item: message object, index: index } |
| back-to-bottom | Custom back to bottom button | —                                      |
