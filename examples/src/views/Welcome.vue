<template>
  <div>
    <el-card class="demo-card">
      <div slot="header">
        <h2>Welcome 欢迎页组件</h2>
      </div>

      <div class="demo-block">
        <h3>基础用法</h3>
        <div class="control-row">
          <el-switch
            v-model="showIcon"
            active-text="显示图标"
          />
          <el-switch
            v-model="showDescription"
            active-text="显示描述"
            style="margin-left: 20px"
          />
        </div>
        <el-x-welcome
          :icon="showIcon ? iconUrl : ''"
          :title="title"
          :description="showDescription ? description : ''"
          :extra="'立即开始'"
        />
        <div class="demo-controls">
          <el-input
            v-model="title"
            placeholder="输入标题"
            style="width: 300px; margin-right: 10px"
          ></el-input>
          <el-input
            v-model="description"
            placeholder="输入描述"
            style="width: 300px"
          ></el-input>
        </div>
      </div>

      <div class="demo-block">
        <h3>样式变体</h3>
        <div class="control-row">
          <el-radio-group v-model="currentVariant">
            <el-radio-button label="filled">填充样式</el-radio-button>
            <el-radio-button label="borderless">无边框样式</el-radio-button>
          </el-radio-group>
        </div>
        <el-x-welcome
          :variant="currentVariant"
          :icon="iconUrl"
          :title="`${currentVariant} 风格欢迎组件`"
          :description="`这是 ${currentVariant} 风格的欢迎组件展示`"
        />
      </div>

      <div class="demo-block">
        <h3>布局方向</h3>
        <div class="control-row">
          <el-radio-group v-model="currentDirection">
            <el-radio-button label="ltr">从左到右 (LTR)</el-radio-button>
            <el-radio-button label="rtl">从右到左 (RTL)</el-radio-button>
          </el-radio-group>
        </div>
        <el-x-welcome
          :direction="currentDirection"
          :icon="iconUrl"
          :title="`${currentDirection === 'ltr' ? '从左到右' : '从右到左'}布局欢迎组件`"
          :description="`当前布局方向: ${currentDirection}`"
        />
      </div>

      <div class="demo-block">
        <h3>额外内容</h3>
        <div class="control-row">
          <el-radio-group v-model="extraType">
            <el-radio-button label="text">文本内容</el-radio-button>
            <el-radio-button label="button">按钮元素</el-radio-button>
            <el-radio-button label="custom">自定义内容</el-radio-button>
          </el-radio-group>
        </div>
        <el-x-welcome
          :icon="iconUrl"
          :title="'额外内容示例'"
          :description="'通过 extra 属性或插槽添加附加内容'"
        >
          <template #extra>
            <div v-if="extraType === 'text'">2023-12-31</div>
            <el-button
              v-if="extraType === 'button'"
              type="primary"
              size="small"
            >
              开始使用
            </el-button>
            <div v-if="extraType === 'custom'">
              <el-rate
                v-model="rateValue"
                :colors="rateColors"
              ></el-rate>
              <div style="margin-top: 5px; font-size: 12px; color: #909399">
                {{ rateValue }} 星评价
              </div>
            </div>
          </template>
        </el-x-welcome>
      </div>

      <div class="demo-block">
        <h3>自定义图标</h3>
        <div class="control-row">
          <el-radio-group v-model="iconType">
            <el-radio-button label="image">图片图标</el-radio-button>
            <el-radio-button label="element">Element 图标</el-radio-button>
            <el-radio-button label="custom">自定义图标</el-radio-button>
          </el-radio-group>
          <el-color-picker
            v-if="iconType === 'custom'"
            v-model="iconBgColor"
            style="margin-left: 15px"
          ></el-color-picker>
        </div>
        <el-x-welcome
          :icon="iconType === 'image' ? iconUrl : ''"
          title="自定义图标区域"
          description="根据不同需求自定义图标内容"
        >
          <template
            v-if="iconType !== 'image'"
            #image
          >
            <div
              style="
                width: 64px;
                height: 64px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
              :style="{ background: iconBgColor }"
            >
              <i
                :class="iconType === 'element' ? 'el-icon-star-on' : 'el-icon-s-custom'"
                style="font-size: 32px; color: white"
              ></i>
            </div>
          </template>
        </el-x-welcome>
      </div>

      <div class="demo-block">
        <h3>样式定制</h3>
        <div
          class="control-row"
          style="flex-wrap: wrap"
        >
          <h4>背景色:</h4>
          <el-color-picker
            v-model="styleConfig.background"
            size="small"
          ></el-color-picker>

          <h4 style="margin-left: 15px">边框色:</h4>
          <el-color-picker
            v-model="borderColor"
            size="small"
            @change="updateBorderStyle"
          ></el-color-picker>

          <h4 style="margin-left: 15px">边框圆角:</h4>
          <el-slider
            v-model="borderRadius"
            :min="0"
            :max="20"
            style="width: 120px"
            @change="updateBorderRadius"
          ></el-slider>
        </div>
        <div class="control-row">
          <h4>标题颜色:</h4>
          <el-color-picker
            v-model="styles.title.color"
            size="small"
          ></el-color-picker>

          <h4 style="margin-left: 15px">描述颜色:</h4>
          <el-color-picker
            v-model="styles.description.color"
            size="small"
          ></el-color-picker>
        </div>
        <el-x-welcome
          :icon="iconUrl"
          title="样式定制示例"
          description="通过设置样式属性完全定制组件外观"
          :styleConfig="styleConfig"
          :styles="styles"
        />
      </div>
    </el-card>

    <el-card class="demo-card">
      <div slot="header">
        <h2>实际应用场景</h2>
      </div>

      <div class="demo-block">
        <h3>AI 聊天助手欢迎页</h3>
        <el-x-welcome
          :icon="iconUrl"
          title="欢迎使用 AI 聊天助手"
          description="我是您的智能助手，请随时向我提问！"
        >
          <template #extra>
            <el-button
              type="primary"
              @click="startChat"
            >
              立即开始
            </el-button>
          </template>
        </el-x-welcome>
      </div>

      <div
        class="demo-block"
        v-if="showChatInterface"
      >
        <h3>对话界面</h3>
        <div
          style="border: 1px solid #ebeef5; border-radius: 4px; padding: 20px; margin-bottom: 15px"
        >
          <div
            v-for="(msg, index) in chatMessages"
            :key="index"
            :style="{
              textAlign: msg.placement === 'end' ? 'right' : 'left',
              margin: '10px 0',
            }"
          >
            <div
              :style="{
                display: 'inline-block',
                background: msg.placement === 'end' ? '#409EFF' : '#F2F6FC',
                color: msg.placement === 'end' ? '#fff' : '#333',
                padding: '8px 12px',
                borderRadius: '8px',
                maxWidth: '80%',
                textAlign: 'left',
              }"
            >
              {{ msg.content }}
            </div>
          </div>
        </div>
        <div class="demo-controls">
          <el-input
            v-model="chatInput"
            placeholder="输入消息..."
            @keyup.enter.native="sendChatMessage"
          >
            <el-button
              slot="append"
              icon="el-icon-s-promotion"
              @click="sendChatMessage"
            ></el-button>
          </el-input>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 基础属性
        title: '欢迎使用 Element UI X',
        description: '基于 Element UI 的企业级中后台组件库扩展',
        iconUrl:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp',
        showIcon: true,
        showDescription: true,

        // 样式变体
        currentVariant: 'filled',

        // 布局方向
        currentDirection: 'ltr',

        // 额外内容
        extraType: 'text',
        rateValue: 4,
        rateColors: ['#99A9BF', '#F7BA2A', '#FF9900'],

        // 图标类型
        iconType: 'image',
        iconBgColor: '#409EFF',

        // 样式定制
        styleConfig: {
          background: '#f0f9eb',
          border: '1px solid #e1f3d8',
          borderRadius: '8px',
        },
        borderColor: '#e1f3d8',
        borderRadius: 8,
        styles: {
          title: {
            color: '#67c23a',
            fontSize: '18px',
          },
          description: {
            color: '#85ce61',
          },
          icon: {
            background: '#f0f9eb',
          },
        },

        // 聊天示例
        showChatInterface: false,
        chatMessages: [],
        chatInput: '',

        // 响应式提示内容
        aiResponses: [
          '您好！我是 AI 助手，有什么可以帮您？',
          '这是一个很好的问题！让我来解答...',
          '根据我的分析，您可能需要了解更多关于这方面的信息。',
          '您提到的问题很有趣，我可以从多个角度为您分析。',
          '我理解您的需求，让我为您提供一些建议。',
        ],
      };
    },
    methods: {
      updateBorderStyle() {
        this.styleConfig.border = `1px solid ${this.borderColor}`;
      },
      updateBorderRadius() {
        this.styleConfig.borderRadius = `${this.borderRadius}px`;
      },
      startChat() {
        this.showChatInterface = true;
        this.chatMessages = [
          {
            content: '您好！我是 AI 助手，有什么可以帮您？',
            placement: 'start',
          },
        ];
      },
      sendChatMessage() {
        if (!this.chatInput.trim()) return;

        // 添加用户消息
        this.chatMessages.push({
          content: this.chatInput,
          placement: 'end',
        });

        const userMessage = this.chatInput;
        this.chatInput = '';

        // 模拟 AI 回复
        setTimeout(() => {
          const randomResponse =
            this.aiResponses[Math.floor(Math.random() * this.aiResponses.length)];
          this.chatMessages.push({
            content: `${randomResponse} 您问的是"${userMessage}"`,
            placement: 'start',
          });
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
      width: auto;
    }
  }
</style>
