<template>
  <div
    class="el-editor-sender-wrap"
    :style="{ '--el-editor-sender-header-duration': `${headerAnimationTimer}ms` }"
  >
    <!-- 头部容器 -->
    <transition name="slide">
      <div
        v-if="$slots.header"
        class="el-editor-sender-header"
      >
        <div class="el-editor-sender-header-container">
          <slot name="header" />
        </div>
      </div>
    </transition>
    <!-- 内容容器 -->
    <div
      class="el-editor-sender-content"
      :class="{ 'content-variant-updown': variant === 'updown' }"
      @mousedown="onContentMouseDown"
    >
      <!-- Prefix 前缀 -->
      <div
        v-if="$slots.prefix && variant === 'default'"
        class="el-editor-sender-prefix"
      >
        <slot name="prefix" />
      </div>
      <!-- 输入区域 -->
      <div
        class="el-editor-sender-chat-room"
        @mousedown.stop="() => {}"
      >
        <!-- 输入框载体 这里多嵌套一层是为了存放渲染后的弹窗元素 -->
        <div
          ref="container"
          :style="{ ...customStyle }"
          class="el-editor-sender-chat"
        />
      </div>
      <!-- 默认操作列表 -->
      <div
        v-if="variant === 'default'"
        class="el-editor-sender-action-list"
      >
        <slot name="action-list">
          <div class="el-editor-sender-action-list-presets">
            <SendButton
              v-if="!loading"
              :disabled="chatState.isEmpty || disabled"
              @submit="onSubmit"
            />

            <LoadingButton
              v-if="loading"
              @cancel="onCancel"
            />

            <ClearButton
              v-if="clearable"
              :disabled="chatState.isEmpty || disabled"
              @clear="onClear"
            />
          </div>
        </slot>
      </div>
      <!-- 变体操作列表 -->
      <div
        v-else-if="variant === 'updown'"
        class="el-editor-sender-updown-action-list"
      >
        <!-- 变体 updown： Prefix 前缀 -->
        <div
          v-if="$slots.prefix"
          class="el-editor-sender-prefix"
        >
          <slot name="prefix" />
        </div>

        <!-- 变体 updown：操作列表 -->
        <div class="el-editor-sender-action-list">
          <slot name="action-list">
            <div class="el-editor-sender-action-list-presets">
              <SendButton
                v-if="!loading"
                :disabled="chatState.isEmpty || disabled"
                @submit="onSubmit"
              />

              <LoadingButton
                v-if="loading"
                @cancel="onCancel"
              />

              <ClearButton
                v-if="clearable"
                :disabled="chatState.isEmpty || disabled"
                @clear="onClear"
              />
            </div>
          </slot>
        </div>
      </div>
    </div>
    <!-- 底部容器 -->
    <Transition name="slide">
      <div
        v-if="$slots.footer"
        class="el-editor-sender-footer"
      >
        <slot name="footer" />
      </div>
    </Transition>
  </div>
</template>

<script>
  import ClearButton from './components/ClearButton.vue';
  import LoadingButton from './components/LoadingButton.vue';
  import SendButton from './components/SendButton.vue';
  export default {
    name: 'ElXEditorSender',
    components: {
      ClearButton,
      LoadingButton,
      SendButton,
    },
    props: {
      // 输入框提示占位语
      placeholder: {
        type: String,
        default: '请输入内容',
      },
      // 使用编辑器设备类型 pc内置了很多丰富的弹出选择功能，如果用户传入了h5，弹出交互需要参考自定义弹出去支持
      device: {
        type: String,
        default: 'pc', // pc|h5
      },
      // 是否在聊天框生成后自动聚焦
      autoFocus: {
        type: Boolean,
        default: false,
      },
      // 输入框的变体类型
      variant: {
        type: String,
        default: 'default', // default|updown
      },
      // 配置标签下拉选择的选项
      selectList: {
        type: Array,
        default: () => [],
      },
      // @研讨群成员列表
      userList: {
        type: Array,
        default: () => [],
      },
      // 扩展自定义弹窗列表
      customTrigger: {
        type: Array,
        default: () => [],
      },
      // 限制输入框最大字数 *注 该配置项性能开销较大 非必要情况请别设置（像豆包和文心一言都不对这块做限制，不应因小失大）
      maxLength: {
        type: Number,
        default: undefined,
      },
      // 控制换行与提交模式
      submitType: {
        type: String,
        default: 'enter', // enter|shiftEnter
      },
      // 修改输入样式
      customStyle: {
        type: Object,
        default: () => ({}),
      },
      // 发送按钮加载状态
      loading: {
        type: Boolean,
        default: false,
      },
      // 是否禁用输入框
      disabled: {
        type: Boolean,
        default: false,
      },
      // 是否显示清空按钮
      clearable: {
        type: Boolean,
        default: false,
      },
      // 展开动画事件/ms
      headerAnimationTimer: {
        type: Number,
        default: 300,
      },
      // 异步加载群成员方法
      asyncMatchFun: {
        type: Function,
        default: undefined,
      },
      // 是否需要自定义弹窗 开启后内部弹窗将不会再创建了
      customDialog: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        chatState: {
          isEmpty: true,
          textLength: 0, // 该属性值只会在配置了maxLength情况下才拥有赋值
          lastFocusNode: null,
          lastOffset: 0,
          wrapCallSelectDialog: false, // 记录是否是外部调用了选择弹窗进行插值行为操作
          beforeText: '',
          afterText: '',
        },
      };
    },
    methods: {
      // 提交发送方法
      onSubmit() {},
      // 取消发送方法
      onCancel() {},
      // 清空输入框方法
      onClear() {},
      // 点击内容区域聚焦输入框
      onContentMouseDown() {},
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../styles/EditorSender.scss';
</style>
