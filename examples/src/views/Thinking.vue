<template>
  <div>
    <el-card class="demo-card">
      <div slot="header">
        <h2>Thinking 思考状态</h2>
      </div>

      <div class="demo-block">
        <h3>基础用法</h3>
        <el-x-thinking
          status="start"
          content="开始思考状态示例"
        />
        <el-x-thinking
          status="thinking"
          content="思考中状态示例"
          class="mt-10"
        />
        <el-x-thinking
          status="end"
          content="思考完成状态示例"
          class="mt-10"
        />
        <el-x-thinking
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
        <el-x-thinking
          :status="currentStatus"
          :auto-collapse="autoCollapseValue"
          :disabled="disabledValue"
          content="这是一个状态控制的Thinking组件示例"
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
        <el-x-thinking
          :button-width="buttonWidthValue + 'px'"
          :duration="durationValue + 's'"
          :max-width="maxWidthValue + 'px'"
          :background-color="backgroundColorValue"
          :color="colorValue"
          content="这是一个样式定制的Thinking组件示例"
        />
      </div>

      <div class="demo-block">
        <h3>自定义插槽</h3>
        <el-x-thinking status="thinking">
          <template #status-icon="{ status }">
            <i
              v-if="status === 'thinking'"
              class="is-loading el-icon-center el-icon-loading"
            ></i>
            <i
              v-if="status === 'start'"
              class="el-icon-center el-icon-opportunity"
            ></i>
            <i
              v-if="status === 'end'"
              class="el-icon-center el-icon-success"
            ></i>
            <i
              v-if="status === 'error'"
              class="el-icon-center el-icon-circle-close"
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
        </el-x-thinking>
      </div>
    </el-card>

    <el-card class="demo-card">
      <div slot="header">
        <h2>实际应用场景</h2>
      </div>

      <div class="demo-block">
        <h3>AI思考过程</h3>
        <el-x-thinking
          ref="thinkingDemo"
          status="start"
          :auto-collapse="true"
          content="这是一个模拟AI思考过程的示例"
        />
        <div class="demo-controls">
          <el-button-group>
            <el-button
              size="small"
              type="primary"
              @click="startThinking"
            >
              开始思考
            </el-button>
            <el-button
              size="small"
              type="success"
              @click="endThinking"
            >
              思考完成
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="errorThinking"
            >
              思考错误
            </el-button>
          </el-button-group>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'ThinkingDemo',
    data() {
      return {
        currentStatus: 'start',
        autoCollapseValue: false,
        disabledValue: false,
        buttonWidthValue: 160,
        durationValue: 0.2,
        maxWidthValue: 500,
        backgroundColorValue: '#fcfcfc',
        colorValue: 'var(--el-color-info)',
      };
    },
    methods: {
      startThinking() {
        this.$refs.thinkingDemo.$emit('update:status', 'thinking');
      },
      endThinking() {
        this.$refs.thinkingDemo.$emit('update:status', 'end');
      },
      errorThinking() {
        this.$refs.thinkingDemo.$emit('update:status', 'error');
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
