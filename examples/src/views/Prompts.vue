<template>
  <div>
    <el-card class="demo-card">
      <div slot="header">
        <h2>Prompts 提示组件</h2>
      </div>

      <div class="demo-block">
        <h3>基础用法</h3>
        <el-x-prompts
          :items="inspirationalItems"
          :title="'✨ 创意灵感与精彩提示'"
          @on-item-click="handleInspirationalItemClick"
        >
          <template v-slot:icon="{ item }">
            <i
              :class="item.icon"
              :style="item.iconStyle"
            ></i>
          </template>
        </el-x-prompts>
        <div class="demo-controls">
          <el-alert
            v-if="selectedItem"
            :title="`已选择: ${selectedItem.label}`"
            type="success"
            :closable="false"
            show-icon
          >
          </el-alert>
        </div>
      </div>

      <div class="demo-block">
        <h3>垂直排列</h3>
        <el-x-prompts
          :items="verticalItems"
          :vertical="true"
          :title="'🤔 您可能还想问这些：'"
        >
          <template v-slot:icon="{ item }">
            <i
              :class="item.icon"
              :style="item.iconStyle"
            ></i>
          </template>
        </el-x-prompts>
      </div>

      <div class="demo-block">
        <h3>换行布局</h3>
        <el-x-prompts
          :items="wrapItems"
          :wrap="true"
          :title="'✨ 创意灵感与精彩提示'"
        >
          <template v-slot:icon="{ item }">
            <i
              :class="item.icon"
              :style="item.iconStyle"
            ></i>
          </template>
        </el-x-prompts>
      </div>

      <div class="demo-block">
        <h3>禁用状态</h3>
        <el-x-prompts
          :items="relaxItems"
          :title="'☕️ 是时候放松一下了！'"
        >
          <template v-slot:icon="{ item }">
            <i
              :class="item.icon"
              :style="item.iconStyle"
            ></i>
          </template>
        </el-x-prompts>
      </div>
    </el-card>

    <el-card class="demo-card">
      <div slot="header">
        <h2>自定义布局</h2>
      </div>

      <div class="demo-block">
        <h3>自定义宽度</h3>
        <el-x-prompts
          :items="halfWidthItems"
          :wrap="true"
          :title="'✨ 创意灵感与精彩提示'"
          :styles="halfWidthStyles"
        >
          <template v-slot:icon="{ item }">
            <i
              :class="item.icon"
              :style="item.iconStyle"
            ></i>
          </template>
        </el-x-prompts>
      </div>
    </el-card>
    <el-card class="demo-card">
      <div slot="header">
        <h2>嵌套提示</h2>
      </div>

      <div class="demo-block">
        <h3>嵌套列表</h3>
        <el-x-prompts
          :items="antdItems"
          :title="'您需要什么？'"
          :wrap="true"
          :styles="antdStyles"
          @on-item-click="handleAntdItemClick"
        >
          <template v-slot:icon="{ item }">
            <i
              :class="item.icon"
              :style="item.iconStyle"
            ></i>
          </template>
        </el-x-prompts>
      </div>

      <div class="demo-block">
        <h3>自定义样式</h3>
        <el-x-prompts
          :items="basicItems"
          :title="'自定义样式提示列表'"
          :styles="customStyles"
          :class-names="customClassNames"
        />
      </div>
    </el-card>

    <el-card class="demo-card">
      <div slot="header">
        <h2>实际应用场景</h2>
      </div>

      <div class="demo-block">
        <h3>AI提示词</h3>
        <div class="chat-container">
          <div class="message bot">
            <div class="avatar">AI</div>
            <div class="content">
              <p>您想了解什么内容？请从以下选项中选择：</p>
              <el-x-prompts
                :items="aiPromptItems"
                :vertical="true"
                @on-item-click="handleAIPromptClick"
              />
            </div>
          </div>
          <div
            v-if="aiResponse"
            class="message bot"
          >
            <div class="avatar">AI</div>
            <div class="content">
              <p>{{ aiResponse }}</p>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectedItem: null,
        aiResponse: '',
        inspirationalItems: [
          {
            key: '1',
            icon: 'el-icon-sunrise',
            iconStyle: {
              color: '#FFD700',
            },
            label: '点燃你的创造力',
            description: '有什么新项目的灵感吗？',
          },
          {
            key: '2',
            icon: 'el-icon-info',
            iconStyle: {
              color: '#1890FF',
            },
            label: '揭示背景信息',
            description: '帮我了解这个主题的背景。',
          },
          {
            key: '3',
            icon: 'el-icon-position',
            iconStyle: {
              color: '#722ED1',
            },
            label: '效率提升战',
            description: '我如何能工作得更快更好？',
          },
          {
            key: '4',
            icon: 'el-icon-lollipop',
            iconStyle: {
              color: '#52C41A',
            },
            label: '讲个笑话',
            description: '为什么蚂蚁不生病？因为它们有小小的抗体！',
          },
          {
            key: '5',
            icon: 'el-icon-warning',
            iconStyle: {
              color: '#FF4D4F',
            },
            label: '常见问题解决方案',
            description: '如何解决常见问题？分享一些技巧！',
          },
        ],
        basicItems: [
          {
            key: 'prompt1',
            label: '编写邮件',
            description: '帮助您撰写专业的电子邮件',
          },
          {
            key: 'prompt2',
            label: '生成代码',
            description: '根据描述生成代码片段',
          },
          {
            key: 'prompt3',
            label: '内容总结',
            description: '对长文本进行摘要总结',
          },
        ],

        wrapItems: [
          {
            key: '1',
            icon: 'el-icon-sunrise-1',
            iconStyle: {
              color: '#FFD700',
            },
            label: '新项目灵感',
            description: '有什么新项目的灵感吗？',
          },
          {
            key: '2',
            icon: 'el-icon-info',
            iconStyle: {
              color: '#1890FF',
            },
            label: '背景信息',
            description: '帮我了解这个主题的背景。',
          },
          {
            key: '3',
            icon: 'el-icon-warning',
            iconStyle: {
              color: '#FF4D4F',
            },
            label: '解决常见问题',
            description: '如何解决常见问题？分享一些技巧！',
          },
          {
            key: '4',
            icon: 'el-icon-position',
            iconStyle: {
              color: '#722ED1',
            },
            label: '提高效率',
            description: '我如何能工作得更快更好？',
          },
          {
            key: '5',
            icon: 'el-icon-check',
            iconStyle: {
              color: '#52C41A',
            },
            label: '完成任务技巧',
            description: '有哪些完成任务的诀窍？',
          },
          {
            key: '6',
            icon: 'el-icon-coffee-cup',
            iconStyle: {
              color: '#964B00',
            },
            label: '有效休息',
            description: '长时间工作后如何有效休息？',
          },
          {
            key: '7',
            icon: 'el-icon-lollipop',
            iconStyle: {
              color: '#FAAD14',
            },
            label: '保持积极心态',
            description: '保持积极心态的秘诀是什么？',
          },
          {
            key: '8',
            icon: 'el-icon-star-off',
            iconStyle: {
              color: '#FF4D4F',
            },
            label: '压力管理',
            description: '如何在巨大压力下保持冷静？',
          },
        ],
        verticalItems: [
          {
            key: '6',
            icon: 'el-icon-coffee-cup',
            iconStyle: {
              color: '#964B00',
            },
            label: '有效休息',
            description: '长时间工作后如何有效休息？',
            disabled: false,
          },
          {
            key: '7',
            icon: 'el-icon-lollipop',
            iconStyle: {
              color: '#FAAD14',
            },
            label: '保持积极心态',
            description: '保持积极心态的秘诀是什么？',
            disabled: false,
          },
          {
            key: '8',
            icon: 'el-icon-star-off',
            iconStyle: {
              color: '#FF4D4F',
            },
            label: '压力管理',
            description: '如何在巨大压力下保持冷静？',
            disabled: false,
          },
        ],
        relaxItems: [
          {
            key: '5',
            icon: 'el-icon-check',
            iconStyle: {
              color: '#52C41A',
            },
            label: '任务完成秘诀',
            description: '有哪些完成任务的技巧？',
            disabled: true,
          },
          {
            key: '6',
            icon: 'el-icon-coffee-cup',
            iconStyle: {
              color: '#964B00',
            },
            label: '是时候喝杯咖啡了',
            description: '长时间工作后如何有效休息？',
          },
        ],
        disabledItems: [
          {
            key: 'enabled',
            label: '可用选项',
            description: '这个选项可以点击',
          },
          {
            key: 'disabled',
            label: '禁用选项',
            description: '这个选项不可点击',
            disabled: true,
          },
          {
            key: 'enabled2',
            label: '另一个可用选项',
            description: '这个选项可以点击',
          },
        ],

        halfWidthItems: [
          {
            key: '1',
            icon: 'el-icon-sunrise-1',
            iconStyle: {
              color: '#FFD700',
            },
            label: '点燃你的创造力',
            description: '有新项目的灵感吗？',
          },
          {
            key: '2',
            icon: 'el-icon-info',
            iconStyle: {
              color: '#1890FF',
            },
            label: '揭示背景信息',
            description: '帮我了解这个主题的背景。',
          },
          {
            key: '3',
            icon: 'el-icon-position',
            iconStyle: {
              color: '#722ED1',
            },
            label: '效率提升战',
            description: '我怎样才能工作得更快更好？',
          },
          {
            key: '4',
            icon: 'el-icon-ice-cream-round',
            iconStyle: {
              color: '#52C41A',
            },
            label: '讲个笑话',
            description: '为什么蚂蚁不生病？因为它们有小小的蚂蚁抗体！',
          },
          {
            key: '5',
            icon: 'el-icon-warning',
            iconStyle: {
              color: '#FF4D4F',
            },
            label: '常见问题解决方案',
            description: '如何解决常见问题？分享一些技巧！',
          },
        ],
        halfWidthStyles: {
          item: {
            flex: 'none',
            width: 'calc(50% - 6px)',
          },
        },
        customStyles: {
          item: {
            borderColor: '#67C23A',
            borderRadius: '8px',
            backgroundImage: `linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)`,
          },
          title: {
            color: '#409EFF',
            fontWeight: 'bold',
          },
        },
        customClassNames: {
          list: 'custom-list',
          item: 'custom-item',
        },
        aiPromptItems: [
          {
            key: 'about',
            icon: 'el-icon-info',
            label: '关于Prompts组件',
            description: '了解Prompts组件的基本功能和用途',
          },
          {
            key: 'usage',
            icon: 'el-icon-document',
            label: '使用方法',
            description: '如何在项目中使用Prompts组件',
          },
          {
            key: 'examples',
            icon: 'el-icon-menu',
            label: '示例代码',
            description: '查看Prompts组件的代码示例',
          },
        ],
        antdItems: [
          {
            key: '1',
            label: '热门话题',
            icon: 'el-icon-star-off',
            iconStyle: {
              color: '#FF4D4F',
            },
            description: '你对什么感兴趣？',
            children: [
              {
                key: '1-1',
                description: 'X的最新动态是什么？',
              },
              {
                key: '1-2',
                description: '什么是AGI？',
              },
              {
                key: '1-3',
                description: '文档在哪里？',
              },
            ],
          },
          {
            key: '2',
            label: '设计指南',
            icon: 'el-icon-reading',
            iconStyle: {
              color: '#1890FF',
            },
            description: '如何设计一个好产品？',
            children: [
              {
                key: '2-1',
                icon: 'el-icon-star-on',
                description: '了解用户需求',
              },
              {
                key: '2-2',
                icon: 'el-icon-ice-cream-round',
                description: '设定AI角色',
              },
              {
                key: '2-3',
                icon: 'el-icon-chat-dot-round',
                description: '表达情感',
              },
            ],
          },
          {
            key: '3',
            label: '开始创作',
            icon: 'el-icon-position',
            iconStyle: {
              color: '#722ED1',
            },
            description: '如何开始一个新项目？',
            children: [
              {
                key: '3-1',
                label: '快速开始',
                description: '安装Ant Design X',
              },
              {
                key: '3-2',
                label: '在线演练场',
                description: '无需安装，直接在网页上体验',
              },
            ],
          },
        ],
        antdStyles: {
          item: {
            flex: 'none',
            width: 'calc(30% - 6px)',
            backgroundImage: 'linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)',
            border: '0',
          },
          subItem: {
            background: 'rgba(255,255,255,0.45)',
            border: '1px solid #FFF',
          },
        },
      };
    },
    methods: {
      // 处理点击事件
      handleInspirationalItemClick(info) {
        this.selectedItem = info.data;
        this.$message({
          message: `点击了: ${info.data.label}`,
          type: 'success',
        });
      },
      handleItemClick(info) {
        this.selectedItem = info.data;
        this.$message({
          message: `选择了: ${info.data.label}`,
          type: 'success',
        });
      },
      handleAntdItemClick(info) {
        this.$message({
          message: `点击了: ${info.data.description}`,
          type: 'success',
        });
      },
      handleAIPromptClick(info) {
        const responses = {
          about:
            'Prompts组件是一个用于展示提示选项的UI组件，可以用于AI对话中的引导、选项展示等场景。它支持水平和垂直布局、嵌套结构、自定义样式等功能。',
          usage:
            '使用方法非常简单，只需要引入组件并提供items数组即可：\n<el-x-prompts :items="items" @on-item-click="handleClick" />',
          examples:
            '基础示例代码：\n\nitems: [\n  {\n    key: "option1",\n    label: "选项一",\n    description: "这是选项一的描述"\n  },\n  {\n    key: "option2",\n    label: "选项二",\n    description: "这是选项二的描述"\n  }\n]',
        };

        this.aiResponse = responses[info.data.key];
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

  .custom-list {
    background-color: #f8f8f8;
    padding: 10px;
    border-radius: 4px;
  }

  .custom-item {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  }

  .chat-container {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    padding: 15px;
    background-color: #f8f8f8;
    height: 400px;
    overflow-y: auto;
    max-width: 800px;
  }

  .message {
    display: flex;
    margin-bottom: 15px;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #409eff;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .content {
      margin: 0 10px;
      padding: 10px;
      border-radius: 4px;
      max-width: 80%;
    }

    &.user {
      flex-direction: row-reverse;

      .avatar {
        background-color: #67c23a;
      }

      .content {
        background-color: #f0f9eb;
      }
    }

    &.bot {
      .content {
        background-color: #ecf5ff;
        white-space: pre-wrap;
      }
    }
  }
</style>
