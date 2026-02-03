# EditorSender 编辑输入框

## 功能说明

EditorSender 是一个功能强大的富文本输入组件，基于 ChatArea 构建，提供了丰富的文本编辑和标签插入功能，特别适合需要复杂内容输入的场景，如 AI 对话、模板编辑等。主要特性包括：

- 富文本编辑能力，支持多种标签类型（选择标签、输入标签、用户标签、自定义标签）
- @ 提及功能，支持异步加载用户列表
- 自定义触发符功能（如 #、! 等）
- 灵活的弹窗系统，支持内置弹窗和自定义弹窗
- 多种布局变体（默认布局和上下布局）
- 可扩展的插槽系统
- 完善的 API 接口，支持程序化操作
- 更多功能请前往 [ChatArea](https://jianfv.top/ChatAreaDoc/home)查看

## 使用示例

### 基础用法

最简单的使用方式，提供基本的富文本输入功能。

:::demo

```html
<template>
  <div>
    <el-x-editor-sender
      placeholder="请输入内容..."
      @submit="handleSubmit"
      @change="handleChange"
    />
  </div>
</template>

<script>
  export default {
    methods: {
      handleSubmit(data) {
        console.log('提交内容：', data.text);
        console.log('HTML内容：', data.html);
        this.$message.success('内容已提交');
      },
      handleChange() {
        console.log('内容发生变化');
      },
    },
  };
</script>
```

:::

### 标签功能

支持多种标签类型的插入和管理，包括选择标签、输入标签等。

:::demo

```html
<template>
  <div>
    <el-x-editor-sender
      ref="editorRef"
      placeholder="支持标签插入的编辑器"
      :select-list="selectList"
      :clearable="true"
      @submit="handleSubmit"
    >
      <template #header>
        <div style="padding: 20px;">
          <el-button @click="insertSelectTag">插入选择标签</el-button>
          <el-button @click="insertInputTag">插入输入标签</el-button>
          <el-button @click="insertText">插入文本</el-button>
        </div>
      </template>
    </el-x-editor-sender>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectList: [
          {
            dialogTitle: '风格选择',
            key: 'style',
            options: [
              {
                id: '1',
                name: '人像摄影',
                preview: 'https://jianfv.top/style/style1.webp',
              },
              {
                id: '2',
                name: '电影写真',
                preview: 'https://jianfv.top/style/style2.webp',
              },
              {
                id: '3',
                name: '中国风',
                preview: 'https://jianfv.top/style/style3.webp',
              },
            ],
          },
        ],
      };
    },
    methods: {
      handleSubmit(data) {
        console.log('提交的数据：', data);
        if (data.selectTags) {
          console.log('选择标签：', data.selectTags);
        }
        if (data.inputTags) {
          console.log('输入标签：', data.inputTags);
        }
      },
      insertSelectTag() {
        this.$refs.editorRef.setSelectTag('style', '1');
      },
      insertInputTag() {
        this.$refs.editorRef.setInputTag('name', '请输入名称', '默认值');
      },
      insertText() {
        this.$refs.editorRef.setText('这是插入的文本内容');
      },
    },
  };
</script>
```

:::

### @ 提及功能

支持 @ 用户功能，可以配置静态用户列表或异步加载。

:::demo

```html
<template>
  <div>
    <h4>静态用户列表</h4>
    <el-x-editor-sender
      placeholder="输入 @ 提及用户"
      :user-list="userList"
      @submit="handleSubmit"
    />

    <h4 style="margin-top: 30px;">异步加载用户</h4>
    <el-x-editor-sender
      placeholder="输入 @ 后输入关键词搜索"
      :async-match-fun="asyncSearchUsers"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userList: [
          { id: '1', name: '张三', avatar: 'https://element-ui-x.com/images/logo.png' },
          { id: '2', name: '李四', avatar: 'https://element-ui-x.com/images/logo.png' },
          { id: '3', name: '王五', avatar: 'https://element-ui-x.com/images/logo.png' },
        ],
      };
    },
    methods: {
      handleSubmit(data) {
        if (data.userTags) {
          console.log('提及的用户：', data.userTags);
        }
        this.$message.success('提交成功');
      },
      async asyncSearchUsers(keyword) {
        // 模拟异步搜索
        await new Promise(resolve => setTimeout(resolve, 300));

        const allUsers = [
          { id: '10', name: '赵六' },
          { id: '11', name: '钱七' },
          { id: '12', name: '孙八' },
        ];

        return allUsers.filter(user => user.name.toLowerCase().includes(keyword.toLowerCase()));
      },
    },
  };
</script>
```

:::

### 自定义触发符

可以配置自定义触发符，如 #话题、!工具 等。

:::demo

```html
<template>
  <div>
    <el-x-editor-sender
      placeholder="输入 # 创建话题，输入 ! 调用工具"
      :custom-trigger="customTrigger"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        customTrigger: [
          {
            dialogTitle: '话题',
            prefix: '#',
            tagList: [
              { id: 'topic1', name: '技术分享' },
              { id: 'topic2', name: '产品讨论' },
              { id: 'topic3', name: '团队建设' },
            ],
          },
          {
            dialogTitle: '工具',
            prefix: '!',
            tagList: [
              { id: 'tool1', name: '代码格式化' },
              { id: 'tool2', name: '翻译助手' },
              { id: 'tool3', name: '时间转换' },
            ],
          },
        ],
      };
    },
    methods: {
      handleSubmit(data) {
        if (data.customTags) {
          console.log('自定义标签：', data.customTags);
        }
        this.$message.success('提交成功');
      },
    },
  };
</script>
```

:::

### 布局变体

提供两种布局模式：默认布局和上下布局。

:::demo

```html
<template>
  <div>
    <h4>默认布局</h4>
    <el-x-editor-sender
      placeholder="默认布局 - 操作按钮在右侧"
      variant="default"
      :clearable="true"
      :loading="loading1"
      @submit="handleSubmit1"
    />

    <h4 style="margin-top: 30px;">上下布局</h4>
    <el-x-editor-sender
      placeholder="上下布局 - 操作按钮在下方"
      variant="updown"
      :clearable="true"
      :loading="loading2"
      @submit="handleSubmit2"
    >
      <template #prefix>
        <el-button
          size="small"
          icon="el-icon-paperclip"
          circle
        />
        <el-button
          size="small"
          icon="el-icon-picture"
          circle
        />
      </template>
    </el-x-editor-sender>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading1: false,
        loading2: false,
      };
    },
    methods: {
      handleSubmit1(data) {
        this.loading1 = true;
        setTimeout(() => {
          this.loading1 = false;
          this.$message.success('默认布局提交成功');
        }, 2000);
      },
      handleSubmit2(data) {
        this.loading2 = true;
        setTimeout(() => {
          this.loading2 = false;
          this.$message.success('上下布局提交成功');
        }, 2000);
      },
    },
  };
</script>
```

:::

### 自定义弹窗

支持完全自定义弹窗，满足特殊交互需求。

:::demo

```html
<template>
  <div>
    <el-x-editor-sender
      ref="customEditor"
      placeholder="使用自定义弹窗"
      :custom-dialog="true"
      :select-list="selectList"
      :user-list="userList"
      @show-select-dialog="handleShowSelectDialog"
      @show-at-dialog="handleShowAtDialog"
      @submit="handleSubmit"
    />

    <!-- 自定义选择弹窗 -->
    <el-dialog
      :visible.sync="selectDialogVisible"
      title="选择风格"
      width="400px"
    >
      <div class="custom-select-list">
        <div
          v-for="option in currentOptions"
          :key="option.id"
          class="custom-select-item"
          @click="handleSelectOption(option)"
        >
          {{ option.name }}
        </div>
      </div>
    </el-dialog>

    <!-- 自定义用户弹窗 -->
    <el-dialog
      :visible.sync="userDialogVisible"
      title="选择用户"
      width="400px"
    >
      <div class="custom-user-list">
        <div
          v-for="user in userList"
          :key="user.id"
          class="custom-user-item"
          @click="handleSelectUser(user)"
        >
          <span>{{ user.name }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectDialogVisible: false,
        userDialogVisible: false,
        currentKey: '',
        currentOptions: [],
        selectList: [
          {
            key: 'style',
            options: [
              { id: '1', name: '简约风格' },
              { id: '2', name: '科技风格' },
            ],
          },
        ],
        userList: [
          { id: '1', name: '张三' },
          { id: '2', name: '李四' },
        ],
      };
    },
    methods: {
      handleShowSelectDialog(key, elm) {
        this.currentKey = key;
        this.currentOptions = this.selectList.find(item => item.key === key)?.options || [];
        this.selectDialogVisible = true;
      },
      handleShowAtDialog() {
        this.userDialogVisible = true;
      },
      handleSelectOption(option) {
        this.$refs.customEditor.setSelectTag(this.currentKey, option.id);
        this.selectDialogVisible = false;
      },
      handleSelectUser(user) {
        this.$refs.customEditor.customSetUser(user);
        this.userDialogVisible = false;
      },
      handleSubmit(data) {
        console.log('提交数据：', data);
      },
    },
  };
</script>

<style scoped>
  .custom-select-item,
  .custom-user-item {
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
  }
  .custom-select-item:hover,
  .custom-user-item:hover {
    background-color: #f5f5f5;
  }
</style>
```

:::

### 高级功能

展示编辑器的所有高级功能，包括文本操作、标签插入、混合内容等。

:::demo

```html
<template>
  <div class="editor-sender-demo">
    <div style="display: flex; margin-bottom: 20px">
      <el-button
        type="primary"
        plain
        @click="$refs.editorRef.focusToStart()"
      >
        文本最前方
      </el-button>
      <el-button
        type="primary"
        plain
        @click="$refs.editorRef.focusToEnd()"
      >
        文本最后方
      </el-button>
      <el-button
        type="primary"
        plain
        @click="$refs.editorRef.selectAll()"
      >
        内容全选
      </el-button>
      <el-button
        type="primary"
        plain
        @click="$refs.editorRef.onBlur()"
      >
        失去焦点
      </el-button>
      <el-button
        type="primary"
        plain
        @click="$refs.editorRef.onClear()"
      >
        清空内容
      </el-button>
    </div>

    <el-x-editor-sender
      ref="editorRef"
      placeholder="高级功能演示"
      :loading="loading"
      :select-list="selectList"
      :user-list="userList"
      :custom-trigger="customTrigger"
      :clearable="true"
      @change="handleChange"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
      <!-- 自定义前缀按钮 -->
      <template #prefix>
        <el-button size="small">
          <span>自定义前缀</span>
        </el-button>

        <el-button
          type="primary"
          size="small"
          @click="showHeader = !showHeader"
        >
          打开/关闭头部
        </el-button>
      </template>

      <!-- 自定义头部 -->
      <template
        v-if="showHeader"
        #header
      >
        <div class="header-self-wrap">
          <div class="header-self-title">
            <div class="header-left">💯 欢迎使用 Element UI X</div>
            <div class="header-right">
              <el-button @click.stop="showHeader = false">
                <span>关闭头部</span>
              </el-button>
            </div>
          </div>
          <div class="header-self-content">
            <el-button
              type="primary"
              plain
              @click="insertText"
            >
              插入text内容
            </el-button>
            <el-button
              type="primary"
              plain
              @click="insertHtml"
            >
              插入html片段
            </el-button>
            <el-button
              type="primary"
              plain
              @click="insertSelectTag"
            >
              插入选择标签
            </el-button>
            <el-button
              type="primary"
              plain
              @click="insertInputTag"
            >
              插入输入标签
            </el-button>
            <el-button
              type="primary"
              plain
              @click="insertInputTagWithDefault"
            >
              插入默认值输入标签
            </el-button>
            <el-button
              type="primary"
              plain
              @click="insertUserTag"
            >
              插入用户标签
            </el-button>
            <el-button
              type="primary"
              plain
              @click="insertCustomTag"
            >
              插入自定义标签
            </el-button>
            <el-button
              type="primary"
              plain
              @click="setMixTags"
            >
              混合标签覆盖写入
            </el-button>
            <el-button
              id="dialogBtn"
              type="primary"
              plain
              @click="openSelectDialog"
            >
              外部调用选择标签弹窗
            </el-button>
            <el-button
              type="primary"
              plain
              @click="openTipTag"
            >
              打开前置提示标签
            </el-button>
            <el-button
              type="primary"
              plain
              @click="closeTipTag"
            >
              关闭前置提示标签
            </el-button>
          </div>
        </div>
      </template>

      <!-- 自定义底部插槽 -->
      <template #footer>
        <div style="display: flex; align-items: center; justify-content: center; padding: 12px">
          默认变体 自定义底部
        </div>
      </template>
    </el-x-editor-sender>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        showHeader: true,
        selectList: [
          {
            dialogTitle: '风格选择',
            key: 'style',
            options: [
              {
                id: '1',
                name: '人像摄影',
                preview: 'https://jianfv.top/style/style1.webp',
              },
              {
                id: '2',
                name: '电影写真',
                preview: 'https://jianfv.top/style/style2.webp',
              },
              {
                id: '3',
                name: '中国风',
                preview: 'https://jianfv.top/style/style3.webp',
              },
            ],
          },
        ],
        userList: [
          { id: '5', name: '张三丰' },
          { id: '1', name: '张三' },
          { id: '2', name: '李四' },
          { id: '3', name: '王五' },
          { id: '4', name: '马六' },
        ],
        customTrigger: [
          {
            dialogTitle: '群话题',
            prefix: '#',
            tagList: [
              { id: 'ht1', name: '话题一' },
              { id: 'ht2', name: '话题二' },
            ],
          },
          {
            dialogTitle: '群工具',
            prefix: '!',
            tagList: [
              { id: 'gj1', name: '工具一' },
              { id: 'gj2', name: '工具二' },
            ],
          },
        ],
      };
    },
    methods: {
      handleChange() {
        console.log('内容发生变化');
      },
      handleSubmit(data) {
        this.loading = true;
        console.log('文本内容:', data.text);
        console.log('HTML内容:', data.html);
        console.log('输入标签:', data.inputTags);
        console.log('选择标签:', data.selectTags);
        console.log('用户标签:', data.userTags);
        console.log('自定义标签:', data.customTags);

        setTimeout(() => {
          this.loading = false;
          this.$message.success('提交成功');
        }, 2000);
      },
      handleCancel() {
        this.loading = false;
        this.$message.info('已取消');
      },
      insertText() {
        this.$refs.editorRef.setText('1024');
      },
      insertHtml() {
        this.$refs.editorRef.setHtml(
          `<img class="img-tag" src="https://cdn.element-plus-x.com/element-plus-x.png" alt="">`,
        );
      },
      insertSelectTag() {
        this.$refs.editorRef.setSelectTag('style', '1');
      },
      insertInputTag() {
        this.$refs.editorRef.setInputTag('job', '请输入你的职业');
      },
      insertInputTagWithDefault() {
        this.$refs.editorRef.setInputTag('job', '请输入你的职业', '开发者');
      },
      insertUserTag() {
        this.$refs.editorRef.setUserTag('5');
      },
      insertCustomTag() {
        this.$refs.editorRef.setCustomTag('#', 'ht1');
      },
      setMixTags() {
        this.$refs.editorRef.setMixTags([
          [
            {
              type: 'gridInput',
              value: '这是第一行，请根据以下文案内容绘制一张图片：',
            },
            {
              type: 'inputTag',
              key: 'content',
              placeholder: '[文案内容]',
              value:
                '太阳由那扇大玻璃窗透入屋内，先是落在墙上，接着映照到桌上，最终，也照到了我那可爱的小床上来咯',
            },
            {
              type: 'gridInput',
              value: '。风格是',
            },
            {
              type: 'selectTag',
              key: 'style',
              value: '1',
            },
            {
              type: 'gridInput',
              value: '，画面内是',
            },
            {
              type: 'inputTag',
              key: 'content',
              placeholder: '[画面内容]',
              value: '光从大落地窗照进房间内，照在墙面、地板、桌子、床上',
            },
            {
              type: 'gridInput',
              value: '。画面主体要突出，画面的色彩搭配和整体氛围要贴合文案所围绕的主题。',
            },
          ],
          [
            {
              type: 'gridInput',
              value: '这是第二行。',
            },
          ],
          [
            {
              type: 'gridInput',
              value: '这是第三行。',
            },
            {
              type: 'htmlTag',
              value:
                '<img class="img-tag" src="https://cdn.element-plus-x.com/element-plus-x.png" alt="">',
            },
          ],
        ]);
      },
      openSelectDialog() {
        this.$refs.editorRef.openSelectDialog({
          key: 'style',
          elm: document.getElementById('dialogBtn'),
          beforeText: '[自定义前置内容]',
          afterText: '[自定义后置内容]',
        });
      },
      openTipTag() {
        this.$refs.editorRef.openTipTag({
          tagLabel: '图像生成',
          popoverLabel: '点击退出技能',
        });
      },
      closeTipTag() {
        this.$refs.editorRef.closeTipTag();
      },
    },
  };
</script>

<style>
  .editor-sender-demo {
    width: 100%;
  }

  .header-self-wrap {
    display: flex;
    flex-direction: column;
    padding: 16px;
    height: 300px;
  }

  .header-self-wrap .header-self-title {
    width: 100%;
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
  }

  .header-self-wrap .header-self-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .el-editor-sender-wrap img.img-tag {
    width: auto;
    height: 24px;
    vertical-align: middle;
  }
</style>
```

:::

## 属性

| 参数                 | 说明                                        | 类型     | 默认值       |
| -------------------- | ------------------------------------------- | -------- | ------------ |
| placeholder          | 输入框占位文本                              | String   | '请输入内容' |
| device               | 设备类型，影响弹窗交互方式，可选 'pc'、'h5' | String   | 'pc'         |
| autoFocus            | 是否自动聚焦                                | Boolean  | false        |
| variant              | 布局变体，可选 'default'、'updown'          | String   | 'default'    |
| selectList           | 选择标签配置列表                            | Array    | []           |
| userList             | 用户列表，用于 @ 功能                       | Array    | []           |
| customTrigger        | 自定义触发符配置                            | Array    | []           |
| maxLength            | 最大字符数限制                              | Number   | undefined    |
| submitType           | 提交快捷键，可选 'enter'、'shiftEnter'      | String   | 'enter'      |
| customStyle          | 自定义输入框样式                            | Object   | {}           |
| loading              | 加载状态                                    | Boolean  | false        |
| disabled             | 是否禁用                                    | Boolean  | false        |
| clearable            | 是否显示清空按钮                            | Boolean  | false        |
| headerAnimationTimer | 头部动画时长(ms)                            | Number   | 300          |
| asyncMatchFun        | 异步匹配函数，用于 @ 功能                   | Function | undefined    |
| customDialog         | 是否使用自定义弹窗                          | Boolean  | false        |

### selectList 配置项

```javascript
[
  {
    dialogTitle: '对话框标题',
    key: '唯一标识',
    options: [
      {
        id: '选项ID',
        name: '选项名称',
        preview: '预览图URL(可选)',
      },
    ],
  },
];
```

### userList 配置项

```javascript
[
  {
    id: '用户ID',
    name: '用户名',
    avatar: '头像URL(可选)',
  },
];
```

### customTrigger 配置项

```javascript
[
  {
    dialogTitle: '对话框标题',
    prefix: '触发符（如 #、!）',
    tagList: [
      {
        id: '标签ID',
        name: '标签名称',
      },
    ],
  },
];
```

## 方法

| 方法名           | 说明               | 参数                                                      |
| ---------------- | ------------------ | --------------------------------------------------------- |
| getCurrentValue  | 获取当前编辑器内容 | -                                                         |
| focusToStart     | 将光标移到开头     | -                                                         |
| focusToEnd       | 将光标移到末尾     | -                                                         |
| onBlur           | 失去焦点           | -                                                         |
| selectAll        | 全选内容           | -                                                         |
| onClear          | 清空内容           | (text?: string)                                           |
| setText          | 插入文本           | (text: string)                                            |
| setHtml          | 插入 HTML          | (html: string)                                            |
| setSelectTag     | 插入选择标签       | (key: string, tagId: string)                              |
| setInputTag      | 插入输入标签       | (key: string, placeholder: string, defaultValue?: string) |
| setUserTag       | 插入用户标签       | (userId: string)                                          |
| setCustomTag     | 插入自定义标签     | (prefix: string, id: string)                              |
| setMixTags       | 设置混合内容       | (tags: Array)                                             |
| openSelectDialog | 打开选择弹窗       | (option: { key, elm, beforeText?, afterText? })           |
| openTipTag       | 显示提示标签       | (options: { tagLabel, popoverLabel })                     |
| closeTipTag      | 关闭提示标签       | -                                                         |
| customSetUser    | 自定义弹窗设置用户 | (user: object)                                            |
| customSetTag     | 自定义弹窗设置标签 | (prefix: string, tag: object)                             |
| updateSelectTag  | 更新选择标签       | (elm: Element, tag: object)                               |

## 事件

| 事件名             | 说明                 | 回调参数                                                    |
| ------------------ | -------------------- | ----------------------------------------------------------- |
| submit             | 提交时触发           | { text, html, inputTags, userTags, selectTags, customTags } |
| change             | 内容变化时触发       | -                                                           |
| cancel             | 取消时触发           | -                                                           |
| show-at-dialog     | 触发 @ 弹窗时        | -                                                           |
| show-select-dialog | 触发选择弹窗时       | (key: string, elm: Element)                                 |
| show-tag-dialog    | 触发自定义标签弹窗时 | (prefix: string)                                            |

## 插槽

| 插槽名      | 说明         |
| ----------- | ------------ |
| header      | 头部内容     |
| footer      | 底部内容     |
| prefix      | 前缀内容     |
| action-list | 操作按钮列表 |

## 注意事项

1. **性能考虑**：`maxLength` 配置会带来较大的性能开销，非必要情况下不建议设置
2. **自定义弹窗**：当 `customDialog` 为 true 时，需要自行实现所有弹窗逻辑
3. **异步加载**：使用 `asyncMatchFun` 时，函数需要返回符合用户列表格式的数组
4. **设备适配**：`device` 属性会影响弹窗的交互方式，移动端建议使用自定义弹窗
5. **HTML 插入**：通过 `setHtml` 插入的内容必须是行内或行内块元素
