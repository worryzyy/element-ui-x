# BubbleList 消息列表组件

## 功能说明

消息列表组件，用于展示一组对话消息，支持以下特性：

- 自动滚动到最新消息
- 返回底部按钮
- 统一设置气泡样式
- 自定义控制滚动
- 自定义头像和内容渲染

## 使用示例

### 基础用法

基本的消息列表组件使用，展示多条消息。

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
            content: '你好，我是AI助手，有什么可以帮助你的？',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
            avatarSize: 40,
          },
          {
            content: '我想了解如何使用Element UI组件库',
            placement: 'end',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/tft_set10_emblem_pbj.png',
            avatarSize: 40,
          },
          {
            content:
              'Element UI是一套为开发者、设计师和产品经理准备的基于Vue 2.0的桌面端组件库，提供了丰富的组件和功能。',
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

### 打字器效果和自动滚动

展示打字器效果和自动滚动到最新消息的功能。

:::demo

```html
<template>
  <div>
    <client-only>
      <el-x-bubble-list
        :list="typingMessages"
        :max-height="'300px'"
        @complete="onTypingComplete"
      />

      <div style="margin-top: 15px;">
        <el-button
          type="primary"
          size="small"
          @click="addMessage"
        >
          添加消息
        </el-button>
        <el-button
          type="success"
          size="small"
          @click="addTypingMessage"
        >
          添加打字效果消息
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
            content: '这是一条普通消息',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
            avatarSize: 40,
            isMarkdown: true,
          },
          {
            content: '这是我的回复',
            placement: 'end',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/tft_set10_emblem_pbj.png',
            avatarSize: 40,
            isMarkdown: true,
          },
          {
            content:
              '这是一条**带有打字效果**的消息，会逐字显示出来。\n\n当消息很长时，会自动滚动到底部。',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
            typing: { interval: 30, step: 2 },
            avatarSize: 40,
            isMarkdown: true,
          },
        ],
        messageCounter: 0,
      };
    },
    methods: {
      addMessage() {
        this.messageCounter++;
        this.typingMessages.push({
          content: `这是新添加的第${this.messageCounter}条普通消息`,
          placement: this.messageCounter % 2 === 0 ? 'end' : 'start',
          avatarSize: 40,
          isMarkdown: true,
          avatar:
            this.messageCounter % 2 === 0
              ? 'https://game.gtimg.cn/images/lol/act/img/tft/equip/tft_set10_emblem_pbj.png'
              : 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
        });
      },
      addTypingMessage() {
        this.messageCounter++;
        this.typingMessages.push({
          content: `这是新添加的第${this.messageCounter}条**打字效果**消息，会自动滚动到底部。\n\n- 项目1\n- 项目2\n- 项目3`,
          placement: 'start',
          avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
          typing: { interval: 30, step: 2 },
          avatarSize: 40,
          isMarkdown: true,
        });
      },
      onTypingComplete(instance, index) {
        console.log(`索引 ${index} 的消息完成打字`);
      },
    },
  };
</script>
```

:::

### 返回底部按钮

当滚动到顶部时，显示返回底部按钮。

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
          content: `这是第 ${
            i + 1
          } 条消息，向上滚动查看更多内容，滚动距离超过阈值时会显示返回底部按钮。${
            i % 3 === 0 ? '这是一条较长的消息内容，用于测试换行和布局效果。' : ''
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

### 自定义插槽

使用插槽自定义气泡的头像和内容。

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
            {{ item.placement === "start" ? "AI助手" : "用户" }}
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
          content: `这是第 ${i + 1} 条自定义消息，使用插槽自定义了头像、头部和底部内容。`,
          placement: i % 2 === 0 ? 'start' : 'end',
          time: new Date().toLocaleTimeString(),
          id: i,
        })),
      };
    },
    methods: {
      copyMessage(item) {
        this.$message.success(`已复制消息: ${item.id}`);
      },
      favoriteMessage(item) {
        this.$message.success(`已收藏消息: ${item.id}`);
      },
      likeMessage(item) {
        this.$message.success(`已点赞消息: ${item.id}`);
      },
      dislikeMessage(item) {
        this.$message.warning(`已踩消息: ${item.id}`);
      },
    },
  };
</script>
```

:::

### 加载状态和复杂消息

展示加载状态和不同类型的消息内容。

:::demo

```html
<template>
  <div>
    <client-only>
      <el-x-bubble-list
        :list="complexMessages"
        :max-height="'400px'"
      />

      <div style="margin-top: 15px;">
        <el-button
          type="primary"
          size="small"
          @click="sendMessage"
        >
          发送消息
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
            content: '你好，请问有什么可以帮助你的？',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
            avatarSize: 40,
          },
          {
            content: '我想了解Element UI的表格组件',
            placement: 'end',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/tft_set10_emblem_pbj.png',
            avatarSize: 40,
          },
          {
            content: `# Element UI 表格组件

Element UI 表格组件是一个强大的数据展示工具，提供了以下功能：

- 支持多选
- 排序和筛选
- 固定表头和列
- 自定义单元格内容

\`\`\`javascript
<el-table :data="tableData">
  <el-table-column prop="date" label="日期" width="180"></el-table-column>
  <el-table-column prop="name" label="姓名" width="180"></el-table-column>
  <el-table-column prop="address" label="地址"></el-table-column>
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
        // 移除加载消息
        this.complexMessages.pop();

        // 添加用户消息
        this.complexMessages.push({
          content: '谢谢，这个表格组件看起来很强大！',
          placement: 'end',
          avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/tft_set10_emblem_pbj.png',
          avatarSize: 40,
        });

        // 添加加载中状态
        this.complexMessages.push({
          loading: true,
          placement: 'start',
          avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
          avatarSize: 40,
        });

        // 模拟加载完成后添加新消息
        setTimeout(() => {
          // 移除加载消息
          this.complexMessages.pop();

          // 添加新消息
          this.complexMessages.push({
            content: '你还有其他关于Element UI的问题吗？',
            placement: 'start',
            avatar: 'https://game.gtimg.cn/images/lol/act/img/tft/equip/HandofJustice.png',
            typing: true,
            avatarSize: 40,
          });
        }, 2000);
      },
    },
  };
</script>
```

:::

## 属性

| 参数                | 说明                                                    | 类型           | 默认值                                       |
| ------------------- | ------------------------------------------------------- | -------------- | -------------------------------------------- |
| list                | 气泡列表数据                                            | Array          | []                                           |
| maxHeight           | 列表最大高度                                            | String         | '500px'                                      |
| triggerIndices      | 触发气泡完成事件的索引，可选值：'only-last'/'all'/Array | String/Array   | 'only-last'                                  |
| alwaysShowScrollbar | 是否始终显示滚动条                                      | Boolean        | false                                        |
| backButtonThreshold | 显示回到底部按钮的滚动阈值                              | Number         | 80                                           |
| showBackButton      | 是否显示回到底部按钮                                    | Boolean        | true                                         |
| backButtonPosition  | 回到底部按钮位置                                        | Object         | { bottom: '20px', left: 'calc(50% - 19px)' } |
| btnLoading          | 按钮是否显示加载动画                                    | Boolean        | true                                         |
| btnColor            | 按钮颜色                                                | String         | '#409EFF'                                    |
| btnIconSize         | 按钮图标大小                                            | Number         | 24                                           |

## 方法

| 方法名         | 说明             | 参数            | 返回值 |
| -------------- | ---------------- | --------------- | ------ |
| scrollToTop    | 滚动到顶部       | -               | -      |
| scrollToBottom | 滚动到底部       | -               | -      |
| scrollToBubble | 滚动到指定的气泡 | index: 气泡索引 | -      |

## 事件

| 事件名   | 说明             | 回调参数                              |
| -------- | ---------------- | ------------------------------------- |
| complete | 气泡打字完成事件 | (instance: 气泡实例, index: 气泡索引) |

## 插槽

| 插槽名       | 说明                                                 |
| ------------ | ---------------------------------------------------- |
| avatar       | 自定义头像内容，作用域参数: { item: 气泡数据项 }     |
| header       | 自定义气泡头部内容，作用域参数: { item: 气泡数据项 } |
| content      | 自定义气泡主体内容，作用域参数: { item: 气泡数据项 } |
| footer       | 自定义气泡底部内容，作用域参数: { item: 气泡数据项 } |
| loading      | 自定义加载状态内容，作用域参数: { item: 气泡数据项 } |
| backToBottom | 自定义返回底部按钮内容                               |
