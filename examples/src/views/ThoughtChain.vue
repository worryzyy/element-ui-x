<template>
  <div>
    <el-card class="demo-card">
      <div slot="header">
        <h2>ThoughtChain 思维链</h2>
      </div>

      <div class="demo-block">
        <h3>基础用法</h3>
        <el-x-thought-chain
          :thinking-items="basicItems"
          class="mt-10"
        />
      </div>

      <div class="demo-block">
        <h3>状态控制</h3>
        <div class="control-row">
          <el-radio-group v-model="currentStatus">
            <el-radio-button label="loading">加载中</el-radio-button>
            <el-radio-button label="success">成功</el-radio-button>
            <el-radio-button label="error">错误</el-radio-button>
          </el-radio-group>
        </div>
        <el-x-thought-chain
          :thinking-items="statusItems"
          class="mt-10"
        />
      </div>

      <div class="demo-block">
        <h3>可展开内容</h3>
        <div class="control-row">
          <el-switch
            v-model="isDefaultExpand"
            active-text="默认展开"
          />
        </div>
        <el-x-thought-chain
          :thinking-items="expandItems"
          class="mt-10"
        />
      </div>

      <div class="demo-block">
        <h3>时间轴样式:渐变连线</h3>
        <div class="control-row">
          <h4>节点大小：</h4>
          <el-radio-group v-model="dotSize">
            <el-radio-button label="mini">超小</el-radio-button>
            <el-radio-button label="small">小型</el-radio-button>
            <el-radio-button label="medium">中等</el-radio-button>
            <el-radio-button label>超大</el-radio-button>
          </el-radio-group>
        </div>
        <el-x-thought-chain
          :thinking-items="styleItems"
          :dot-size="dotSize"
          :line-gradient="lineGradient"
          class="mt-10"
        />
      </div>

      <div class="demo-block">
        <h3>打字器效果</h3>
        <div class="control-row">
          <el-switch
            v-model="typingEnabled"
            active-text="启用打字效果"
          />
        </div>
        <el-x-thought-chain
          :thinking-items="typingItems"
          class="mt-10"
        />
      </div>

      <div class="demo-block">
        <h3>自定义图标</h3>
        <div class="control-row">
          <el-switch
            v-model="dotIsIcon"
            active-text="使用图标"
          />
        </div>
        <el-x-thought-chain
          :thinking-items="iconItems"
          :dot-is-icon="dotIsIcon"
          class="mt-10"
        />
      </div>

      <div class="demo-block">
        <h3>自定义状态枚举</h3>
        <el-x-thought-chain
          :thinking-items="customStatusItems"
          :status-enum="customStatusEnum"
          class="mt-10"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'ThoughtChainDemo',
    data() {
      return {
        currentStatus: 'loading',
        isDefaultExpand: false,
        dotSize: 'mini',
        lineGradient: true,
        typingEnabled: true,
        basicItems: [
          {
            id: 1,
            title: '第一步',
            status: 'success',
            thinkTitle: '正在思考第一步...',
            thinkContent: '这是第一步的详细思考内容',
          },
          {
            id: 2,
            title: '第二步',
            status: 'success',
            thinkTitle: '正在思考第二步...',
            thinkContent: '这是第二步的详细思考内容',
          },
        ],
        statusItems: [
          {
            id: 1,
            title: '加载状态',
            status: 'loading',
            thinkTitle: '正在加载中...',
            thinkContent: '加载完成后会显示内容',
          },
          {
            id: 2,
            title: '成功状态',
            status: 'success',
            thinkTitle: '思考完成',
            thinkContent: '这是成功的思考内容',
          },
          {
            id: 3,
            title: '错误状态',
            status: 'error',
            thinkTitle: '思考失败',
            thinkContent: '思考过程中出现了错误',
          },
        ],
        expandItems: [
          {
            id: 1,
            title: '可展开内容',
            status: 'success',
            thinkTitle: '点击查看详细内容',
            thinkContent: '这是可展开的详细内容',
            isCanExpand: true,
            isDefaultExpand: false,
          },
        ],
        styleItems: [
          {
            id: 1,
            title: '样式演示1',
            status: 'success',
            thinkTitle: '样式演示1',
            thinkContent: '这是样式演示1的内容',
          },
          {
            id: 2,
            title: '样式演示2',
            status: 'error',
            thinkTitle: '样式演示2',
            thinkContent: '这是样式演示2的内容',
          },
        ],
        iconItems: [
          {
            id: 1,
            title: '图标演示1',
            status: 'success',
            thinkTitle: '使用自定义图标',
            icon: 'el-icon-edit',
            iconSize: 'large',
            iconColor: '#409eff',
            thinkContent: '这里展示了如何使用自定义图标替代默认节点',
          },
          {
            id: 2,
            title: '图标演示2',
            status: 'success',
            icon: 'el-icon-star-off',
            iconColor: '#ff4949',
            iconSize: 'large',
            thinkTitle: '可以设置不同颜色和大小',
            thinkContent: '通过iconColor和iconSize属性可以自定义图标样式',
          },
        ],
        typingItems: [
          {
            id: 1,
            title: '打字效果',
            status: 'success',
            thinkTitle: '这是一个打字器效果演示',
            thinkContent: '这段文字会逐个显示出来，模拟打字效果',
            typing: true,
          },
        ],
        dotIsIcon: false,
        customStatusEnum: {
          loading: {
            value: 'processing',
            type: 'primary',
          },
          error: {
            value: 'failed',
            type: 'danger',
          },
          success: {
            value: 'completed',
            type: 'success',
          },
        },
        customStatusItems: [
          {
            id: 1,
            title: '处理中状态',
            status: 'processing',
            thinkTitle: '正在处理中...',
            thinkContent: '这是处理中的详细内容',
          },
          {
            id: 2,
            title: '已完成状态',
            status: 'completed',
            thinkTitle: '处理完成',
            thinkContent: '这是处理完成的详细内容',
          },
          {
            id: 3,
            title: '失败状态',
            status: 'failed',
            thinkTitle: '处理失败',
            thinkContent: '处理过程中出现了错误',
          },
        ],
      };
    },
    watch: {
      currentStatus(val) {
        this.statusItems[0].status = val;
      },
      isDefaultExpand(val) {
        this.expandItems[0].isDefaultExpand = val;
      },
      typingEnabled(val) {
        this.typingItems[0].typing = val;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .demo-card {
    margin-bottom: 20px;
  }

  .demo-block {
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    margin-bottom: 20px;

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .control-row {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    h4 {
      margin: 0 10px 0 0;
      font-size: 14px;
      font-weight: normal;
      width: 80px;
    }
  }

  .mt-10 {
    margin-top: 10px;
  }
</style>
