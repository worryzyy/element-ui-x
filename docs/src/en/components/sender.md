# Sender Message Input Component

## Features

A message input component for user input and message sending, supporting the following features:

- Auto-resizing text input area
- Support for two layout variants (default and vertical layout)
- Built-in speech recognition (using browser Web Speech API)
- Customizable header and footer content
- Trigger character popup functionality
- Multiple submission methods (Enter/Shift+Enter)
- Built-in action buttons (send, cancel, clear, voice)
- Disabled and readonly state support

## Usage Examples

### Basic Usage

Basic message input component usage with default layout and basic functionality.

:::demo

```html
<template>
  <div>
    <el-x-sender
      v-model="message"
      placeholder="Please enter message..."
      @submit="handleSubmit"
    />
    <br />
    <el-x-sender
      style="width: fit-content;"
      inputWidth="300px"
      placeholder="💌 Element-UI-X"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: '',
      };
    },
    methods: {
      handleSubmit(value) {
        this.$message.success(`Send message: ${value}`);
        this.message = '';
      },
    },
  };
</script>
```

:::

### Component Instance Methods

Example of using component instance method calls.

:::demo

```html
<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex;">
      <el-button
        type="primary"
        style="width: fit-content;"
        @click="$refs.senderRef.clear()"
      >
        Clear using component instance
      </el-button>
      <el-button
        type="primary"
        style="width: fit-content;"
        :disabled="!senderValue"
        @click="$refs.senderRef.submit()"
      >
        Submit using component instance
      </el-button>
      <el-button
        type="primary"
        style="width: fit-content;"
        @click="$refs.senderRef.cancel()"
      >
        Cancel using component instance
      </el-button>
    </div>
    <el-x-sender
      ref="senderRef"
      v-model="senderValue"
      :submit-btn-disabled="submitBtnDisabled"
      :loading="senderLoading"
      clearable
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        senderRef: null,
        timeValue: null,
        senderValue: '',
        senderLoading: false,
        submitBtnDisabled: false,
      };
    },
    methods: {
      handleSubmit(value) {
        this.$message.info('Sending...');
        this.senderLoading = true;
        this.timeValue = setTimeout(() => {
          console.log('submit-> value：', value);
          console.log('submit-> senderValue', this.senderValue);
          this.senderLoading = false;
          this.$message.success('Send successful');
        }, 3500);
      },
      handleCancel() {
        this.senderLoading = false;
        if (this.timeValue) {
          clearTimeout(this.timeValue);
        }
        this.timeValue = null;
        this.$message.info('Send cancelled');
      },
    },
  };
</script>
```

:::

### Different Layout Variants

Configure different layout styles through the `variant` property.

:::demo

```html
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <el-x-sender
        v-model="message1"
        placeholder="Default layout"
        variant="default"
        @submit="handleSubmit"
      />
    </div>

    <el-x-sender
      v-model="message2"
      placeholder="Vertical layout"
      variant="updown"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message1: '',
        message2: '',
      };
    },
    methods: {
      handleSubmit(value) {
        this.$message.success(`发送消息: ${value}`);
      },
    },
  };
</script>
```

:::

### Speech Recognition

Built-in speech recognition functionality can be enabled through the `allowSpeech` property. It uses the browser's native speech recognition API. When using in Google Chrome, it requires a secure environment to work properly.

::: tip Note
If you don't want to use the built-in speech recognition functionality, you can listen to recording status through the `@recording-change` event and implement your own speech recognition.

You can also call through the component ref instance:

- `senderRef.value.startRecognition()` Trigger start recording
- `senderRef.value.stopRecognition()` Trigger stop recording

:::

:::demo

```html
<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <span>Built-in speech recognition:</span>
    <el-x-sender
      v-model="message"
      allow-speech
      @submit="handleSubmit"
      @recording-change="handleRecordingChange"
    />

    <span>Custom speech recognition:</span>
    <div style="display: flex;">
      <el-button
        type="primary"
        style="width: fit-content;"
        @click="$refs.senderRef.startRecognition()"
      >
        Start recording using component instance
      </el-button>
      <el-button
        type="primary"
        style="width: fit-content;"
        @click="$refs.senderRef.stopRecognition()"
      >
        Stop recording using component instance
      </el-button>
    </div>
    <el-x-sender
      ref="senderRef"
      v-model="message"
      allow-speech
      @recording-change="handleRecordingChange"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: '',
      };
    },
    methods: {
      handleSubmit(value) {
        this.$message.success(`Send message: ${value}`);
        this.message = '';
      },
      handleRecordingChange(isRecording) {
        this.$message[isRecording ? 'info' : 'success'](
          isRecording ? 'Speech recognition started' : 'Speech recognition ended',
        );
      },
    },
  };
</script>
```

:::

### Trigger Character Popup

Configure trigger characters through `triggerStrings`. When these characters are entered, a popup will be displayed.

:::demo

```html
<template>
  <div>
    <el-x-sender
      v-model="message"
      placeholder="Enter @ or # to trigger popup"
      :trigger-strings="['@', '#']"
      :triggerPopoverOffset="0"
      :trigger-popover-visible.sync="showTriggerPopover"
      @submit="handleSubmit"
      @trigger="handleTrigger"
    >
      <template #trigger-popover="{ triggerString }">
        <div style="padding: 10px;">
          <p>Current trigger character: {{ triggerString }}</p>
          <el-button
            type="text"
            @click="insertText('用户名')"
          >
            Insert username
          </el-button>
        </div>
      </template>
    </el-x-sender>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: '',
        showTriggerPopover: false,
      };
    },
    methods: {
      handleSubmit(value) {
        this.$message.success(`Send message: ${value}`);
        this.message = '';
      },
      handleTrigger({ triggerString, isOpen }) {
        this.$message.info(`${triggerString} character ${isOpen ? 'triggered' : 'closed'} popup`);
      },
      insertText(text) {
        this.message += text;
        this.showTriggerPopover = false;
      },
    },
  };
</script>
```

:::

### Custom Action Buttons

Customize action buttons through the `action-list` slot.

:::demo

```html
<template>
  <div>
    <el-x-sender
      v-model="message"
      placeholder="Custom action buttons..."
      @submit="handleSubmit"
    >
      <template #action-list>
        <div class="custom-actions">
          <el-button
            icon="el-icon-picture"
            size="small"
            circle
            @click.stop="handleAttach"
          />
          <el-button
            circle
            size="small"
            icon="el-icon-video-camera"
            @click.stop="handleVideo"
          />
          <el-button
            circle
            size="small"
            type="primary"
            :disabled="!message"
            icon="el-icon-position"
          ></el-button>
        </div>
      </template>
    </el-x-sender>
    <br />
    <el-x-sender
      v-model="message"
      placeholder="Custom action buttons..."
      @submit="handleSubmit"
    >
      <template #action-list>
        <div class="custom-actions">
          <el-button
            icon="el-icon-delete"
            size="small"
            type="danger"
            circle
          />
          <el-button
            circle
            type="warning"
            size="small"
            icon="el-icon-loading"
          />
        </div>
      </template>
    </el-x-sender>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: '',
      };
    },
    methods: {
      handleSubmit(value) {
        this.$message.success(`Send message: ${value}`);
        this.message = '';
      },
      handleAttach() {
        this.$message.info('Clicked attachment button');
      },
      handleVideo() {
        this.$message.info('Clicked video button');
      },
    },
  };
</script>

<style>
  .custom-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }
</style>
```

:::

### Custom Header and Footer

:::tip Note
To display the header, you need to manually call the component's `openHeader` method when mounting
:::

Customize header and footer content through the `header` and `footer` slots.

:::demo

```html
<template>
  <div>
    <div style="text-align:right;margin-bottom:10px">
      <el-button
        size="small"
        v-if="!showHeader"
        type="primary"
        @click="toggleHeader"
      >
        {{ showHeader ? 'Close Header' : 'Show Header' }}
      </el-button>
    </div>

    <el-x-sender
      ref="customSender"
      v-model="message"
      placeholder="Input with custom header and footer..."
      @submit="handleSubmit"
    >
      <template #prefix>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <el-button
            round
            plain
            size="small"
          >
            <i class="el-icon-paperclip"></i>
          </el-button>
        </div>
      </template>
      <template #header>
        <div class="header-self-wrap">
          <div class="header-self-title">
            <div class="header-left">💯 Welcome to Element X</div>
            <div class="header-right">
              <el-button
                @click.stop="toggleHeader"
                icon="el-icon-circle-close"
              >
                <span>Close Header</span>
              </el-button>
            </div>
          </div>
          <div class="header-self-content">🦜 Custom header content</div>
        </div>
      </template>
      <template #footer>
        <div class="custom-footer">
          <span>Character count: {{ message.length }}</span>
          <el-button
            type="text"
            size="mini"
          >
            Add Emoji
          </el-button>
        </div>
      </template>
    </el-x-sender>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: '',
        showHeader: true,
      };
    },
    mounted() {
      this.$refs.customSender.openHeader();
    },
    methods: {
      handleSubmit(value) {
        this.$message.success(`Send message: ${value}`);
        this.message = '';
      },
      // 插槽用法
      toggleHeader() {
        if (this.showHeader) {
          this.$refs.customSender.closeHeader();
        } else {
          this.$refs.customSender.openHeader();
        }
        this.showHeader = !this.showHeader;
      },
    },
  };
</script>

<style>
  .header-self-wrap {
    display: flex;
    flex-direction: column;
    padding: 16px;
    height: 200px;
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
    font-size: 20px;
    color: #626aef;
    font-weight: 600;
  }

  .custom-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    font-size: 12px;
    color: #909399;
    border-top: 1px solid #ebeef5;
  }
</style>
```

:::

### Custom Input Styles

Customize input styles conveniently through `input-style` prop

:::demo

```html
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <el-x-sender
      v-model="senderValue"
      variant="updown"
      :input-style="{ backgroundColor: 'rgb(243 244 246)', color: '#626aef', fontSize: '24px', fontWeight: 700 }"
      style="background: rgb(243 244 246); border-radius: 8px;"
    />

    <el-x-sender
      v-model="senderValue"
      variant="updown"
      :input-style="{ backgroundColor: 'transparent', color: '#F0F2F5', fontSize: '24px', fontWeight: 700 }"
      style="background-image: linear-gradient(to left, #434343 0%, black 100%); border-radius: 8px;"
    />

    <el-x-sender
      v-model="senderValue"
      :input-style="{ backgroundColor: 'transparent', color: '#FF5454', fontSize: '20px', fontWeight: 700 }"
      style="background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%); border-radius: 8px;"
    />

    <el-x-sender
      v-model="senderValue"
      variant="updown"
      :input-style="{ backgroundColor: 'transparent', color: '#303133', fontSize: '16px', fontWeight: 700 }"
      style="background-image: linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%); border-radius: 8px;"
    >
      <template #prefix>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <el-button
            round
            plain
            color="#626aef"
            size="small"
          >
            <i class="el-icon-paperclip"></i>
          </el-button>

          <div
            class="thinking"
            :style="[thinkStyle, isSelect ? selectStyle : {}]"
            @click="isSelect = !isSelect"
          >
            <i class="el-icon-plus"></i>
            <span>深度思考</span>
          </div>
        </div>
      </template>

      <template #action-list>
        <div style="display: flex; align-items: center; gap: 8px;">
          <el-button
            round
            class="send-btn"
            style=" background: #626aef;color:#FFF"
            size="small"
          >
            <i class="el-icon-position"></i>
          </el-button>
        </div>
      </template>
    </el-x-sender>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        senderValue: 'This is custom input styling',
        isSelect: false,
        thinkStyle: {
          display: 'flex',
          height: '32px',
          boxSizing: 'border-box',
          alignItems: 'center',
          gap: '4px',
          padding: '2px 12px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'black',
          borderRadius: '15px',
          cursor: 'pointer',
          fontSize: '12px',
          color: 'black',
        },
        selectStyle: {
          color: '#626aef',
          borderColor: '#626aef',
          padding: '3px 12px',
          fontWeight: '700',
        },
      };
    },
  };
</script>

<style scoped></style>
```

:::

## Attributes

| Parameter               | Description                                   | Type    | Default                    |
| ----------------------- | --------------------------------------------- | ------- | -------------------------- |
| value / v-model         | Binding value                                 | String  | ''                         |
| placeholder             | Input placeholder text                        | String  | 'Please enter content'     |
| autoSize                | Input auto-resize configuration               | Object  | { minRows: 1, maxRows: 6 } |
| readOnly                | Whether readonly                              | Boolean | false                      |
| disabled                | Whether disabled                              | Boolean | false                      |
| loading                 | Whether to show loading state                 | Boolean | false                      |
| clearable               | Whether to show clear button                  | Boolean | false                      |
| allowSpeech             | Whether to enable speech input                | Boolean | false                      |
| submitType              | Submit method, 'enter' or 'shiftEnter'        | String  | 'enter'                    |
| headerAnimationTimer    | Header animation duration (ms)                | Number  | 300                        |
| inputWidth              | Input width                                   | String  | '100%'                     |
| variant                 | Layout variant, 'default' or 'updown'         | String  | 'default'                  |
| showUpdown              | Whether to show action bar in updown variant  | Boolean | true                       |
| submitBtnDisabled       | Manually control submit button disabled state | Boolean | -                          |
| inputStyle              | Input style pass-through                      | Object  | {}                         |
| triggerStrings          | Trigger character array for popup             | Array   | []                         |
| triggerPopoverVisible   | Popover display state                         | Boolean | false                      |
| triggerPopoverWidth     | Popover width                                 | String  | 'fit-content'              |
| triggerPopoverLeft      | Popover left offset                           | String  | '0px'                      |
| triggerPopoverOffset    | Popover offset                                | Number  | 8                          |
| triggerPopoverPlacement | Popover placement                             | String  | 'top-start'                |

## Methods

| Method Name       | Description                    | Parameters                | Return Value |
| ----------------- | ------------------------------ | ------------------------- | ------------ |
| blur              | Remove focus                   | -                         | -            |
| focus             | Get focus                      | type: 'all'/'start'/'end' | -            |
| focusToStart      | Focus to text start            | -                         | -            |
| focusToEnd        | Focus to text end              | -                         | -            |
| startRecognition  | Start speech recognition       | -                         | -            |
| stopRecognition   | Stop speech recognition        | -                         | -            |
| submit            | Trigger submit                 | -                         | -            |
| cancel            | Trigger cancel                 | -                         | -            |
| clear             | Clear content                  | -                         | -            |
| openHeader        | Open header                    | -                         | -            |
| closeHeader       | Close header                   | -                         | -            |
| startLoading      | Start loading                  | -                         | -            |
| stopLoading       | Stop loading                   | -                         | -            |
| insertTextAtCaret | Insert text at cursor position | text                      | -            |

## Events

| Event Name                   | Description                                                           | Callback Parameters                                                                                     |
| ---------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| input                        | Triggered when input value changes                                    | (value: string)                                                                                         |
| submit                       | Triggered when submit button is clicked or submit shortcut is pressed | (value: string)                                                                                         |
| cancel                       | Triggered when cancel button is clicked                               | (value: string)                                                                                         |
| recording-change             | Triggered when speech recognition status changes                      | (isRecording: boolean)                                                                                  |
| trigger                      | Triggered when trigger character status changes                       | { oldValue: string, newValue: string, triggerString: string, isOpen: boolean, cursorPosition?: number } |
| update:triggerPopoverVisible | Triggered when popover visibility changes                             | (visible: boolean)                                                                                      |

## Slots

| Slot Name       | Description                     | Scope Parameters                             |
| --------------- | ------------------------------- | -------------------------------------------- |
| header          | Custom header content           | -                                            |
| footer          | Custom footer content           | -                                            |
| prefix          | Input prefix content            | -                                            |
| action-list     | Custom action button list       | -                                            |
| trigger-popover | Trigger character popup content | { triggerString: string, readonly: boolean } |
