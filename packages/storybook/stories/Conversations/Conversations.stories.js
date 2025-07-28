import ElXConversations from '@/components/Conversations';

const basicItems = [
  {
    id: '1',
    label: '最近对话1',
    prefixIcon: 'el-icon-chat-dot-round',
  },
  {
    id: '2',
    label: '最近对话2',
    prefixIcon: 'el-icon-chat-round',
  },
  {
    id: '3',
    label: '最近对话3',
    prefixIcon: 'el-icon-chat-line-round',
  },
  {
    id: '4',
    label: '最近对话4',
    prefixIcon: 'el-icon-chat-dot-round',
  },
  {
    id: '5',
    label: '最近对话5',
    prefixIcon: 'el-icon-chat-round',
    disabled: true,
  },
];

export default {
  title: '组件库/Conversations 会话列表',
  component: ElXConversations,
  parameters: {
    controls: {
      exclude: [
        'change',
        'menu-command',
        'menu',
        'group-title',
        'label',
        'more-filled',
        'load-more',
      ],
    },
  },
  render: args => ({
    components: { ElXConversations },
    props: Object.keys(args),
    template: `
      <el-x-conversations
        v-bind="$props"
        @change="handleChange"
        @menu-command="handleMenuCommand"
      />
    `,
    data() {
      return { args };
    },
    methods: {
      handleChange(item) {
        console.log('选中会话:', item);
      },
      handleMenuCommand(command, item) {
        console.log('菜单命令:', command, item);
      },
    },
  }),
  argTypes: {
    items: {
      control: 'object',
      description: '会话列表数据',
      table: { type: { summary: 'Array' }, defaultValue: { summary: '[]' } },
    },
    active: {
      control: 'text',
      description: '当前激活项',
      table: { type: { summary: 'String/Number/Boolean' }, defaultValue: { summary: "''" } },
    },
    groupable: {
      control: 'boolean',
      description: '是否启用分组',
      table: { type: { summary: 'Boolean/Object' }, defaultValue: { summary: 'false' } },
    },
    showBuiltInMenu: {
      control: 'boolean',
      description: '是否显示内置菜单',
      table: { type: { summary: 'Boolean' }, defaultValue: { summary: 'false' } },
    },
    showTooltip: {
      control: 'boolean',
      description: '是否显示提示框',
      table: { type: { summary: 'Boolean' }, defaultValue: { summary: 'false' } },
    },
    showToTopBtn: {
      control: 'boolean',
      description: '是否显示回到顶部按钮',
      table: { type: { summary: 'Boolean' }, defaultValue: { summary: 'false' } },
    },
    toTopBtnType: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger'],
      description: '回到顶部按钮类型',
      table: { type: { summary: 'String' }, defaultValue: { summary: "'primary'" } },
    },
    loadMoreLoading: {
      control: 'boolean',
      description: '加载更多状态',
      table: { type: { summary: 'Boolean' }, defaultValue: { summary: 'false' } },
    },
    labelKey: {
      control: 'text',
      description: '项目标签字段名',
      table: { type: { summary: 'String' }, defaultValue: { summary: "'label'" } },
    },
    rowKey: {
      control: 'text',
      description: '项目唯一键字段名',
      table: { type: { summary: 'String' }, defaultValue: { summary: "'id'" } },
    },
    ungroupedTitle: {
      control: 'text',
      description: '未分组项标题',
      table: { type: { summary: 'String' }, defaultValue: { summary: "'未分组'" } },
    },
    itemsStyle: {
      control: 'object',
      description: '项目自定义样式',
      table: { type: { summary: 'Object' }, defaultValue: { summary: '{}' } },
    },
    itemsHoverStyle: {
      control: 'object',
      description: '项目悬停样式',
      table: { type: { summary: 'Object' }, defaultValue: { summary: '{}' } },
    },
    itemsActiveStyle: {
      control: 'object',
      description: '项目选中样式',
      table: { type: { summary: 'Object' }, defaultValue: { summary: '{}' } },
    },
    itemsMenuOpenedStyle: {
      control: 'object',
      description: '项目菜单打开时样式',
      table: { type: { summary: 'Object' }, defaultValue: { summary: '{}' } },
    },
    labelMaxWidth: {
      control: 'number',
      description: '标签最大宽度',
      table: { type: { summary: 'Number' }, defaultValue: { summary: 'undefined' } },
    },
    labelHeight: {
      control: 'number',
      description: '标签高度',
      table: { type: { summary: 'Number' }, defaultValue: { summary: '20' } },
    },
    tooltipPlacement: {
      control: { type: 'select' },
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ],
      description: '提示框位置',
      table: { type: { summary: 'String' }, defaultValue: { summary: "'top'" } },
    },
    tooltipOffset: {
      control: 'number',
      description: '提示框偏移量',
      table: { type: { summary: 'Number' }, defaultValue: { summary: '12' } },
    },
    menuPlacement: {
      control: { type: 'select' },
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ],
      description: '菜单位置',
      table: { type: { summary: 'String' }, defaultValue: { summary: "'bottom-start'" } },
    },
    menuShowArrow: {
      control: 'boolean',
      description: '菜单是否显示箭头',
      table: { type: { summary: 'Boolean' }, defaultValue: { summary: 'false' } },
    },
    menuStyle: {
      control: 'object',
      description: '菜单自定义样式',
      table: { type: { summary: 'Object' }, defaultValue: { summary: '{}' } },
    },
    toTopBtnStyle: {
      control: 'object',
      description: '回到顶部按钮自定义样式',
      table: { type: { summary: 'Object' }, defaultValue: { summary: '{}' } },
    },
    styleConfig: {
      control: 'object',
      description: '容器样式配置',
      table: {
        type: { summary: 'Object' },
        defaultValue: {
          summary:
            '{ padding: "10px 0 10px 10px", backgroundColor: "#fff", borderRadius: "8px", width: "280px" }',
        },
      },
    },
  },
  args: {
    items: basicItems,
    active: '1',
    groupable: false,
    showBuiltInMenu: false,
    showTooltip: false,
    showToTopBtn: false,
    toTopBtnType: 'primary',
    loadMoreLoading: false,
    labelKey: 'label',
    rowKey: 'id',
    ungroupedTitle: '未分组',
    itemsStyle: {
      padding: '8px 12px',
      margin: '2px 0',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    itemsHoverStyle: { backgroundColor: '#f5f7fa' },
    itemsActiveStyle: {
      backgroundColor: '#ecf5ff',
      borderLeft: '1px solid #409eff',
      color: '#409eff',
    },
    itemsMenuOpenedStyle: {
      backgroundColor: '#fdf6ec',
      borderLeft: '3px solid #e6a23c',
    },
    labelMaxWidth: undefined,
    labelHeight: 20,
    tooltipPlacement: 'top',
    tooltipOffset: 12,
    menuPlacement: 'bottom-start',
    menuShowArrow: false,
    menuStyle: {},
    toTopBtnStyle: {},
    styleConfig: {
      padding: '10px 0 10px 10px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      width: '280px',
    },
  },
};

export const Basic = { name: '基础用法' };

export const LoadMore = {
  name: '加载更多功能',
  render: args => ({
    components: { ElXConversations },
    props: Object.keys(args),
    template: `
      <div>
        <div style="border: 1px solid #ebeef5; border-radius: 4px; height: 400px; overflow: hidden;">
          <el-x-conversations
            v-bind="$props"
            :items="lazyItems"
            :active="activeLazyItem"
            :load-more="loadMoreItems"
            :load-more-loading="isLoadingMore"
            :show-to-top-btn="true"
            :to-top-btn-type="toTopBtnType"
            :style-config="{ padding: '10px 0 10px 10px', backgroundColor: '#fff', borderRadius: '8px', width: '280px', height: '400px' }"
            @change="handleChange"
          />
        </div>
        <div style="margin-top: 15px;">
          <div style="display: flex; align-items: center;">
            <h4 style="margin: 0 10px 0 0; font-size: 14px; font-weight: normal; width: 80px;">按钮样式：</h4>
            <el-radio-group v-model="toTopBtnType" size="small">
              <el-radio-button label="primary">主要</el-radio-button>
              <el-radio-button label="success">成功</el-radio-button>
              <el-radio-button label="warning">警告</el-radio-button>
              <el-radio-button label="danger">危险</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        lazyItems: [],
        activeLazyItem: '',
        isLoadingMore: false,
        currentLazyPage: 0,
        toTopBtnType: 'primary',
      };
    },
    created() {
      this.loadMoreItems();
    },
    methods: {
      loadMoreItems() {
        if (this.isLoadingMore) return;
        console.log(`触底加载第${this.currentLazyPage + 1}页数据`);
        this.isLoadingMore = true;

        setTimeout(() => {
          const newPage = this.currentLazyPage + 1;
          const newItems = Array(10)
            .fill(0)
            .map((_, index) => ({
              id: `lazy${newPage}-${index + 1}`,
              label: `加载项目 ${newPage}-${index + 1}`,
              prefixIcon: 'el-icon-time',
            }));

          this.lazyItems = [...this.lazyItems, ...newItems];
          this.currentLazyPage = newPage;
          this.isLoadingMore = false;

          console.log(
            `第${newPage}页加载完成，本次加载${newItems.length}条，总计${this.lazyItems.length}条`,
          );

          if (newPage === 1 && newItems.length > 0) {
            this.activeLazyItem = newItems[0].id;
          }
        }, 2000);
      },
      handleChange(item) {
        this.activeLazyItem = item.uniqueKey;
        console.log('选中懒加载会话:', item);
      },
    },
  }),
};
