<template>
  <div class="other-wrap">
    <p>异步加载@成员示例（本示例接口调用的是github的接口，一定时间内对ip有访问次数限制）：</p>
    <ElXEditorSender
      placeholder="请在@之后随便输入点什么吧"
      :async-match-fun="asyncMatchUser"
      :custom-style="{ maxHeight: '240px' }"
    />

    <p style="margin-top: 100px">自定义弹窗示例，完全由用户自己去写弹窗组件</p>
    <p>
      <el-button @click="showSelectDialog('style')">唤起自定义选择弹窗</el-button>
    </p>
    <ElXEditorSender
      ref="editorRef"
      placeholder="这里是自定义弹窗，你可以试着输入@，!，#这些触发符号"
      :custom-style="{ maxHeight: '240px' }"
      :custom-dialog="true"
      :select-list="selectList"
      :user-list="userList"
      :custom-trigger="customTrigger"
      @show-at-dialog="showAtDialog"
      @show-tag-dialog="showTagDialog"
      @show-select-dialog="showSelectDialog"
    />

    <el-dialog
      :visible.sync="dialogSelectVisible"
      title="自定义选择标签弹窗"
      width="500"
    >
      <div
        v-for="option of selectList"
        :key="option.key"
      >
        <div v-if="option.key === viewKey">
          <p
            v-for="tag of option.options"
            :key="tag.id"
            @click="checkSelect(tag)"
          >
            {{ tag.name }}
          </p>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogUserVisible"
      title="自定义人员选择弹窗"
      width="500"
    >
      <p
        v-for="user of userList"
        :key="user.id"
        @click="checkUser(user)"
      >
        {{ user.name }}
      </p>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogCustomVisible"
      title="自定义触发符号选择弹窗"
      width="500"
    >
      <div
        v-for="option of customTrigger"
        :key="option.prefix"
      >
        <div v-if="option.prefix === viewPrefix">
          <p
            v-for="tag of option.tagList"
            :key="tag.id"
            @click="checkTag(tag)"
          >
            {{ tag.name }}
          </p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'CustomDemo',
    data() {
      return {
        loading: false,
        showHeaderFlog: false,
        // 自定义选择标签相关逻辑
        selectList: [
          {
            dialogTitle: '风格选择',
            key: 'style',
            options: [
              {
                id: '1',
                name: '人像摄影',
                preview: 'https://www.jianfv.top/style/style1.webp',
              },
              {
                id: '2',
                name: '电影写真',
                preview: 'https://www.jianfv.top/style/style2.webp',
              },
              {
                id: '3',
                name: '中国风',
                preview: 'https://www.jianfv.top/style/style3.webp',
              },
            ],
          },
        ],
        viewKey: '',
        dialogSelectVisible: false,
        currentSelectElm: null,
        // 自定义@弹窗相关逻辑
        userList: [
          {
            id: '5',
            name: '张三丰',
          },
          {
            id: '1',
            name: '张三',
          },
          {
            id: '2',
            name: '李四',
          },
          {
            id: '3',
            name: '王五',
          },
          {
            id: '4',
            name: '马六',
          },
        ],
        dialogUserVisible: false,
        // 自定义触发符相关逻辑
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
        dialogCustomVisible: false,
        viewPrefix: '',
      };
    },
    methods: {
      async asyncMatchUser(searchVal) {
        console.log(searchVal, '在@之后输入的内容');
        if (!searchVal) {
          return [];
        }
        // 查询github用户
        const res = await fetch(`https://api.github.com/search/users?q=${searchVal}`).then(res =>
          res.json(),
        );
        return (
          (res &&
            res.items &&
            res.items.map(item => {
              return {
                id: item.id,
                name: item.login,
                avatar: item.avatar_url,
              };
            })) ||
          []
        );
      },
      showSelectDialog(key, elm) {
        this.viewKey = key;
        // 有elm值说明内部聊天框唤起
        this.currentSelectElm = elm;
        this.dialogSelectVisible = true;
      },
      checkSelect(tag) {
        // 没有 currentSelectElm 说明是外部调用走插入逻辑
        if (!this.currentSelectElm) {
          if (this.$refs.editorRef) {
            this.$refs.editorRef.setSelectTag(this.viewKey, tag.id);
          }
        } else {
          // 有值走标签更新方法
          if (this.$refs.editorRef) {
            this.$refs.editorRef.updateSelectTag(this.currentSelectElm, tag);
          }
        }
        this.dialogSelectVisible = false;
      },
      showAtDialog() {
        console.log('run in 909');
        this.dialogUserVisible = true;
      },
      checkUser(user) {
        if (this.$refs.editorRef) {
          this.$refs.editorRef.customSetUser(user);
        }
        this.dialogUserVisible = false;
      },
      showTagDialog(prefix) {
        this.viewPrefix = prefix;
        this.dialogCustomVisible = true;
      },
      checkTag(tag) {
        if (this.$refs.editorRef) {
          this.$refs.editorRef.customSetTag(this.viewPrefix, tag);
        }
        this.dialogCustomVisible = false;
      },
    },
  };
</script>

<style scoped lang="scss">
  .other-wrap {
    width: 100%;
    height: 95vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
