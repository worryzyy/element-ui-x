<template>
  <div class="demo-block">
    <h3>加载更多功能</h3>
    <div class="lazy-container">
      <el-x-conversations
        ref="lazyConversations"
        :items="lazyItems"
        :active="activeLazyItem"
        :load-more="loadMoreItems"
        :load-more-loading="isLoadingMore"
        :show-to-top-btn="true"
        :to-top-btn-type="toTopBtnType"
        :to-top-btn-style="toTopBtnStyle"
        @change="handleLazyItemChange"
      />
    </div>
    <div class="demo-description">滚动到底部时自动加载更多项目</div>
    <div class="demo-controls">
      <div class="control-row">
        <h4>按钮样式：</h4>
        <el-radio-group
          v-model="toTopBtnType"
          size="small"
        >
          <el-radio-button label="primary">主要</el-radio-button>
          <el-radio-button label="success">成功</el-radio-button>
          <el-radio-button label="warning">警告</el-radio-button>
          <el-radio-button label="danger">危险</el-radio-button>
        </el-radio-group>
      </div>
      <div class="control-row">
        <h4>自定义样式：</h4>
        <el-form
          :inline="true"
          class="custom-css-form"
        >
          <el-form-item>
            <el-autocomplete
              v-model="cssProperty"
              :fetch-suggestions="queryPropertySearch"
              placeholder="CSS属性"
              size="small"
              style="width: 140px"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-autocomplete
              v-model="cssValue"
              :fetch-suggestions="queryValueSearch"
              placeholder="CSS值"
              size="small"
              style="width: 140px"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              type="primary"
              @click="addCustomCss"
            >
              添加
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div
        v-if="Object.keys(toTopBtnStyle).length > 0"
        class="applied-styles"
      >
        <div class="style-title">已应用样式：</div>
        <el-tag
          v-for="(value, prop) in toTopBtnStyle"
          :key="prop"
          closable
          size="small"
          @close="removeStyle(prop)"
          class="style-tag"
        >
          {{ prop }}: {{ value }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoadMoreDemo',
    data() {
      return {
        lazyItems: [],
        currentLazyPage: 0,
        maxLazyPages: 5,
        isLoadingMore: false,
        activeLazyItem: '',
        toTopBtnType: 'primary',
        toTopBtnStyle: {},
        cssProperty: '',
        cssValue: '',
        cssProperties: [
          'backgroundColor',
          'color',
          'borderRadius',
          'padding',
          'margin',
          'fontSize',
          'fontWeight',
          'boxShadow',
          'border',
          'width',
          'height',
          'top',
          'right',
          'bottom',
          'left',
          'zIndex',
        ],
        cssValues: [],
        loadingCssValues: false,
      };
    },
    created() {
      this.initLazyItems();
    },
    methods: {
      initLazyItems() {
        this.lazyItems = [];
        this.currentLazyPage = 0;
        this.loadMoreItems();
      },
      loadMoreItems() {
        if (this.currentLazyPage >= this.maxLazyPages) {
          return;
        }

        this.isLoadingMore = true;

        // 模拟异步加载
        setTimeout(() => {
          const newPage = this.currentLazyPage + 1;
          // 第一页加载10条，其他页加载5条
          const itemsCount = newPage === 1 ? 10 : 5;
          const newItems = Array(itemsCount)
            .fill(0)
            .map((_, index) => {
              const itemId = `lazy${newPage}-${index + 1}`;
              return {
                id: itemId,
                label: `加载更多项目 ${newPage}-${index + 1}`,
                prefixIcon: 'el-icon-time',
              };
            });

          this.lazyItems = [...this.lazyItems, ...newItems];
          this.currentLazyPage = newPage;
          this.isLoadingMore = false;

          // 如果是第一页，默认选中第一项
          if (newPage === 1 && newItems.length > 0) {
            this.activeLazyItem = newItems[0].id;
          }
        }, 1500);
      },
      handleLazyItemChange(item) {
        this.activeLazyItem = item.uniqueKey;
      },
      addCustomCss() {
        if (!this.cssProperty || !this.cssValue) return;

        // 创建新的对象来触发响应式更新
        this.toTopBtnStyle = {
          ...this.toTopBtnStyle,
          [this.cssProperty]: this.cssValue,
        };

        // 清空输入框
        this.cssProperty = '';
        this.cssValue = '';
      },
      removeStyle(property) {
        const { [property]: removed, ...rest } = this.toTopBtnStyle;
        this.toTopBtnStyle = rest;
      },
      queryPropertySearch(queryString, cb) {
        const results = this.cssProperties
          .filter(prop => prop.toLowerCase().includes(queryString.toLowerCase()))
          .map(prop => ({ value: prop }));
        cb(results);
      },
      queryValueSearch(queryString, cb) {
        this.getCssValueOptions();
        const results = this.cssValues
          .filter(value => value.toLowerCase().includes(queryString.toLowerCase()))
          .map(value => ({ value }));
        cb(results);
      },
      getCssValueOptions() {
        this.loadingCssValues = true;
        setTimeout(() => {
          const valueMap = {
            backgroundColor: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399', 'transparent'],
            color: ['#ffffff', '#000000', '#409eff', '#67c23a', '#e6a23c', '#f56c6c'],
            borderRadius: ['4px', '8px', '50%', '0'],
            padding: ['8px', '12px', '16px', '20px'],
            margin: ['8px', '12px', '16px', '20px'],
            fontSize: ['12px', '14px', '16px', '18px', '20px'],
            fontWeight: ['normal', 'bold', '300', '400', '500', '600', '700'],
            boxShadow: ['0 2px 4px rgba(0,0,0,0.1)', '0 4px 8px rgba(0,0,0,0.2)', 'none'],
            border: ['1px solid #dcdfe6', '2px solid #409eff', 'none'],
            width: ['auto', '40px', '50px', '60px'],
            height: ['auto', '40px', '50px', '60px'],
            top: ['10px', '20px', '30px', '40px'],
            right: ['10px', '20px', '30px', '40px'],
            bottom: ['10px', '20px', '30px', '40px'],
            left: ['10px', '20px', '30px', '40px'],
            zIndex: ['999', '1000', '1001'],
          };
          this.cssValues = valueMap[this.cssProperty] || [];
          this.loadingCssValues = false;
        }, 100);
      },
    },
    watch: {
      cssProperty() {
        this.cssValue = '';
        this.getCssValueOptions();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .demo-block {
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    margin-bottom: 20px;

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
    }

    .lazy-container {
      height: 300px;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 15px;
    }

    .demo-description {
      margin-top: 15px;
      padding: 10px;
      background-color: #f5f7fa;
      border-radius: 4px;
      color: #606266;
      font-size: 13px;
      line-height: 1.5;
    }

    .demo-controls {
      margin-top: 15px;
      padding: 15px;
      background-color: #fafafa;
      border-radius: 4px;

      .control-row {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        gap: 10px;

        &:last-child {
          margin-bottom: 0;
        }

        h4 {
          margin: 0;
          font-size: 14px;
          color: #606266;
          white-space: nowrap;
        }

        .custom-css-form {
          flex: 1;
        }
      }

      .applied-styles {
        margin-top: 10px;

        .style-title {
          font-size: 13px;
          color: #606266;
          margin-bottom: 8px;
        }

        .style-tag {
          margin-right: 8px;
          margin-bottom: 5px;
        }
      }
    }
  }
</style>
