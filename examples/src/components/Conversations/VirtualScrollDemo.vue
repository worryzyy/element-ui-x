<template>
  <div class="demo-block">
    <h3>虚拟滚动 vs 原生滚动对比测试</h3>
    <div class="virtual-scroll-test virtual-scroll-group-fix">
      <div class="control-section">
        <div class="control-row">
          <h4>滚动模式：</h4>
          <el-radio-group
            v-model="scrollMode"
            size="small"
            @change="handleScrollModeChange"
          >
            <el-radio-button label="native">原生滚动</el-radio-button>
            <el-radio-button label="virtual">虚拟滚动</el-radio-button>
          </el-radio-group>
        </div>
        <div class="control-row">
          <h4>数据量：</h4>
          <el-radio-group
            v-model="dataSize"
            size="small"
            @change="generateTestData"
          >
            <el-radio-button label="small">少量 (50条)</el-radio-button>
            <el-radio-button label="medium">中等 (500条)</el-radio-button>
            <el-radio-button label="large">大量 (2000条)</el-radio-button>
          </el-radio-group>
        </div>
        <div class="control-row">
          <h4>分组模式：</h4>
          <el-switch
            v-model="enableGrouping"
            active-text="启用分组"
            @change="generateTestData"
          />
        </div>
        <div class="control-row">
          <h4>列表高度：</h4>
          <el-slider
            v-model="testListHeight"
            :min="200"
            :max="600"
            :step="50"
            style="width: 200px"
          />
          <span class="height-info">
            {{ testListHeight }}px (约{{
              Math.floor(testListHeight / virtualScrollTestOptions.size)
            }}个完整项目)
          </span>
        </div>
      </div>

      <!-- 主要测试区域：左右布局 -->
      <div class="test-main-area">
        <!-- 左侧：虚拟滚动列表 -->
        <div
          class="test-container"
          :style="{ height: `${testListHeight}px` }"
        >
          <el-x-conversations
            :key="scrollMode + dataSize + enableGrouping"
            :items="testConversationItems"
            :active="activeTestItem"
            :groupable="enableGrouping"
            :virtual-scroll="scrollMode === 'virtual'"
            :virtual-scroll-options="virtualScrollTestOptions"
            :show-to-top-btn="true"
            :style="testContainerStyle"
            @change="handleTestItemChange"
            @update="handleVirtualUpdate"
            @scroll="handleVirtualScroll"
            @resize="handleVirtualResize"
          >
            <template #group-title="{ group }">
              <div class="test-group-title">
                <i :class="getTestGroupIcon(group.title)"></i>
                <span>{{ group.title }}</span>
                <span class="group-count">({{ group.children ? group.children.length : 0 }})</span>
              </div>
            </template>

            <template #label="{ item }">
              <div class="test-item-label">
                <i
                  :class="item.icon || 'el-icon-chat-dot-round'"
                  class="item-icon"
                ></i>
                <div class="item-content">
                  <div class="item-title">{{ item.label }}</div>
                  <div class="item-subtitle">{{ item.subtitle || '测试消息内容' }}</div>
                </div>
                <div class="item-meta">
                  <span class="item-time">{{ item.time || '刚刚' }}</span>
                </div>
              </div>
            </template>
          </el-x-conversations>
        </div>

        <!-- 右侧：虚拟滚动分析面板 -->
        <div
          v-if="scrollMode === 'virtual'"
          class="virtual-analysis-info side-panel"
        >
          <h4>🔍 虚拟滚动分析</h4>
          <div class="analysis-grid">
            <div class="analysis-item">
              <strong>真实可见项目数:</strong>
              <span class="highlight">{{ virtualScrollAnalysis.realVisibleCount }}</span>
              <small>
                基于容器高度{{ testListHeight }}px ÷ 项目高度{{ virtualScrollTestOptions.size }}px =
                {{ (testListHeight / virtualScrollTestOptions.size).toFixed(2) }}
              </small>
            </div>
            <div class="analysis-item">
              <strong>实际渲染范围:</strong>
              <span class="highlight-secondary">{{ virtualScrollAnalysis.renderRange }}</span>
              <small>(包含缓冲区，确保滚动流畅)</small>
            </div>
            <div class="analysis-item">
              <strong>可见索引范围:</strong>
              <span class="highlight-warning">{{ virtualScrollAnalysis.visibleRange }}</span>
              <small>(vue-virtual-scroller报告的可见范围)</small>
            </div>
            <div class="analysis-item">
              <strong>缓冲机制:</strong>
              <span class="highlight-info">{{ virtualScrollAnalysis.bufferInfo }}</span>
              <small>({{ virtualScrollTestOptions.buffer }}px缓冲区避免滚动时白屏)</small>
            </div>
          </div>
          <div class="conclusion">
            💡
            <strong>结论：</strong>
            当前{{ testListHeight }}px高度最多完整显示{{
              Math.floor(testListHeight / virtualScrollTestOptions.size)
            }}个项目！ visibleEndIndex包含了缓冲区，这样滚动更流畅，属于正常现象。
          </div>
        </div>
      </div>

      <div class="test-info">
        <div class="info-item">
          <strong>当前模式：</strong>
          <el-tag :type="scrollMode === 'virtual' ? 'success' : 'primary'">
            {{ scrollMode === 'virtual' ? '虚拟滚动' : '原生滚动' }}
          </el-tag>
        </div>
        <div class="info-item">
          <strong>数据量：</strong>
          <el-tag>{{ testConversationItems.length }} 条</el-tag>
        </div>
        <div class="info-item">
          <strong>分组状态：</strong>
          <el-tag :type="enableGrouping ? 'success' : 'info'">
            {{ enableGrouping ? '已启用' : '已禁用' }}
          </el-tag>
        </div>
        <div class="info-item">
          <strong>性能提示：</strong>
          <span class="performance-tip">
            {{
              scrollMode === 'virtual'
                ? '虚拟滚动适合大量数据，只渲染可见区域，性能更好'
                : '原生滚动适合少量数据，DOM结构完整，功能更全面'
            }}
          </span>
        </div>
      </div>
    </div>
    <div class="demo-description">
      通过切换滚动模式和数据量，可以直观感受虚拟滚动和原生滚动的性能差异。虚拟滚动在大数据量时表现更佳，
      原生滚动在功能完整性方面更有优势。
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VirtualScrollDemo',
    data() {
      return {
        // 测试相关数据
        scrollMode: 'virtual',
        dataSize: 'small',
        enableGrouping: true,
        testListHeight: 400,
        testConversationItems: [],
        activeTestItem: '',
        virtualScrollTestOptions: {
          size: 52,
          buffer: 200,
        },
        testContainerStyle: {
          border: '1px solid #ebeef5',
          borderRadius: '4px',
        },
        // 虚拟滚动分析数据
        virtualScrollAnalysis: {
          realVisibleCount: 0,
          renderRange: '',
          visibleRange: '',
          bufferInfo: '',
        },
      };
    },
    created() {
      this.generateTestData();
    },

    methods: {
      // 测试相关方法
      handleTestItemChange(item) {
        this.activeTestItem = item.uniqueKey;
      },
      handleScrollModeChange() {
        // 强制重新渲染组件
        this.$nextTick(() => {
          this.generateTestData();
        });
      },
      generateTestData() {
        const sizes = {
          small: 50,
          medium: 500,
          large: 2000,
        };

        const count = sizes[this.dataSize] || 50;
        const groups = ['工作', '学习', '娱乐', '生活', '其他'];
        const icons = [
          'el-icon-chat-dot-round',
          'el-icon-chat-round',
          'el-icon-chat-line-round',
          'el-icon-message',
          'el-icon-bell',
        ];

        this.testConversationItems = Array(count)
          .fill(0)
          .map((_, index) => {
            const item = {
              id: `test-${index + 1}`,
              key: `test-${index + 1}`,
              label: `测试对话 ${index + 1}`,
              icon: icons[index % icons.length],
              subtitle: `这是第 ${index + 1} 条测试消息`,
              time: this.getRandomTime(),
            };

            if (this.enableGrouping) {
              // 改为连续分组分布，每个分组包含连续的项目
              const itemsPerGroup = Math.ceil(count / groups.length);
              const groupIndex = Math.floor(index / itemsPerGroup);
              item.group = groups[Math.min(groupIndex, groups.length - 1)];
            }

            return item;
          });

        // 默认选中第一项
        if (this.testConversationItems.length > 0) {
          this.activeTestItem = this.testConversationItems[0].id;
        }
      },
      getRandomTime() {
        const times = [
          '刚刚',
          '1分钟前',
          '5分钟前',
          '10分钟前',
          '30分钟前',
          '1小时前',
          '昨天',
          '2天前',
        ];
        return times[Math.floor(Math.random() * times.length)];
      },
      getTestGroupIcon(group) {
        const iconMap = {
          工作: 'el-icon-office-building',
          学习: 'el-icon-reading',
          娱乐: 'el-icon-video-play',
          生活: 'el-icon-house',
          其他: 'el-icon-more',
        };
        return iconMap[group] || 'el-icon-folder';
      },

      // 虚拟滚动事件处理方法
      handleVirtualUpdate(updateInfo) {
        console.log('虚拟滚动更新事件:', updateInfo);

        // 计算真实的可见区域
        const itemHeight = this.virtualScrollTestOptions.size;
        const containerHeight = this.testListHeight;

        // 更精确的可见项目计算
        const exactVisibleCount = containerHeight / itemHeight;
        const fullVisibleCount = Math.floor(exactVisibleCount); // 完整可见的项目数
        const partialVisibleCount = Math.ceil(exactVisibleCount); // 包含部分可见的项目数
        const bufferItemCount = Math.ceil(this.virtualScrollTestOptions.buffer / itemHeight);

        // 构建可见项目数的显示文本
        let visibleCountText;
        if (fullVisibleCount === partialVisibleCount) {
          // 正好整除的情况
          visibleCountText = `${fullVisibleCount}个`;
        } else {
          // 有部分可见的情况
          visibleCountText = `${fullVisibleCount}-${partialVisibleCount}个 (${fullVisibleCount}个完整)`;
        }

        // 更新分析数据
        this.virtualScrollAnalysis = {
          realVisibleCount: visibleCountText,
          renderRange: `${updateInfo.startIndex}-${updateInfo.endIndex} (共${
            updateInfo.endIndex - updateInfo.startIndex + 1
          }项)`,
          visibleRange: `${updateInfo.visibleStartIndex}-${updateInfo.visibleEndIndex} (共${
            updateInfo.visibleEndIndex - updateInfo.visibleStartIndex + 1
          }项)`,
          bufferInfo: `上下各约${bufferItemCount}项缓冲`,
        };

        console.log('=== 虚拟滚动分析 ===');
        console.log('容器高度:', containerHeight + 'px');
        console.log('项目高度:', itemHeight + 'px');
        console.log('精确可见项目数:', exactVisibleCount.toFixed(2));
        console.log('完整可见项目数:', fullVisibleCount);
        console.log('包含部分可见:', partialVisibleCount);
        console.log('实际渲染范围:', updateInfo.startIndex + '-' + updateInfo.endIndex);
        console.log(
          '可见索引范围:',
          updateInfo.visibleStartIndex + '-' + updateInfo.visibleEndIndex,
        );
        console.log('缓冲区大小:', this.virtualScrollTestOptions.buffer + 'px');
        console.log('==================');

        // 这里可以处理虚拟滚动的更新逻辑
      },

      handleVirtualScroll(event) {
        console.log('虚拟滚动滚动事件:', event);
        // 这里可以处理虚拟滚动的滚动逻辑
      },

      handleVirtualResize(event) {
        console.log('虚拟滚动调整大小事件:', event);
        // 这里可以处理虚拟滚动的调整大小逻辑
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

    .virtual-scroll-test {
      .control-section {
        margin-bottom: 15px;
      }

      .control-row {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        gap: 10px;

        h4 {
          margin: 0;
          font-size: 14px;
          color: #606266;
          white-space: nowrap;
        }

        .height-info {
          margin-left: 10px;
          font-size: 12px;
          color: #909399;
          background-color: #f5f7fa;
          padding: 2px 8px;
          border-radius: 4px;
          white-space: nowrap;
        }
      }

      .test-main-area {
        display: flex;
        gap: 20px;
        margin: 15px 0;
      }

      .test-container {
        flex: 0 0 auto;
        overflow: hidden;
      }

      .test-info {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin-top: 15px;
        padding: 10px;
        background-color: #f5f7fa;
        border-radius: 4px;

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;

          strong {
            color: #303133;
            font-size: 13px;
          }

          .performance-tip {
            color: #606266;
            font-size: 12px;
            max-width: 300px;
          }
        }
      }

      .test-group-title {
        display: flex;
        align-items: center;

        i {
          margin-right: 8px;
          color: #409eff;
        }

        .group-count {
          margin-left: 5px;
          font-size: 12px;
          color: #909399;
        }
      }

      // 深度样式穿透：直接针对任何位置的test-group-title
      ::v-deep .test-group-title {
        display: flex !important;
        align-items: center !important;

        i {
          margin-right: 8px !important;
          color: #409eff !important;
        }

        .group-count {
          margin-left: 5px !important;
          font-size: 12px !important;
          color: #909399 !important;
        }
      }

      .test-item-label {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 10px;

        .item-icon {
          color: #409eff;
          flex-shrink: 0;
        }

        .item-content {
          flex: 1;
          min-width: 0;

          .item-title {
            font-weight: 500;
            color: #303133;
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .item-subtitle {
            font-size: 12px;
            color: #909399;
            margin-top: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .item-meta {
          flex-shrink: 0;

          .item-time {
            font-size: 12px;
            color: #909399;
          }
        }
      }
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

    .virtual-analysis-info {
      margin-top: 20px;
      padding: 15px;
      background: linear-gradient(135deg, #f0f9ff 0%, #f8fafc 100%);
      border: 1px solid #e0f2fe;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      &.side-panel {
        flex: 1;
        margin-top: 0;
        min-width: 300px;
        max-width: 400px;
        height: fit-content;
        position: sticky;
        top: 0;
      }

      h4 {
        margin: 0 0 15px 0;
        color: #0369a1;
        font-size: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .analysis-grid {
        display: grid;
        gap: 12px;
        margin-bottom: 15px;
      }

      &.side-panel .analysis-grid {
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .analysis-item {
        padding: 10px;
        background: white;
        border-radius: 6px;
        border: 1px solid #e2e8f0;

        strong {
          display: block;
          color: #334155;
          margin-bottom: 5px;
          font-size: 14px;
        }

        small {
          display: block;
          color: #64748b;
          font-size: 12px;
          margin-top: 3px;
          line-height: 1.4;
        }
      }

      &.side-panel .analysis-item {
        padding: 8px;

        strong {
          font-size: 13px;
        }

        small {
          font-size: 11px;
        }
      }

      .highlight {
        color: #059669;
        background-color: #ecfdf5;
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: bold;
      }

      .highlight-secondary {
        color: #7c3aed;
        background-color: #f3e8ff;
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: bold;
      }

      .highlight-warning {
        color: #d97706;
        background-color: #fef3c7;
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: bold;
      }

      .highlight-info {
        color: #2563eb;
        background-color: #dbeafe;
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: bold;
      }

      .conclusion {
        padding: 12px;
        background: #f0f9ff;
        border: 1px solid #bae6fd;
        border-radius: 6px;
        color: #0369a1;
        font-size: 14px;
        line-height: 1.5;

        strong {
          color: #0c4a6e;
        }
      }
    }
  }
</style>

<!-- 全局样式：解决虚拟滚动中分组标题样式问题 -->
<style lang="scss">
  .virtual-scroll-group-fix .test-group-title {
    display: flex !important;
    align-items: center !important;

    i {
      margin-right: 8px !important;
      color: #409eff !important;
    }

    .group-count {
      margin-left: 5px !important;
      font-size: 12px !important;
      color: #909399 !important;
    }
  }
</style>
