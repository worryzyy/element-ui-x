<template>
  <div>
    <el-card class="demo-card">
      <div slot="header">
        <h2>Think 思考组件</h2>
      </div>

      <div class="demo-block">
        <h3>基础用法</h3>
        <el-x-think
          status="start"
          content="开始思考状态示例"
        />
        <el-x-think
          status="thinking"
          content="思考中状态示例"
          class="mt-10"
        />
        <el-x-think
          status="end"
          content="思考完成状态示例"
          class="mt-10"
        />
        <el-x-think
          status="error"
          content="思考错误状态示例"
          class="mt-10"
        />
      </div>

      <div class="demo-block">
        <h3>状态控制</h3>
        <div class="control-row">
          <h4>当前状态：</h4>
          <el-radio-group v-model="currentStatus">
            <el-radio-button label="start">开始</el-radio-button>
            <el-radio-button label="thinking">思考中</el-radio-button>
            <el-radio-button label="end">完成</el-radio-button>
            <el-radio-button label="error">错误</el-radio-button>
          </el-radio-group>
        </div>
        <div class="control-row">
          <el-switch
            v-model="autoCollapseValue"
            active-text="自动折叠"
          />
        </div>
        <div class="control-row">
          <el-switch
            v-model="disabledValue"
            active-text="禁用状态"
          />
        </div>
        <el-x-think
          :status="currentStatus"
          :auto-collapse="autoCollapseValue"
          :disabled="disabledValue"
          content="这是一个状态控制的Think组件示例"
        />
      </div>

      <div class="demo-block">
        <h3>样式定制</h3>
        <div class="control-row">
          <h4>按钮宽度：</h4>
          <el-slider
            style="width: 200px"
            v-model="buttonWidthValue"
            :min="100"
            :max="300"
            :step="10"
          />
        </div>
        <div class="control-row">
          <h4>动画时长：</h4>
          <el-slider
            style="width: 200px"
            v-model="durationValue"
            :min="0.1"
            :max="1"
            :step="0.1"
          />
        </div>
        <div class="control-row">
          <h4>内容区宽度：</h4>
          <el-slider
            style="width: 200px"
            v-model="maxWidthValue"
            :min="200"
            :max="800"
            :step="50"
          />
        </div>
        <div class="control-row">
          <h4>背景颜色：</h4>
          <el-color-picker v-model="backgroundColorValue" />
        </div>
        <div class="control-row">
          <h4>文字颜色：</h4>
          <el-color-picker v-model="colorValue" />
        </div>
        <el-x-think
          :button-width="buttonWidthValue + 'px'"
          :duration="durationValue + 's'"
          :max-width="maxWidthValue + 'px'"
          :background-color="backgroundColorValue"
          :color="colorValue"
          content="这是一个样式定制的Think组件示例"
        />
      </div>

      <div class="demo-block">
        <h3>自定义插槽</h3>
        <el-x-think status="thinking">
          <template #status-icon="{ status }">
            <i
              v-if="status === 'thinking'"
              class="is-loading el-icon-loading"
            ></i>
            <i
              v-if="status === 'start'"
              class="el-icon-opportunity"
            ></i>
            <i
              v-if="status === 'end'"
              class="el-icon-success"
            ></i>
            <i
              v-if="status === 'error'"
              class="el-icon-circle-close"
            ></i>
          </template>
          <template #label="{ status }">
            {{
              status === 'thinking'
                ? '自定义思考中...'
                : status === 'error'
                ? '自定义错误状态'
                : status === 'end'
                ? '自定义完成'
                : '自定义开始'
            }}
          </template>
          <template #content>
            <div style="color: #67c23a">自定义内容区域</div>
          </template>
        </el-x-think>
      </div>
    </el-card>

    <el-card class="demo-card">
      <div slot="header">
        <h2>实际应用场景</h2>
      </div>

      <div class="demo-block">
        <h3>AI思考过程展示</h3>
        <el-x-think
          ref="thinkDemo"
          status="start"
          :auto-collapse="true"
          :content="thinkContent"
        />
        <div class="demo-controls">
          <el-button-group>
            <el-button
              size="small"
              type="primary"
              @click="startThink"
              >开始思考</el-button
            >
            <el-button
              size="small"
              type="success"
              @click="endThink"
              >思考完成</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="errorThink"
              >思考错误</el-button
            >
          </el-button-group>
        </div>
      </div>

      <div class="demo-block">
        <h3>模拟AI思考流程</h3>
        <el-x-think
          ref="simulationThink"
          status="start"
          :auto-collapse="false"
          :content="simulationContent"
        />
        <div class="demo-controls">
          <el-button
            type="primary"
            @click="simulateThinkingProcess"
            >模拟完整思考流程</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'ThinkDemo',
    data() {
      return {
        currentStatus: 'start',
        autoCollapseValue: false,
        disabledValue: false,
        buttonWidthValue: 160,
        durationValue: 0.2,
        maxWidthValue: 500,
        backgroundColorValue: '#fcfcfc',
        colorValue: '#606266',
        thinkContent: '这是一个模拟AI思考过程的示例，点击下方按钮尝试切换状态',
        simulationContent: '思考过程会在此处显示...',
      };
    },
    methods: {
      startThink() {
        this.currentStatus = 'thinking';
        this.$refs.thinkDemo.status = 'thinking';
      },
      endThink() {
        this.currentStatus = 'end';
        this.$refs.thinkDemo.status = 'end';
        this.thinkContent =
          '思考完成了！\n\n这个问题的解决方案是：\n1. 使用Vue2的事件系统\n2. 结合Element UI的组件库\n3. 优化交互体验';
      },
      errorThink() {
        this.currentStatus = 'error';
        this.$refs.thinkDemo.status = 'error';
        this.thinkContent = '思考过程中出现错误';
      },
      simulateThinkingProcess() {
        // 模拟思考过程
        const simulationRef = this.$refs.simulationThink;

        // 开始思考
        simulationRef.status = 'start';
        this.simulationContent = '准备开始思考...';

        // 切换到思考中状态
        setTimeout(() => {
          simulationRef.status = 'thinking';
          this.simulationContent = '正在思考中...\n\n分析用户输入的问题...';

          // 模拟思考过程的内容更新
          setTimeout(() => {
            this.simulationContent += '\n\n检索相关知识库...';

            setTimeout(() => {
              this.simulationContent += '\n\n生成解决方案...';

              // 完成思考
              setTimeout(() => {
                simulationRef.status = 'end';
                this.simulationContent =
                  '思考完成！\n\n基于分析，我们得出以下结论：\n1. 问题的根本原因是配置错误\n2. 需要更新依赖版本\n3. 重新构建项目';
              }, 1500);
            }, 1000);
          }, 1000);
        }, 1000);
      },
    },
  };
</script>

<style lang="scss" scoped>
  h3 {
    font-weight: bold !important;
    font-size: 20px !important;
  }

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

  .demo-controls {
    margin-top: 20px;
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
