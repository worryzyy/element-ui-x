# EditorSender Input Box

## Overview

EditorSender is a powerful rich text input component built on ChatArea, providing rich text editing and tag insertion capabilities. It's particularly suitable for scenarios requiring complex content input, such as AI conversations and template editing. Key features include:

- Rich text editing with support for multiple tag types (select tags, input tags, user tags, custom tags)
- @ mention functionality with async user list loading
- Custom trigger characters (e.g., #, !)
- Flexible dialog system supporting both built-in and custom dialogs
- Multiple layout variants (default and up-down layouts)
- Extensible slot system
- Comprehensive API for programmatic operations
- For more features, please visit [ChatArea](https://jianfv.top/ChatAreaDoc/home) to view

## Examples

### Basic Usage

The simplest way to use the component with basic rich text input functionality.

:::demo

```html
<template>
  <div>
    <el-x-editor-sender
      placeholder="Enter content..."
      @submit="handleSubmit"
      @change="handleChange"
    />
  </div>
</template>

<script>
  export default {
    methods: {
      handleSubmit(data) {
        console.log('Text content:', data.text);
        console.log('HTML content:', data.html);
        this.$message.success('Content submitted');
      },
      handleChange() {
        console.log('Content changed');
      },
    },
  };
</script>
```

:::

### Tag Features

Supports insertion and management of various tag types including select tags and input tags.

:::demo

```html
<template>
  <div>
    <el-x-editor-sender
      ref="editorRef"
      placeholder="Editor with tag support"
      :select-list="selectList"
      :clearable="true"
      @submit="handleSubmit"
    >
      <template #header>
        <div style="padding: 20px;">
          <el-button @click="insertSelectTag">Insert Select Tag</el-button>
          <el-button @click="insertInputTag">Insert Input Tag</el-button>
          <el-button @click="insertText">Insert Text</el-button>
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
            dialogTitle: 'Style Selection',
            key: 'style',
            options: [
              {
                id: '1',
                name: 'Minimal Style',
                preview: 'https://jianfv.top/style/style1.webp',
              },
              { id: '2', name: 'Tech Style', preview: 'https://jianfv.top/style/style2.webp' },
              {
                id: '3',
                name: 'Vintage Style',
                preview: 'https://jianfv.top/style/style3.webp',
              },
            ],
          },
        ],
      };
    },
    methods: {
      handleSubmit(data) {
        console.log('Submitted data:', data);
        if (data.selectTags) {
          console.log('Select tags:', data.selectTags);
        }
        if (data.inputTags) {
          console.log('Input tags:', data.inputTags);
        }
      },
      insertSelectTag() {
        this.$refs.editorRef.setSelectTag('style', '1');
      },
      insertInputTag() {
        this.$refs.editorRef.setInputTag('name', 'Enter name', 'Default value');
      },
      insertText() {
        this.$refs.editorRef.setText('This is inserted text');
      },
    },
  };
</script>
```

:::

### @ Mention Feature

Supports @ mentioning users with static user lists or async loading.

:::demo

```html
<template>
  <div>
    <h4>Static User List</h4>
    <el-x-editor-sender
      placeholder="Type @ to mention users"
      :user-list="userList"
      @submit="handleSubmit"
    />

    <h4 style="margin-top: 30px;">Async User Loading</h4>
    <el-x-editor-sender
      placeholder="Type @ then search keywords"
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
          { id: '1', name: 'John Doe', avatar: 'https://element-ui-x.com/images/logo.png' },
          { id: '2', name: 'Jane Smith', avatar: 'https://element-ui-x.com/images/logo.png' },
          { id: '3', name: 'Bob Johnson', avatar: 'https://element-ui-x.com/images/logo.png' },
        ],
      };
    },
    methods: {
      handleSubmit(data) {
        if (data.userTags) {
          console.log('Mentioned users:', data.userTags);
        }
        this.$message.success('Submitted successfully');
      },
      async asyncSearchUsers(keyword) {
        // Simulate async search
        await new Promise(resolve => setTimeout(resolve, 300));

        const allUsers = [
          { id: '10', name: 'Alice Brown' },
          { id: '11', name: 'Charlie Wilson' },
          { id: '12', name: 'David Lee' },
        ];

        return allUsers.filter(user => user.name.toLowerCase().includes(keyword.toLowerCase()));
      },
    },
  };
</script>
```

:::

### Custom Triggers

Configure custom trigger characters like #topics, !tools, etc.

:::demo

```html
<template>
  <div>
    <el-x-editor-sender
      placeholder="Type # for topics, ! for tools"
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
            dialogTitle: 'Topics',
            prefix: '#',
            tagList: [
              { id: 'topic1', name: 'Tech Sharing' },
              { id: 'topic2', name: 'Product Discussion' },
              { id: 'topic3', name: 'Team Building' },
            ],
          },
          {
            dialogTitle: 'Tools',
            prefix: '!',
            tagList: [
              { id: 'tool1', name: 'Code Formatter' },
              { id: 'tool2', name: 'Translation Helper' },
              { id: 'tool3', name: 'Time Converter' },
            ],
          },
        ],
      };
    },
    methods: {
      handleSubmit(data) {
        if (data.customTags) {
          console.log('Custom tags:', data.customTags);
        }
        this.$message.success('Submitted successfully');
      },
    },
  };
</script>
```

:::

### Layout Variants

Two layout modes available: default layout and up-down layout.

:::demo

```html
<template>
  <div>
    <h4>Default Layout</h4>
    <el-x-editor-sender
      placeholder="Default layout - action buttons on the right"
      variant="default"
      :clearable="true"
      :loading="loading1"
      @submit="handleSubmit1"
    />

    <h4 style="margin-top: 30px;">Up-Down Layout</h4>
    <el-x-editor-sender
      placeholder="Up-down layout - action buttons below"
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
          this.$message.success('Default layout submitted');
        }, 2000);
      },
      handleSubmit2(data) {
        this.loading2 = true;
        setTimeout(() => {
          this.loading2 = false;
          this.$message.success('Up-down layout submitted');
        }, 2000);
      },
    },
  };
</script>
```

:::

### Custom Dialogs

Support for fully custom dialogs to meet special interaction requirements.

:::demo

```html
<template>
  <div>
    <el-x-editor-sender
      ref="customEditor"
      placeholder="Using custom dialogs"
      :custom-dialog="true"
      :select-list="selectList"
      :user-list="userList"
      @show-select-dialog="handleShowSelectDialog"
      @show-at-dialog="handleShowAtDialog"
      @submit="handleSubmit"
    />

    <!-- Custom select dialog -->
    <el-dialog
      :visible.sync="selectDialogVisible"
      title="Select Style"
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

    <!-- Custom user dialog -->
    <el-dialog
      :visible.sync="userDialogVisible"
      title="Select User"
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
              { id: '1', name: 'Minimal Style' },
              { id: '2', name: 'Tech Style' },
            ],
          },
        ],
        userList: [
          { id: '1', name: 'John Doe' },
          { id: '2', name: 'Jane Smith' },
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
        console.log('Submitted data:', data);
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

### Advanced Features

Demonstrates all advanced editor features including text operations, tag insertion, mixed content, and more.

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
        Focus to Start
      </el-button>
      <el-button
        type="primary"
        plain
        @click="$refs.editorRef.focusToEnd()"
      >
        Focus to End
      </el-button>
      <el-button
        type="primary"
        plain
        @click="$refs.editorRef.selectAll()"
      >
        Select All
      </el-button>
      <el-button
        type="primary"
        plain
        @click="$refs.editorRef.onBlur()"
      >
        Blur
      </el-button>
      <el-button
        type="primary"
        plain
        @click="$refs.editorRef.onClear()"
      >
        Clear Content
      </el-button>
    </div>

    <el-x-editor-sender
      ref="editorRef"
      placeholder="Advanced features demo"
      :loading="loading"
      :select-list="selectList"
      :user-list="userList"
      :custom-trigger="customTrigger"
      :clearable="true"
      @change="handleChange"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
      <!-- Custom prefix buttons -->
      <template #prefix>
        <el-button size="small">
          <span>Custom Prefix</span>
        </el-button>

        <el-button
          type="primary"
          size="small"
          @click="showHeader = !showHeader"
        >
          Toggle Header
        </el-button>
      </template>

      <!-- Custom header -->
      <template
        v-if="showHeader"
        #header
      >
        <div class="header-self-wrap">
          <div class="header-self-title">
            <div class="header-left">💯 Welcome to Element UI X</div>
            <div class="header-right">
              <el-button @click.stop="showHeader = false">
                <span>Close Header</span>
              </el-button>
            </div>
          </div>
          <div class="header-self-content">
            <el-button
              type="primary"
              plain
              @click="insertText"
            >
              Insert Text
            </el-button>
            <el-button
              type="primary"
              plain
              @click="insertHtml"
            >
              Insert HTML
            </el-button>
            <el-button
              type="primary"
              plain
              @click="insertSelectTag"
            >
              Insert Select Tag
            </el-button>
            <el-button
              type="primary"
              plain
              @click="insertInputTag"
            >
              Insert Input Tag
            </el-button>
            <el-button
              type="primary"
              plain
              @click="insertInputTagWithDefault"
            >
              Insert Input Tag with Default
            </el-button>
            <el-button
              type="primary"
              plain
              @click="insertUserTag"
            >
              Insert User Tag
            </el-button>
            <el-button
              type="primary"
              plain
              @click="insertCustomTag"
            >
              Insert Custom Tag
            </el-button>
            <el-button
              type="primary"
              plain
              @click="setMixTags"
            >
              Set Mixed Tags
            </el-button>
            <el-button
              id="dialogBtn"
              type="primary"
              plain
              @click="openSelectDialog"
            >
              Open Select Dialog
            </el-button>
            <el-button
              type="primary"
              plain
              @click="openTipTag"
            >
              Show Tip Tag
            </el-button>
            <el-button
              type="primary"
              plain
              @click="closeTipTag"
            >
              Close Tip Tag
            </el-button>
          </div>
        </div>
      </template>

      <!-- Custom footer slot -->
      <template #footer>
        <div style="display: flex; align-items: center; justify-content: center; padding: 12px">
          Default variant custom footer
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
            dialogTitle: 'Style Selection',
            key: 'style',
            options: [
              {
                id: '1',
                name: 'Portrait Photography',
                preview: 'https://jianfv.top/style/style1.webp',
              },
              { id: '2', name: 'Cinematic', preview: 'https://jianfv.top/style/style2.webp' },
              {
                id: '3',
                name: 'Chinese Style',
                preview: 'https://jianfv.top/style/style3.webp',
              },
            ],
          },
        ],
        userList: [
          { id: '5', name: 'John Legend' },
          { id: '1', name: 'John Doe' },
          { id: '2', name: 'Jane Smith' },
          { id: '3', name: 'Bob Johnson' },
          { id: '4', name: 'Alice Brown' },
        ],
        customTrigger: [
          {
            dialogTitle: 'Topics',
            prefix: '#',
            tagList: [
              { id: 'ht1', name: 'Topic One' },
              { id: 'ht2', name: 'Topic Two' },
            ],
          },
          {
            dialogTitle: 'Tools',
            prefix: '!',
            tagList: [
              { id: 'gj1', name: 'Tool One' },
              { id: 'gj2', name: 'Tool Two' },
            ],
          },
        ],
      };
    },
    methods: {
      handleChange() {
        console.log('Content changed');
      },
      handleSubmit(data) {
        this.loading = true;
        console.log('Text content:', data.text);
        console.log('HTML content:', data.html);
        console.log('Input tags:', data.inputTags);
        console.log('Select tags:', data.selectTags);
        console.log('User tags:', data.userTags);
        console.log('Custom tags:', data.customTags);

        setTimeout(() => {
          this.loading = false;
          this.$message.success('Submitted successfully');
        }, 2000);
      },
      handleCancel() {
        this.loading = false;
        this.$message.info('Cancelled');
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
        this.$refs.editorRef.setInputTag('job', 'Enter your profession');
      },
      insertInputTagWithDefault() {
        this.$refs.editorRef.setInputTag('job', 'Enter your profession', 'Developer');
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
              value:
                'This is the first line, please generate an image based on the following content: ',
            },
            {
              type: 'inputTag',
              key: 'content',
              placeholder: '[Content]',
              value:
                'The sun shines through the large glass window into the room, first falling on the wall, then reflecting on the table, and finally reaching my lovely little bed',
            },
            {
              type: 'gridInput',
              value: '. The style is ',
            },
            {
              type: 'selectTag',
              key: 'style',
              value: '1',
            },
            {
              type: 'gridInput',
              value: ', the scene shows ',
            },
            {
              type: 'inputTag',
              key: 'content',
              placeholder: '[Scene content]',
              value:
                'Light from the large floor-to-ceiling window illuminating the room, shining on the walls, floor, table, and bed',
            },
            {
              type: 'gridInput',
              value:
                '. The main subject should be prominent, and the color scheme and overall atmosphere should match the theme.',
            },
          ],
          [
            {
              type: 'gridInput',
              value: 'This is the second line.',
            },
          ],
          [
            {
              type: 'gridInput',
              value: 'This is the third line.',
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
          beforeText: '[Custom prefix content]',
          afterText: '[Custom suffix content]',
        });
      },
      openTipTag() {
        this.$refs.editorRef.openTipTag({
          tagLabel: 'Image Generation',
          popoverLabel: 'Click to exit skill',
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

## Props

| Property             | Description                                        | Type     | Default      |
| -------------------- | -------------------------------------------------- | -------- | ------------ |
| placeholder          | Input placeholder text                             | String   | '请输入内容' |
| device               | Device type, affects dialog interaction: 'pc','h5' | String   | 'pc'         |
| autoFocus            | Auto focus on mount                                | Boolean  | false        |
| variant              | Layout variant: 'default', 'updown'                | String   | 'default'    |
| selectList           | Select tag configuration list                      | Array    | []           |
| userList             | User list for @ mentions                           | Array    | []           |
| customTrigger        | Custom trigger configuration                       | Array    | []           |
| maxLength            | Maximum character limit                            | Number   | undefined    |
| submitType           | Submit shortcut: 'enter', 'shiftEnter'             | String   | 'enter'      |
| customStyle          | Custom input box styles                            | Object   | {}           |
| loading              | Loading state                                      | Boolean  | false        |
| disabled             | Disabled state                                     | Boolean  | false        |
| clearable            | Show clear button                                  | Boolean  | false        |
| headerAnimationTimer | Header animation duration (ms)                     | Number   | 300          |
| asyncMatchFun        | Async match function for @ mentions                | Function | undefined    |
| customDialog         | Use custom dialogs                                 | Boolean  | false        |

### selectList Configuration

```javascript
[
  {
    dialogTitle: 'Dialog title',
    key: 'Unique key',
    options: [
      {
        id: 'Option ID',
        name: 'Option name',
        preview: 'Preview image URL (optional)',
      },
    ],
  },
];
```

### userList Configuration

```javascript
[
  {
    id: 'User ID',
    name: 'Username',
    avatar: 'Avatar URL (optional)',
  },
];
```

### customTrigger Configuration

```javascript
[
  {
    dialogTitle: 'Dialog title',
    prefix: 'Trigger character (e.g., #, !)',
    tagList: [
      {
        id: 'Tag ID',
        name: 'Tag name',
      },
    ],
  },
];
```

## Methods

| Method           | Description                | Parameters                                                |
| ---------------- | -------------------------- | --------------------------------------------------------- |
| getCurrentValue  | Get current editor content | -                                                         |
| focusToStart     | Move cursor to start       | -                                                         |
| focusToEnd       | Move cursor to end         | -                                                         |
| onBlur           | Blur the editor            | -                                                         |
| selectAll        | Select all content         | -                                                         |
| onClear          | Clear content              | (text?: string)                                           |
| setText          | Insert text                | (text: string)                                            |
| setHtml          | Insert HTML                | (html: string)                                            |
| setSelectTag     | Insert select tag          | (key: string, tagId: string)                              |
| setInputTag      | Insert input tag           | (key: string, placeholder: string, defaultValue?: string) |
| setUserTag       | Insert user tag            | (userId: string)                                          |
| setCustomTag     | Insert custom tag          | (prefix: string, id: string)                              |
| setMixTags       | Set mixed content          | (tags: Array)                                             |
| openSelectDialog | Open select dialog         | (option: { key, elm, beforeText?, afterText? })           |
| openTipTag       | Show tip tag               | (options: { tagLabel, popoverLabel })                     |
| closeTipTag      | Close tip tag              | -                                                         |
| customSetUser    | Custom dialog set user     | (user: object)                                            |
| customSetTag     | Custom dialog set tag      | (prefix: string, tag: object)                             |
| updateSelectTag  | Update select tag          | (elm: Element, tag: object)                               |

## Events

| Event              | Description                                  | Parameters                                                  |
| ------------------ | -------------------------------------------- | ----------------------------------------------------------- |
| submit             | Triggered on submit                          | { text, html, inputTags, userTags, selectTags, customTags } |
| change             | Triggered on content change                  | -                                                           |
| cancel             | Triggered on cancel                          | -                                                           |
| show-at-dialog     | Triggered when @ dialog should show          | -                                                           |
| show-select-dialog | Triggered when select dialog should show     | (key: string, elm: Element)                                 |
| show-tag-dialog    | Triggered when custom tag dialog should show | (prefix: string)                                            |

## Slots

| Slot        | Description        |
| ----------- | ------------------ |
| header      | Header content     |
| footer      | Footer content     |
| prefix      | Prefix content     |
| action-list | Action button list |

## Notes

1. **Performance**: The `maxLength` configuration has significant performance overhead, avoid using unless necessary
2. **Custom Dialogs**: When `customDialog` is true, you need to implement all dialog logic
3. **Async Loading**: When using `asyncMatchFun`, the function must return an array matching the user list format
4. **Device Adaptation**: The `device` property affects dialog interaction, custom dialogs are recommended for mobile
5. **HTML Insertion**: Content inserted via `setHtml` must be inline or inline-block elements
