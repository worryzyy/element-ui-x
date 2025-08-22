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
    <transition name="slide">
      <div
        v-if="$slots.footer"
        class="el-editor-sender-footer"
      >
        <slot name="footer" />
      </div>
    </transition>
  </div>
</template>

<script>
  import ClearButton from './components/ClearButton.vue';
  import LoadingButton from './components/LoadingButton.vue';
  import SendButton from './components/SendButton.vue';
  import ChatArea from 'chatarea';
  import 'chatarea/lib/ChatArea.css';

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
    emits: ['submit', 'change', 'cancel', 'showAtDialog', 'showSelectDialog', 'showTagDialog'],
    data() {
      return {
        chat: null,
        opNode: null,
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
    watch: {
      disabled(val) {
        val ? this.chat?.disabled() : this.chat?.enable();
      },
      placeholder(val) {
        this.chat?.updateConfig({ placeholder: val });
      },
      maxLength(val) {
        this.chat?.updateConfig({ maxLength: val });
      },
      submitType(val) {
        this.chat?.updateConfig({
          sendKeyFun:
            val === 'enter'
              ? event => !event.shiftKey && event.key === 'Enter'
              : event => event.shiftKey && event.key === 'Enter',
          wrapKeyFun:
            val === 'shiftEnter'
              ? event => !event.shiftKey && event.key === 'Enter'
              : event => event.shiftKey && event.key === 'Enter',
        });
      },
      userList: {
        handler(val) {
          this.chat?.updateConfig({ userList: JSON.parse(JSON.stringify(val)) });
        },
        deep: true,
      },
      selectList: {
        handler(val) {
          this.chat?.updateConfig({ selectList: val });
        },
        deep: true,
      },
      customTrigger: {
        handler(val) {
          this.chat?.updateConfig({ customTrigger: val });
        },
        deep: true,
      },
    },
    mounted() {
      this.createChat();
    },
    beforeDestroy() {
      if (this.chat) {
        this.chat.dispose();
        this.chat = null;
        this.opNode = null;
        window.removeEventListener('keydown', this.keydownESC);
      }
    },
    methods: {
      // 创建输入框
      createChat() {
        this.chat = new ChatArea({
          elm: this.$refs.container,
          ...this.$props,
          userList: JSON.parse(JSON.stringify(this.userList)),
          needDialog: !this.customDialog && this.device === 'pc',
          copyType: ['text'],
          asyncMatch: Boolean(this.asyncMatchFun),
          needDebounce: true,
          needCallSpace: false,
          sendKeyFun:
            this.submitType === 'enter'
              ? event => !event.shiftKey && event.key === 'Enter'
              : event => event.shiftKey && event.key === 'Enter',
          wrapKeyFun:
            this.submitType === 'shiftEnter'
              ? event => !event.shiftKey && event.key === 'Enter'
              : event => event.shiftKey && event.key === 'Enter',
        });
        this.opNode = this.chat.createOperateNode();
        // 订阅发送事件
        this.chat.addEventListener('enterSend', this.onSubmit);
        // 对输入框进行操作事件
        this.chat.addEventListener('operate', () => {
          this.chatState.isEmpty = this.chat.isEmpty(true);
          this.chatState.textLength = this.chat.textLength;
          this.$emit('change');
        });
        // 失去焦点记录最后一次光标Node节点
        this.chat.richText.addEventListener(
          'blur',
          () => {
            const sel = getSelection();
            this.chatState.lastFocusNode = sel.focusNode;
            this.chatState.lastOffset = sel.focusOffset;
          },
          true,
        );
        // 订阅标签选择事件
        this.chat.addEventListener('selectCheck', () => {
          if (this.chatState.wrapCallSelectDialog && this.chatState.beforeText) {
            this.chat.insertText(this.chatState.beforeText);
            this.chatState.beforeText = '';
          }
        });
        this.chat.addEventListener('afterSelectCheck', () => {
          if (this.chatState.wrapCallSelectDialog && this.chatState.afterText) {
            this.chat.insertText(this.chatState.afterText);
            this.chatState.afterText = '';
            this.chatState.wrapCallSelectDialog = false;
          }
        });
        // 接管异步匹配
        if (this.asyncMatchFun) {
          this.chat.addEventListener('atMatch', this.asyncMatchFun);
        }
        // 检测多种弹窗唤起事件
        this.chat.addEventListener('showAtDialog', () => {
          this.$emit('showAtDialog');
        });
        this.chat.addEventListener('showSelectDialog', (key, elm) => {
          this.$emit('showSelectDialog', key, elm);
        });
        this.chat.addEventListener('showTagDialog', prefix => {
          this.$emit('showTagDialog', prefix);
        });
        // 禁用编辑器
        if (this.disabled) {
          this.chat.disabled();
        }
        // 绑定ESC按键关闭提示标签
        window.addEventListener('keydown', this.keydownESC);
      },
      // 获取输入框当前内容
      getCurrentValue() {
        const text = this.chat.getText();
        const html = this.chat.getHtml();
        const inputTags = this.chat.getInputTagList();
        const userTags = this.userList.length > 0 ? this.chat.getCallUserTagList() : undefined;
        const selectTags = this.selectList.length > 0 ? this.chat.getSelectTagList() : undefined;
        const customTags = this.customTrigger.length > 0 ? this.chat.getCustomTagList() : undefined;
        return {
          text,
          html,
          inputTags,
          userTags,
          selectTags,
          customTags,
        };
      },
      // 提交发送方法
      onSubmit() {
        // 内容纯空 拦截发送
        if (this.chatState.isEmpty) {
          return;
        }
        this.$emit('submit', this.getCurrentValue());
      },
      // 取消发送方法
      onCancel() {
        this.$emit('cancel');
      },
      // 清空输入框方法
      onClear(txt) {
        this.chat.clear(txt);
        // 将光标移动到末尾
        this.focusToEnd();
      },
      // 点击内容区域聚焦输入框
      onContentMouseDown() {
        requestAnimationFrame(() => {
          const focusElm = this.chatState.lastFocusNode?.parentElement;
          const chatInput = this.chat.chatInput;
          if (focusElm && focusElm.classList.contains('input-write')) {
            chatInput.setInputTagRange(this.chatState.lastFocusNode, this.chatState.lastOffset);
          } else {
            chatInput.restCursorPos(chatInput.vnode, chatInput.cursorIndex);
          }
        });
      },
      // 聚焦到文本最前方
      focusToStart() {
        if (this.chat && this.opNode) {
          this.opNode.setCursorNode(
            this.opNode.getNodeByRank(this.opNode.getRank(0) + this.opNode.getRank(0)),
            0,
          );
        }
      },
      // 聚焦到文本最后方
      focusToEnd() {
        if (this.chat && this.opNode) {
          this.opNode.setCursorNode(
            this.opNode.getNodeByRank(this.opNode.getRank(-1) + this.opNode.getRank(-1)),
          );
        }
      },
      // 失去焦点
      onBlur() {
        if (this.chat) {
          const selection = getSelection();
          selection.removeAllRanges();
          this.chat.richText.blur();
        }
      },
      // 内容全选
      selectAll() {
        if (this.chat && this.opNode) {
          const firstNode = this.opNode.getNodeByRank(
            this.opNode.getRank(0) + this.opNode.getRank(0),
          );
          const lastNode = this.opNode.getNodeByRank(
            this.opNode.getRank(-1) + this.opNode.getRank(-1),
          );
          this.opNode.setSelectNodes(firstNode, lastNode);
        }
      },
      // 插入一个选择标签
      setSelectTag(key, tagId) {
        this.chatState.wrapCallSelectDialog = false;
        const tag = this.selectList
          ?.find(option => option.key === key)
          ?.options.find(tag => tag.id === tagId);
        if (tag) {
          this.chat.setSelectTag(tag, key);
        }
      },
      // 插入一个输入标签
      setInputTag(key, placeholder, defaultValue) {
        this.chat.setInputTag(key, placeholder, defaultValue);
      },
      // 插入一个@提及标签
      setUserTag(userId) {
        const user = this.userList?.find(user => user.id === userId);
        if (user) {
          this.chat.setUserTag(user);
        }
      },
      // 插入一个自定义触发符标签
      setCustomTag(prefix, id) {
        const custom = this.customTrigger
          ?.find(option => option.prefix === prefix)
          ?.tagList.find(tag => tag.id === id);
        if (custom) {
          this.chat.setCustomTag(custom, prefix);
        }
      },
      // 混合式插入
      setMixTags(tags) {
        // 整合ChatNode
        const chatNodes = tags.map((row, index) => {
          return {
            type: 'gridBox',
            rank: this.opNode.getRank(index),
            children: row.map(cRow => {
              return {
                type: cRow.type,
                text: cRow.value,
                html: cRow.value,
                dataset: {
                  id: cRow.value,
                  name: this.getNameByTypeId(cRow),
                  prefix: cRow.key,
                  key: cRow.key,
                  placeholder: cRow.placeholder,
                  value: cRow.value,
                },
              };
            }),
          };
        });
        this.opNode.coverNodes(chatNodes);
      },
      // 根据id和类型捕获目标name
      getNameByTypeId(mixTag) {
        const { type, value, key } = mixTag;
        switch (type) {
          case 'userTag':
            return this.userList?.find(user => user.id === value)?.name || '';
          case 'selectTag':
            return (
              this.selectList
                ?.find(row => row.key === key)
                ?.options.find(select => select.id === value)?.name || ''
            );
          case 'customTag':
            return (
              this.customTrigger
                ?.find(row => row.prefix === key)
                ?.tagList.find(custom => custom.id === value)?.name || ''
            );
          default:
            return '';
        }
      },
      // 在当前光标处插入html片段
      setHtml(html) {
        // 注* 插入的html标签必须是 行内 或 行内块元素，如果需要块级元素标签 请自行插入行内元素然后修改其css属性为块级元素
        this.chat.insertHtml(html);
      },
      // 在当前光标处插入text内容
      setText(txt) {
        this.chat.insertText(txt);
      },
      // 外部调用唤起标签选择弹窗
      openSelectDialog(option) {
        this.chatState.beforeText = option.beforeText || '';
        this.chatState.afterText = option.afterText || '';
        this.chatState.wrapCallSelectDialog = true;
        this.chat.showPCSelectDialog(option.key, option.elm);
      },
      // 打开前置提示标签
      openTipTag(options) {
        this.chat.openTipTag({
          ...options,
          codeLabel: 'ESC',
        });
      },
      // 关闭前置提示标签
      closeTipTag() {
        this.chat.closeTipTag();
      },
      // 绑定ESC按键关闭提示标签
      keydownESC(event) {
        if (event.key === 'Escape') {
          this.closeTipTag();
        }
      },
      // 用户自定义弹窗写入@提及标签
      customSetUser(user) {
        // 该方法并未写入ts 因为是一个私有api没暴露给用户 其区别 setUserTag 相比会去向前截取掉触发符
        this.chat.onceSetTag(user);
      },
      // 用户自定义弹窗写入自定义触发符号标签
      customSetTag(prefix, tag) {
        this.chat.onceSetCustomTag(tag, prefix);
      },
      // 用户自定义弹窗更新选择标签
      updateSelectTag(elm, tag) {
        const rank = this.opNode.getRankByElm(elm.parentElement);
        if (!rank) {
          return;
        }
        const chatNode = this.opNode.getNodeByRank(rank);
        if (!chatNode) {
          return;
        }
        const dataset = chatNode.dataset;
        dataset.id = tag.id;
        dataset.name = tag.name;
        this.opNode.updateNode(chatNode);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../styles/EditorSender.scss';
</style>
