<template>
  <div>
    <!-- 工作流折叠面板 -->
    <el-collapse
      v-if="item.placement == 'start' && item.workflowCollapse"
      :value="item.workflowCollapse.activeNames"
      @change="updateWorkflowActiveNames"
      class="workflow-collapse"
    >
      <el-collapse-item
        v-for="panel in item.workflowCollapse.panels"
        :key="panel.name"
        :title="panel.title"
        class="workflow-panel"
      >
        <template #title>
          <div class="workflow-title">
            <i
              :class="getWorkflowStatusIcon(panel.status)"
              :style="{ color: getWorkflowStatusColor(panel.status) }"
            ></i>
            <span class="workflow-title-text">{{ panel.title }}</span>
          </div>
        </template>

        <!-- 工作流节点列表 -->
        <div
          class="workflow-nodes"
          v-if="panel.nodes.length > 0"
        >
          <el-collapse
            :value="item.workflowCollapse.nodeActiveNames"
            @change="updateNodeActiveNames"
            class="node-collapse"
          >
            <el-collapse-item
              v-for="node in panel.nodes"
              :key="node.id"
              :name="node.id"
              class="workflow-node"
              :class="`node-${node.status}`"
            >
              <template #title>
                <div class="node-header">
                  <div class="node-info">
                    <i
                      :class="getNodeStatusIcon(node.status)"
                      :style="{ color: getNodeStatusColor(node.status) }"
                    ></i>
                    <span class="node-title">{{ node.title }}</span>
                    <!-- <span class="node-type">{{ node.node_type }}</span> -->
                  </div>
                  <div class="node-meta">
                    <!-- <span
                      v-if="node.duration"
                      class="node-duration"
                    >
                      {{ formatDuration(node.duration) }}
                    </span> -->
                    <span class="node-index">#{{ node.index }}</span>
                  </div>
                </div>
              </template>

              <!-- 节点详细信息内容 -->
              <div class="node-details-content">
                <!-- 节点错误信息 -->
                <div
                  v-if="node.error_message"
                  class="node-error"
                >
                  <i class="el-icon-warning"></i>
                  {{ node.error_message }}
                </div>

                <!-- 节点基本信息 -->
                <div class="node-basic-info">
                  <div class="info-row">
                    <span class="info-label">节点ID:</span>
                    <span class="info-value">{{ node.node_id }}</span>
                  </div>
                  <div
                    class="info-row"
                    v-if="node.started_at"
                  >
                    <span class="info-label">开始时间:</span>
                    <span class="info-value">{{ formatTime(node.started_at) }}</span>
                  </div>
                  <div
                    class="info-row"
                    v-if="node.finished_at"
                  >
                    <span class="info-label">结束时间:</span>
                    <span class="info-value">{{ formatTime(node.finished_at) }}</span>
                  </div>
                </div>

                <!-- 节点输入输出信息 -->
                <div
                  v-if="node.inputs || node.outputs"
                  class="node-io-section"
                >
                  <div
                    v-if="node.inputs"
                    class="node-inputs"
                  >
                    <strong>输入参数:</strong>
                    <pre>{{ JSON.stringify(node.inputs, null, 2) }}</pre>
                  </div>
                  <div
                    v-if="node.outputs"
                    class="node-outputs"
                  >
                    <strong>输出结果:</strong>
                    <pre>{{ JSON.stringify(node.outputs, null, 2) }}</pre>
                  </div>
                </div>

                <!-- 节点额外信息 -->
                <div
                  v-if="node.extras && Object.keys(node.extras).length > 0"
                  class="node-extras"
                >
                  <strong>额外信息:</strong>
                  <pre>{{ JSON.stringify(node.extras, null, 2) }}</pre>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <!-- 工作流为空时的提示 -->
        <div
          v-else
          class="workflow-empty"
        >
          <i class="el-icon-info"></i>
          <span>工作流正在初始化...</span>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- 思考内容组件 -->
    <el-x-thinking
      v-if="item.placement == 'start' && item.reasoning_content"
      :content="item.reasoning_content"
      :status="item.thinkingStatus"
      maxWidth="100%"
      class="thinking-chain-wrap"
      auto-collapse
    >
      <template #status-icon="{ status }">
        <i
          v-if="status === 'thinking'"
          class="el-icon-loading"
          style="color: #409eff"
        ></i>
        <i
          v-if="status === 'end'"
          class="el-icon-success"
          style="color: #67c23a"
        ></i>
        <i
          v-if="status === 'error'"
          class="el-icon-error"
          style="color: #f56c6c"
        ></i>
      </template>
      <template #label="{ status }">
        <span v-if="status === 'thinking'">思考中</span>
        <span v-if="status === 'end'">思考完成</span>
        <span v-if="status === 'error'">出错啦</span>
      </template>
    </el-x-thinking>

    <!-- 用户消息附件 -->
    <div v-if="item.placement === 'end'">
      <div
        v-if="item.message_files && item.message_files.length > 0"
        class="message-files"
        style="display: flex; flex-wrap: wrap; gap: 8px"
      >
        <el-x-files-card
          v-for="file in item.message_files"
          :key="file.id"
          :name="file.filename"
          :url="file.url || ''"
          :file-size="file.size"
          :file-type="mapFileType(file.type)"
          style="margin-bottom: 8px"
        />
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'BubbleListHeader',
    props: {
      item: {
        type: Object,
        required: true,
      },
      mapFileType: {
        type: Function,
        default: () => {},
      },
    },
    data() {
      return {
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
      };
    },
    methods: {
      // 更新工作流折叠面板的激活状态
      updateWorkflowActiveNames(activeNames) {
        this.$emit('update-workflow-active', {
          messageId: this.item.id,
          activeNames: activeNames,
        });
      },

      // 更新节点折叠面板的激活状态
      updateNodeActiveNames(nodeActiveNames) {
        this.$emit('update-node-active', {
          messageId: this.item.id,
          nodeActiveNames: nodeActiveNames,
        });
      },

      // 获取工作流状态图标
      getWorkflowStatusIcon(status) {
        const iconMap = {
          running: 'el-icon-loading',
          completed: 'el-icon-success',
          failed: 'el-icon-error',
        };
        return iconMap[status] || 'el-icon-info';
      },

      // 获取工作流状态颜色
      getWorkflowStatusColor(status) {
        const colorMap = {
          running: '#409eff',
          completed: '#67c23a',
          failed: '#f56c6c',
        };
        return colorMap[status] || '#909399';
      },

      // 获取节点状态图标
      getNodeStatusIcon(status) {
        const iconMap = {
          running: 'el-icon-loading',
          completed: 'el-icon-success',
          failed: 'el-icon-error',
          pending: 'el-icon-time',
        };
        return iconMap[status] || 'el-icon-info';
      },

      // 获取节点状态颜色
      getNodeStatusColor(status) {
        const colorMap = {
          running: '#409eff',
          completed: '#67c23a',
          failed: '#f56c6c',
          pending: '#909399',
        };
        return colorMap[status] || '#909399';
      },

      // 格式化执行时长
      formatDuration(duration) {
        if (!duration) return '';

        const ms = duration;
        if (ms < 1000) return `${ms}ms`;

        const seconds = Math.floor(ms / 1000);
        if (seconds < 60) return `${seconds}s`;

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
      },

      // 格式化时间戳
      formatTime(timestamp) {
        if (!timestamp) return '';
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  // 隐藏所有滚动条但保持滚动功能
  ::v-deep * {
    scrollbar-width: none !important; /* Firefox */
    -ms-overflow-style: none !important; /* IE and Edge */

    &::-webkit-scrollbar {
      display: none !important; /* Chrome, Safari, Opera */
    }
  }

  ::v-deep .el-x-thinking {
    .content-wrapper {
      margin-bottom: 4px;
    }
  }
  ::v-deep .el-collapse {
    border: none !important;
  }
  // 工作流折叠面板样式
  .workflow-collapse {
    margin-bottom: 8px;
    min-width: 400px;
    // 移除Element UI默认的border

    ::v-deep .el-collapse-item {
      border: none;
      margin-bottom: 12px;
      .el-collapse-item__wrap {
        border: none;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }

    ::v-deep .el-collapse-item__header {
      border: none;
      background: #f8f9fb;
      border-radius: 8px;
      padding: 16px;
      font-weight: 500;
      color: #303133;
      transition: all 0.3s ease;
      height: 36px;
      &:hover {
        background: #ecf5ff;
      }

      .el-collapse-item__arrow {
        color: #909399;
        font-weight: bold;
      }
    }

    ::v-deep .el-collapse-item__content {
      padding: 0;
      border: none;
      background: transparent;
    }

    .workflow-panel {
      border: none;
      border-radius: 0;
      margin-bottom: 0;

      .workflow-title {
        display: flex;
        align-items: center;
        gap: 8px;

        .workflow-title-text {
          font-weight: 500;
          font-size: 14px;
        }

        .workflow-node-count {
          font-size: 10px;
          color: #10b981;
          background: #ecfdf5;
          padding: 1px 6px;
          border-radius: 4px;
          font-weight: 500;
          letter-spacing: 0.2px;
        }
      }
    }
  }

  // 工作流节点样式
  .workflow-nodes {
    padding: 16px 0 0 0;

    .node-collapse {
      // 移除嵌套折叠面板的默认样式
      ::v-deep .el-collapse {
        border: none;
      }

      ::v-deep .el-collapse-item {
        border: none;
        margin-bottom: 8px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .workflow-node {
        &.node-running {
          ::v-deep .el-collapse-item__header {
            background: #ecf5ff;
            border-left: 4px solid #409eff;
          }
        }

        &.node-completed {
          ::v-deep .el-collapse-item__header {
            background: #f0f9eb;
            border-left: 4px solid #67c23a;
          }
        }

        &.node-failed {
          ::v-deep .el-collapse-item__header {
            background: #fef0f0;
            border-left: 4px solid #f56c6c;
          }
        }

        &.node-pending {
          ::v-deep .el-collapse-item__header {
            background: #f8f9fa;
            border-left: 4px solid #e4e7ed;
          }
        }

        ::v-deep .el-collapse-item__header {
          border: none;
          border-radius: 6px;
          padding: 12px 16px;
          margin-bottom: 0;
          background: #fafbfc;
          transition: all 0.3s ease;

          &:hover {
            background: #f0f2f5;
          }

          .el-collapse-item__arrow {
            color: #909399;
            font-size: 12px;
          }

          .node-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;

            .node-info {
              display: flex;
              align-items: center;
              gap: 8px;

              .node-title {
                font-weight: 500;
                font-size: 13px;
                color: #303133;
              }

              .node-type {
                font-size: 10px;
                color: #6b7280;
                background: #f9fafb;
                padding: 1px 6px;
                border-radius: 4px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.3px;
                border: 1px solid #e5e7eb;
              }
            }

            .node-meta {
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 11px;
              color: #909399;

              .node-duration {
                background: #eff6ff;
                color: #2563eb;
                padding: 1px 6px;
                border-radius: 4px;
                font-weight: 500;
                font-size: 10px;
                border: 1px solid #dbeafe;
                letter-spacing: 0.2px;
              }

              .node-index {
                font-weight: 600;
                color: #606266;
              }
            }
          }
        }

        ::v-deep .el-collapse-item__content {
          padding: 16px;
          border: none;
          border-radius: 0;
          background: #ffffff;
          margin-top: -6px;
          border-radius: 0 0 6px 6px;
        }

        .node-details-content {
          .node-error {
            background: #fef0f0;
            border: none;
            border-left: 4px solid #f56c6c;
            border-radius: 6px;
            padding: 12px 16px;
            margin-bottom: 16px;
            font-size: 12px;
            color: #f56c6c;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .node-basic-info {
            margin-bottom: 16px;

            .info-row {
              display: flex;
              align-items: center;
              margin-bottom: 8px;
              font-size: 12px;

              .info-label {
                font-weight: 600;
                color: #606266;
                min-width: 80px;
                margin-right: 12px;
              }

              .info-value {
                color: #909399;
                flex: 1;
                word-break: break-all;
              }
            }
          }

          .node-io-section,
          .node-extras {
            margin-bottom: 16px;

            &:last-child {
              margin-bottom: 0;
            }

            strong {
              font-size: 12px;
              color: #606266;
              font-weight: 600;
              display: block;
              margin-bottom: 8px;
            }

            .node-inputs,
            .node-outputs {
              margin-bottom: 12px;

              &:last-child {
                margin-bottom: 0;
              }
            }

            pre {
              background: #f8f9fb;
              border: none;
              border-radius: 6px;
              padding: 16px;
              font-size: 11px;
              color: #606266;
              white-space: pre-wrap;
              word-break: break-all;
              max-height: 300px;
              overflow-y: auto;
              line-height: 1.6;
              font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;

              // 隐藏滚动条但保持滚动功能
              scrollbar-width: none; /* Firefox */
              -ms-overflow-style: none; /* IE and Edge */

              &::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera */
              }
            }
          }
        }
      }
    }
  }

  // 工作流空状态样式
  .workflow-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 32px 24px;
    color: #909399;
    font-size: 13px;
    background: #f8f9fb;
    border-radius: 6px;
    margin-top: 16px;
  }
</style>
