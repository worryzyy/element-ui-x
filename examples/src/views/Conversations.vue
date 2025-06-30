<template>
  <div>
    <el-card class="demo-card">
      <div slot="header">
        <h2>Conversations 会话列表</h2>
      </div>

      <div class="demo-block">
        <h3>基础用法</h3>
        <el-x-conversations
          :items="basicItems"
          :active="activeConversation"
          @change="handleConversationChange"
        />
        <div class="demo-description">默认模式下的会话列表，点击项目可以切换选中状态</div>
      </div>

      <div class="demo-block">
        <h3>分组与吸顶效果</h3>
        <div class="control-row">
          <h4>列表高度：</h4>
          <el-slider
            style="width: 200px"
            v-model="listHeight"
            :min="200"
            :max="500"
            :step="50"
          />
        </div>
        <div
          class="grouped-container"
          :style="{ height: `${listHeight}px` }"
        >
          <el-x-conversations
            :items="groupedItems"
            :active="activeGroupedConversation"
            :groupable="true"
            @change="handleGroupedChange"
          />
        </div>
        <div class="demo-description">启用分组功能后，滚动时分组标题会自动吸顶显示</div>
      </div>

      <div class="demo-block">
        <h3>自定义分组排序</h3>
        <el-x-conversations
          :items="customGroupedItems"
          :groupable="groupSortOptions"
          :active="activeCustomGrouped"
          @change="handleCustomGroupedChange"
        />
        <div class="demo-description">
          可以通过自定义排序函数控制分组的顺序，例如按字母排序或其他逻辑
        </div>
      </div>

      <div class="demo-block">
        <h3>内置下拉菜单</h3>
        <div class="control-row">
          <el-switch
            v-model="showBuiltInMenu"
            active-text="启用内置菜单"
          />
        </div>
        <el-x-conversations
          :items="menuItems"
          :active="activeMenuItem"
          :show-built-in-menu="showBuiltInMenu"
          @change="handleMenuItemChange"
          @menu-command="handleMenuCommand"
        />
        <div class="demo-description">
          启用内置菜单后，鼠标悬停在项目上会显示操作菜单，点击菜单项触发对应操作
        </div>
        <div
          class="operation-log"
          v-if="operationLogs.length > 0"
        >
          <h4>操作记录：</h4>
          <div
            v-for="(log, index) in operationLogs"
            :key="index"
            class="log-item"
          >
            {{ log }}
          </div>
        </div>
      </div>

      <div class="demo-block">
        <h3>自定义菜单交互</h3>
        <el-x-conversations
          :items="customMenuItems"
          :active="activeCustomMenuItem"
          :show-built-in-menu="true"
          :menu="customMenu"
          @change="handleCustomMenuItemChange"
          @menu-command="handleCustomMenuCommand"
        />
        <div class="demo-description">可以自定义菜单项的图标、文本和样式，并处理菜单命令事件</div>
      </div>

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

      <div class="demo-block">
        <h3>自定义样式与分组标题</h3>
        <el-x-conversations
          :items="styledItems"
          :active="activeStyledItem"
          :groupable="true"
          :items-style="customItemsStyle"
          :items-hover-style="customItemsHoverStyle"
          :items-active-style="customItemsActiveStyle"
          :style="customContainerStyle"
          @change="handleStyledItemChange"
        >
          <template #group-title="{ group }">
            <div class="custom-group-title">
              <i :class="getGroupIcon(group.title)"></i>
              <span>{{ group.title }}</span>
              <span class="group-count">({{ group.children.length }})</span>
            </div>
          </template>

          <template #label="{ item }">
            <div class="custom-label">
              <i
                :class="item.icon || 'el-icon-chat-dot-round'"
                class="custom-icon"
              ></i>
              <span class="custom-text">{{ item.label }}</span>
              <span class="custom-time">{{ item.time }}</span>
            </div>
          </template>
        </el-x-conversations>
        <div class="demo-description">
          可以自定义项目样式、容器样式，以及通过插槽自定义分组标题和项目内容
        </div>
      </div>

      <div class="demo-block">
        <h3>虚拟滚动 vs 原生滚动对比测试</h3>
        <div class="virtual-scroll-test">
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
            </div>

            <!-- 自定义滚动功能控制 -->
            <div
              v-if="scrollMode === 'virtual'"
              class="custom-scroll-controls"
            >
              <h4>自定义滚动功能：</h4>
              <div class="control-row">
                <el-checkbox v-model="performanceMonitorVisible">性能监控</el-checkbox>
                <el-checkbox v-model="scrollInteractions.autoScrollEnabled">自动滚动</el-checkbox>
                <el-checkbox v-model="scrollInteractions.highlightOnScroll">滚动高亮</el-checkbox>
                <el-checkbox v-model="scrollInteractions.scrollToMiddleOnClick">
                  点击居中
                </el-checkbox>
              </div>

              <div
                v-if="scrollInteractions.autoScrollEnabled"
                class="control-row"
              >
                <h4>自动滚动速度：</h4>
                <el-slider
                  v-model="scrollInteractions.autoScrollSpeed"
                  :min="1"
                  :max="10"
                  style="width: 150px"
                />
                <el-button
                  size="mini"
                  @click="startAutoScroll"
                >
                  开始
                </el-button>
                <el-button
                  size="mini"
                  @click="stopAutoScroll"
                >
                  停止
                </el-button>
              </div>
            </div>
          </div>

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
              :virtual-scroll-custom-handler="customVirtualScrollHandler"
              :show-to-top-btn="true"
              :style="testContainerStyle"
              @change="handleTestItemChange"
            >
              <template #group-title="{ group }">
                <div class="test-group-title">
                  <i :class="getTestGroupIcon(group.title)"></i>
                  <span>{{ group.title }}</span>
                  <span class="group-count">
                    ({{ group.children ? group.children.length : 0 }})
                  </span>
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

          <!-- 性能监控面板 -->
          <div
            v-if="performanceMonitorVisible && scrollMode === 'virtual'"
            class="performance-monitor"
          >
            <h4>🚀 性能监控</h4>
            <div class="performance-grid">
              <div class="performance-item">
                <span class="label">FPS:</span>
                <span
                  class="value"
                  :class="{
                    warning: scrollPerformanceData.fps < 50,
                    danger: scrollPerformanceData.fps < 30,
                  }"
                >
                  {{ scrollPerformanceData.fps }}
                </span>
              </div>
              <div class="performance-item">
                <span class="label">滚动事件:</span>
                <span class="value">{{ scrollPerformanceData.scrollEvents }}</span>
              </div>
              <div class="performance-item">
                <span class="label">当前速度:</span>
                <span class="value">
                  {{ scrollPerformanceData.currentScrollSpeed.toFixed(2) }}px/s
                </span>
              </div>
              <div class="performance-item">
                <span class="label">最大速度:</span>
                <span class="value">{{ scrollPerformanceData.maxScrollSpeed.toFixed(2) }}px/s</span>
              </div>
              <div class="performance-item">
                <span class="label">总滚动距离:</span>
                <span class="value">{{ scrollStatistics.totalScrollDistance.toFixed(0) }}px</span>
              </div>
              <div class="performance-item">
                <span class="label">滚动方向:</span>
                <span class="value">
                  {{ scrollStatistics.scrollDirection === 'up' ? '⬆️ 向上' : '⬇️ 向下' }}
                </span>
              </div>
            </div>
            <div class="performance-actions">
              <el-button
                size="mini"
                @click="resetPerformanceData"
              >
                重置数据
              </el-button>
              <el-button
                size="mini"
                @click="jumpToRandomItem"
              >
                随机跳转
              </el-button>
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

      <div class="demo-block">
        <h3>实际应用场景 - 智能客服系统</h3>
        <div class="real-world-container">
          <div class="customer-service-panel">
            <div class="panel-header">
              <h4>
                智能客服系统
                <span class="online-badge">在线</span>
              </h4>
            </div>
            <div class="panel-body">
              <div class="sidebar">
                <div class="search-bar">
                  <el-input
                    placeholder="搜索会话"
                    prefix-icon="el-icon-search"
                    v-model="serviceSearchText"
                    size="small"
                    clearable
                    @clear="filterServiceItems"
                    @input="filterServiceItems"
                  ></el-input>
                </div>
                <div
                  class="conversation-list"
                  ref="serviceConversationList"
                >
                  <div
                    v-if="loadingInitialConversations"
                    class="conversation-loading"
                  >
                    <i class="el-icon-loading"></i>
                    <span>加载中...</span>
                  </div>
                  <template v-else>
                    <el-x-conversations
                      :items="filteredServiceItems"
                      :active="activeServiceItem"
                      :groupable="true"
                      :show-built-in-menu="true"
                      :menu="serviceMenu"
                      :load-more="loadMoreConversations"
                      :load-more-loading="loadingMoreConversations"
                      @change="handleServiceItemChange"
                      @menu-command="handleServiceMenuCommand"
                    >
                      <template #label="{ item }">
                        <div class="service-item">
                          <div
                            class="user-avatar"
                            :class="{ 'has-badge': item.unread > 0 }"
                          >
                            <el-avatar
                              :size="36"
                              :src="item.avatar"
                            >
                              <i class="el-icon-user-solid"></i>
                            </el-avatar>
                            <span
                              v-if="item.unread > 0"
                              class="unread-badge"
                            >
                              {{ item.unread }}
                            </span>
                          </div>
                          <div class="user-info">
                            <div class="user-name-row">
                              <span class="user-name">{{ item.label }}</span>
                              <span class="message-time">{{ item.time }}</span>
                            </div>
                            <div
                              class="last-message"
                              :class="{ 'is-unread': item.unread > 0 }"
                            >
                              {{ item.lastMessage }}
                            </div>
                          </div>
                        </div>
                      </template>
                    </el-x-conversations>
                  </template>
                </div>
              </div>
              <div class="chat-area">
                <div
                  v-if="activeServiceItemData"
                  class="chat-header"
                >
                  <div class="chat-title">
                    <span>{{ activeServiceItemData.label }}</span>
                    <span
                      class="user-status"
                      :class="{ 'is-online': activeServiceItemData.online }"
                    >
                      {{ activeServiceItemData.online ? '在线' : '离线' }}
                    </span>
                  </div>
                  <div class="header-actions">
                    <el-button
                      size="mini"
                      icon="el-icon-s-tools"
                      type="text"
                    >
                      设置
                    </el-button>
                  </div>
                </div>
                <div
                  v-if="activeServiceItemData"
                  class="chat-content"
                >
                  <div class="chat-message-placeholder">
                    <div class="welcome-message">
                      <el-alert
                        title="会话已连接"
                        type="success"
                        description="您现在可以与客户沟通了，所有消息将被加密传输。"
                        show-icon
                        :closable="false"
                      ></el-alert>
                      <div class="customer-info">
                        <h4>客户信息</h4>
                        <p>
                          <strong>姓名：</strong>
                          {{ activeServiceItemData.label }}
                        </p>
                        <p>
                          <strong>会员等级：</strong>
                          {{ activeServiceItemData.vipLevel }}
                        </p>
                        <p>
                          <strong>注册时间：</strong>
                          {{ activeServiceItemData.registerTime }}
                        </p>
                        <p>
                          <strong>最近购买：</strong>
                          {{ activeServiceItemData.lastPurchase }}
                        </p>
                      </div>
                      <div class="quick-replies">
                        <h4>快速回复</h4>
                        <el-x-prompts
                          :items="quickReplyItems"
                          :wrap="true"
                          @on-item-click="handleQuickReplyClick"
                          :styles="{
                            item: {
                              flex: 'none',
                              width: 'calc(50% - 12px)',
                              margin: '6px',
                              cursor: 'pointer',
                              padding: '10px 15px',
                              borderRadius: '8px',
                              backgroundImage: 'linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)',
                              border: '0',
                              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
                              transition: 'all 0.3s ease',
                            },
                            itemContent: {
                              color: '#333',
                            },
                            list: {
                              display: 'flex',
                              flexWrap: 'wrap',
                              margin: '0 -6px',
                            },
                          }"
                          :class-names="{
                            item: 'quick-reply-item',
                          }"
                        ></el-x-prompts>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="activeServiceItemData"
                  class="chat-input"
                >
                  <div class="input-tools">
                    <i class="el-icon-picture-outline-round"></i>
                    <i class="el-icon-paperclip"></i>
                    <i class="el-icon-s-promotion"></i>
                    <i class="el-icon-s-opportunity"></i>
                  </div>
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入消息内容..."
                    v-model="replyMessage"
                  ></el-input>
                  <div class="send-btn">
                    <el-button
                      type="primary"
                      icon="el-icon-s-promotion"
                      :disabled="!replyMessage.trim()"
                    >
                      发送
                    </el-button>
                  </div>
                </div>
                <div
                  v-if="!activeServiceItemData"
                  class="empty-chat"
                >
                  <i class="el-icon-chat-line-square"></i>
                  <p>请选择一个会话开始聊天</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-description">
          这个案例模拟了客服系统中的会话列表实际应用场景，展示了组件如何与其他元素集成，以及如何处理未读消息、在线状态等实际功能，并使用了组件自带的加载更多功能自动加载更多会话内容
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'ConversationsDemo',
    data() {
      return {
        // 基础列表数据
        basicItems: [
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
        ],
        activeConversation: '1',

        // 分组列表数据
        groupedItems: [
          {
            id: 'g1',
            label: '工作群1',
            group: '工作',
            prefixIcon: 'el-icon-office-building',
          },
          {
            id: 'g2',
            label: '工作群2',
            group: '工作',
            prefixIcon: 'el-icon-office-building',
          },
          {
            id: 'g3',
            label: '工作群3',
            group: '工作',
            prefixIcon: 'el-icon-office-building',
          },
          {
            id: 'g4',
            label: '学习小组1',
            group: '学习',
            prefixIcon: 'el-icon-reading',
          },
          {
            id: 'g5',
            label: '学习小组2',
            group: '学习',
            prefixIcon: 'el-icon-reading',
          },
          {
            id: 'g6',
            label: '同学聊天群',
            group: '学习',
            prefixIcon: 'el-icon-reading',
          },
          {
            id: 'g7',
            label: '家人群聊',
            group: '家庭',
            prefixIcon: 'el-icon-house',
          },
          {
            id: 'g8',
            label: '亲戚群',
            group: '家庭',
            prefixIcon: 'el-icon-house',
          },
          {
            id: 'g9',
            label: '朋友圈1',
            group: '朋友',
            prefixIcon: 'el-icon-user',
          },
          {
            id: 'g10',
            label: '朋友圈2',
            group: '朋友',
            prefixIcon: 'el-icon-user',
          },
          {
            id: 'g11',
            label: '朋友圈3',
            group: '朋友',
            prefixIcon: 'el-icon-user',
          },
          {
            id: 'g12',
            label: '未分类会话1',
            prefixIcon: 'el-icon-chat-line-round',
          },
          {
            id: 'g13',
            label: '未分类会话2',
            prefixIcon: 'el-icon-chat-line-round',
          },
        ],
        activeGroupedConversation: 'g1',
        listHeight: 300,

        // 自定义分组排序
        customGroupedItems: [
          {
            id: 'c1',
            label: '项目A讨论',
            group: 'A级项目',
            prefixIcon: 'el-icon-s-flag',
          },
          {
            id: 'c2',
            label: '项目B规划',
            group: 'B级项目',
            prefixIcon: 'el-icon-s-flag',
          },
          {
            id: 'c3',
            label: '项目C评审',
            group: 'C级项目',
            prefixIcon: 'el-icon-s-flag',
          },
          {
            id: 'c4',
            label: '项目A需求',
            group: 'A级项目',
            prefixIcon: 'el-icon-s-flag',
          },
          {
            id: 'c5',
            label: '项目B进度',
            group: 'B级项目',
            prefixIcon: 'el-icon-s-flag',
          },
          {
            id: 'c6',
            label: '项目D立项',
            group: 'D级项目',
            prefixIcon: 'el-icon-s-flag',
          },
        ],
        groupSortOptions: {
          sort: (a, b) => {
            // 按项目级别排序: A > B > C > D > 未分组
            const levels = {
              A级项目: 1,
              B级项目: 2,
              C级项目: 3,
              D级项目: 4,
            };
            return (levels[a] || 999) - (levels[b] || 999);
          },
        },
        activeCustomGrouped: 'c1',

        // 内置菜单项
        menuItems: [
          {
            id: 'm1',
            label: '产品需求讨论',
            prefixIcon: 'el-icon-document',
          },
          {
            id: 'm2',
            label: '每周例会',
            prefixIcon: 'el-icon-date',
          },
          {
            id: 'm3',
            label: '营销策略',
            prefixIcon: 'el-icon-data-analysis',
          },
          {
            id: 'm4',
            label: '技术架构评审',
            prefixIcon: 'el-icon-cpu',
          },
        ],
        activeMenuItem: 'm1',
        showBuiltInMenu: true,
        operationLogs: [],

        // 自定义菜单
        customMenuItems: [
          {
            id: 'cm1',
            label: '重要客户A',
            prefixIcon: 'el-icon-user',
            suffixIcon: 'el-icon-star-on',
          },
          {
            id: 'cm2',
            label: '潜在客户B',
            prefixIcon: 'el-icon-user',
          },
          {
            id: 'cm3',
            label: '合作伙伴C',
            prefixIcon: 'el-icon-user-solid',
          },
          {
            id: 'cm4',
            label: '供应商D',
            prefixIcon: 'el-icon-user',
          },
        ],
        customMenu: [
          {
            label: '标为重要',
            key: 'star',
            icon: 'el-icon-star-off',
            command: 'star',
            menuItemHoverStyle: {
              color: '#E6A23C',
              backgroundColor: 'rgba(230, 162, 60, 0.1)',
            },
          },
          {
            label: '归档',
            key: 'archive',
            icon: 'el-icon-folder',
            command: 'archive',
          },
          {
            label: '删除',
            key: 'delete',
            icon: 'el-icon-delete',
            command: 'delete',
            menuItemHoverStyle: {
              color: '#F56C6C',
              backgroundColor: 'rgba(245, 108, 108, 0.1)',
            },
          },
        ],
        activeCustomMenuItem: 'cm1',

        // 加载更多数据
        lazyItems: [],
        activeLazyItem: '',
        isLoadingMore: false,
        currentLazyPage: 0,
        maxLazyPages: 5,
        toTopBtnType: 'primary',
        toTopBtnStyle: {},
        btnPosition: 'right',
        cssProperty: '',
        cssValue: '',
        cssProperties: [
          {
            label: 'backgroundColor',
            value: 'backgroundColor',
          },
          {
            label: 'borderRadius',
            value: 'borderRadius',
          },
          {
            label: 'boxShadow',
            value: 'boxShadow',
          },
          {
            label: 'color',
            value: 'color',
          },
          {
            label: 'fontSize',
            value: 'fontSize',
          },
          {
            label: 'fontWeight',
            value: 'fontWeight',
          },
          {
            label: 'height',
            value: 'height',
          },
          {
            label: 'left',
            value: 'left',
          },
          {
            label: 'opacity',
            value: 'opacity',
          },
          {
            label: 'padding',
            value: 'padding',
          },
          {
            label: 'position',
            value: 'position',
          },
          {
            label: 'right',
            value: 'right',
          },
          {
            label: 'top',
            value: 'top',
          },
          {
            label: 'transform',
            value: 'transform',
          },
          {
            label: 'width',
            value: 'width',
          },
          {
            label: 'zIndex',
            value: 'zIndex',
          },
        ],
        loadingCssValues: false,
        cssValueOptions: [],

        // 自定义样式
        styledItems: [
          {
            id: 's1',
            label: '设计讨论',
            group: '设计部',
            time: '10:30',
            icon: 'el-icon-picture-outline',
          },
          {
            id: 's2',
            label: 'UI评审',
            group: '设计部',
            time: '昨天',
            icon: 'el-icon-picture',
          },
          {
            id: 's3',
            label: '后端架构',
            group: '技术部',
            time: '周一',
            icon: 'el-icon-s-operation',
          },
          {
            id: 's4',
            label: 'API讨论',
            group: '技术部',
            time: '周二',
            icon: 'el-icon-s-platform',
          },
          {
            id: 's5',
            label: '产品规划',
            group: '产品部',
            time: '3天前',
            icon: 'el-icon-s-goods',
          },
          {
            id: 's6',
            label: '需求梳理',
            group: '产品部',
            time: '上周',
            icon: 'el-icon-document',
          },
        ],
        activeStyledItem: 's1',
        customItemsStyle: {
          borderRadius: '4px',
          margin: '4px 10px 4px 0',
          padding: '10px 12px',
        },
        customItemsHoverStyle: {
          backgroundColor: '#f0f9eb',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        },
        customItemsActiveStyle: {
          backgroundColor: '#f0f9eb',
          borderLeft: '3px solid #67C23A',
        },
        customContainerStyle: {
          borderRadius: '8px',
          boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
          width: '320px',
        },

        // 客服系统数据
        serviceItems: [
          {
            id: 'cust1',
            label: '张先生',
            group: '优先级-高',
            online: true,
            unread: 3,
            time: '10:30',
            avatar: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg',
            lastMessage: '我的订单什么时候能到货？已经等了一周了',
            vipLevel: '黄金会员',
            registerTime: '2021-05-15',
            lastPurchase: '智能手表 A1 Pro',
          },
          {
            id: 'cust2',
            label: '李女士',
            group: '优先级-高',
            online: true,
            unread: 0,
            time: '09:45',
            avatar: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg',
            lastMessage: '好的，谢谢您的解答',
            vipLevel: '铂金会员',
            registerTime: '2020-11-23',
            lastPurchase: '智能空气净化器',
          },
          {
            id: 'cust3',
            label: '王先生',
            group: '优先级-中',
            online: false,
            unread: 0,
            time: '昨天',
            avatar: '',
            lastMessage: '请问如何申请退款？',
            vipLevel: '白银会员',
            registerTime: '2022-01-18',
            lastPurchase: '蓝牙耳机 F3',
          },
          {
            id: 'cust4',
            label: '赵女士',
            group: '优先级-中',
            online: true,
            unread: 2,
            time: '昨天',
            avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
            lastMessage: '刚收到货，但是颜色跟网站上的不一样',
            vipLevel: '黄金会员',
            registerTime: '2021-08-30',
            lastPurchase: '智能台灯',
          },
          {
            id: 'cust5',
            label: '钱先生',
            group: '优先级-低',
            online: false,
            unread: 0,
            time: '周一',
            avatar: '',
            lastMessage: '你们的优惠券什么时候可以发放？',
            vipLevel: '普通会员',
            registerTime: '2022-06-05',
            lastPurchase: '充电宝',
          },
          {
            id: 'cust6',
            label: '孙女士',
            group: '优先级-低',
            online: false,
            unread: 0,
            time: '上周',
            avatar: '',
            lastMessage: '物流很快，第二天就收到了',
            vipLevel: '普通会员',
            registerTime: '2022-04-12',
            lastPurchase: '智能门锁',
          },
          {
            id: 'cust7',
            label: '周先生',
            group: '新用户',
            online: true,
            unread: 1,
            time: '刚刚',
            avatar: '',
            lastMessage: '请问怎么注册会员？',
            vipLevel: '普通会员',
            registerTime: '2023-05-01',
            lastPurchase: '未购买',
          },
          {
            id: 'cust8',
            label: '吴女士',
            group: '新用户',
            online: false,
            unread: 0,
            time: '08:15',
            avatar: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg',
            lastMessage: '可以帮我推荐一款性价比高的产品吗？',
            vipLevel: '普通会员',
            registerTime: '2023-04-28',
            lastPurchase: '未购买',
          },
        ],
        filteredServiceItems: [],
        serviceItemsAll: [], // 存储所有会话数据
        conversationPage: 1,
        conversationPageSize: 8,
        hasMoreConversations: true,
        loadingMoreConversations: false,
        loadingInitialConversations: true,
        activeServiceItem: '',
        serviceSearchText: '',
        replyMessage: '',
        serviceMenu: [
          {
            label: '标记已读',
            key: 'mark-read',
            icon: 'el-icon-message',
            command: 'mark-read',
          },
          {
            label: '转接客服',
            key: 'transfer',
            icon: 'el-icon-s-promotion',
            command: 'transfer',
          },
          {
            label: '结束会话',
            key: 'end',
            icon: 'el-icon-circle-close',
            command: 'end',
            menuItemHoverStyle: {
              color: '#F56C6C',
              backgroundColor: 'rgba(245, 108, 108, 0.1)',
            },
          },
        ],
        quickReplyItems: [
          {
            key: 'greeting',
            label: '问候语',
            description: '您好，很高兴为您服务，请问有什么可以帮助您的？',
          },
          {
            key: 'order-status',
            label: '查询订单',
            description: '正在查询您的订单状态，请稍等...',
          },
          {
            key: 'shipping',
            label: '发货时间',
            description: '该商品预计在3-5个工作日内发货。',
          },
          {
            key: 'return-policy',
            label: '退换政策',
            description: '您可以在收到商品后15天内申请退换货。',
          },
        ],

        // 虚拟滚动测试相关数据
        scrollMode: 'native', // 'native' | 'virtual'
        dataSize: 'small', // 'small' | 'medium' | 'large'
        enableGrouping: true,
        testListHeight: 400,
        testConversationItems: [],
        activeTestItem: '',
        autoScrollTimer: null,
        virtualScrollTestOptions: {
          size: 60, // 每项高度
          buffer: 200, // 缓冲区大小(像素)
        },
        testContainerStyle: {
          border: '1px solid #ebeef5',
          borderRadius: '4px',
        },

        // 自定义滚动功能数据
        scrollPerformanceData: {
          fps: 0,
          scrollEvents: 0,
          lastTime: 0,
          frameCount: 0,
          averageRenderTime: 0,
          maxScrollSpeed: 0,
          currentScrollSpeed: 0,
        },
        scrollInteractions: {
          autoScrollEnabled: false,
          autoScrollSpeed: 2,
          highlightOnScroll: false,
          scrollToMiddleOnClick: false,
          smoothScrollEnabled: true,
        },
        performanceMonitorVisible: false,
        scrollStatistics: {
          totalScrollDistance: 0,
          scrollDirection: 'down',
          lastScrollTop: 0,
          scrollSessions: 0,
          averageScrollSpeed: 0,
          maxScrollPosition: 0,
        },
      };
    },
    created() {
      // 初始化加载更多数据
      this.initLazyItems();
      // 初始化按钮样式
      this.updateBtnStyle();
      // 初始化客服列表
      this.initServiceConversations();
      // 初始化虚拟滚动测试数据
      this.generateTestData();
    },
    computed: {
      activeServiceItemData() {
        // 检查在serviceItems和serviceItemsAll中查找匹配的项目
        const item =
          this.serviceItems.find(item => item.id === this.activeServiceItem) ||
          this.serviceItemsAll.find(item => item.id === this.activeServiceItem);
        return item || null;
      },
    },
    methods: {
      // 基础列表事件处理
      handleConversationChange(item) {
        this.activeConversation = item.uniqueKey;
      },

      // 分组列表事件处理
      handleGroupedChange(item) {
        this.activeGroupedConversation = item.uniqueKey;
      },

      // 自定义分组排序事件处理
      handleCustomGroupedChange(item) {
        this.activeCustomGrouped = item.uniqueKey;
      },

      // 内置菜单事件处理
      handleMenuItemChange(item) {
        this.activeMenuItem = item.uniqueKey;
      },
      handleMenuCommand(command, item) {
        const actionMap = {
          rename: '重命名',
          delete: '删除',
        };
        const actionText = actionMap[command] || command;
        this.operationLogs.unshift(`${actionText} - ${item.label}`);

        // 最多显示5条记录
        if (this.operationLogs.length > 5) {
          this.operationLogs.pop();
        }
      },

      // 自定义菜单事件处理
      handleCustomMenuItemChange(item) {
        this.activeCustomMenuItem = item.uniqueKey;
      },
      handleCustomMenuCommand(command, item) {
        const actionMap = {
          star: '标记为重要',
          archive: '归档',
          delete: '删除',
        };
        const actionText = actionMap[command] || command;
        this.operationLogs.unshift(`${actionText} - ${item.label}`);

        // 如果是星标操作，切换星标状态
        if (command === 'star') {
          const targetItem = this.customMenuItems.find(i => i.id === item.id);
          if (targetItem) {
            targetItem.suffixIcon = targetItem.suffixIcon ? null : 'el-icon-star-on';
          }
        }

        // 最多显示5条记录
        if (this.operationLogs.length > 5) {
          this.operationLogs.pop();
        }
      },

      // 加载更多相关方法
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

      // 自定义样式相关方法
      handleStyledItemChange(item) {
        this.activeStyledItem = item.uniqueKey;
      },
      getGroupIcon(group) {
        const iconMap = {
          设计部: 'el-icon-picture-outline',
          技术部: 'el-icon-s-operation',
          产品部: 'el-icon-s-goods',
        };
        return iconMap[group] || 'el-icon-folder';
      },
      updateBtnStyle() {
        // 设置位置样式
        if (this.btnPosition === 'left') {
          this.toTopBtnStyle = {
            ...this.toTopBtnStyle,
            right: 'auto',
            left: '16px',
          };
        } else {
          // 如果切换回右侧，移除左侧定位
          const { right, left, ...rest } = this.toTopBtnStyle;
          this.toTopBtnStyle = {
            ...rest,
            right: '16px',
          };
        }
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

      // 监听CSS属性变化，提供相应的值选项
      getCssValueOptions() {
        this.loadingCssValues = true;
        setTimeout(() => {
          const valueMap = {
            backgroundColor: [
              { value: '#409EFF' },
              { value: '#67C23A' },
              { value: '#E6A23C' },
              { value: '#F56C6C' },
              { value: 'transparent' },
            ],
            borderRadius: [{ value: '2px' }, { value: '4px' }, { value: '8px' }, { value: '50%' }],
            boxShadow: [
              { value: '0 2px 4px rgba(0,0,0,0.1)' },
              { value: '0 2px 12px 0 rgba(0,0,0,0.1)' },
              { value: '0 0 6px rgba(0,0,0,0.2)' },
              { value: 'none' },
            ],
            color: [
              { value: '#409EFF' },
              { value: '#67C23A' },
              { value: '#E6A23C' },
              { value: '#F56C6C' },
              { value: '#FFFFFF' },
            ],
            fontSize: [{ value: '12px' }, { value: '14px' }, { value: '16px' }, { value: '18px' }],
            fontWeight: [
              { value: 'normal' },
              { value: 'bold' },
              { value: '400' },
              { value: '600' },
            ],
            position: [{ value: 'absolute' }, { value: 'fixed' }, { value: 'relative' }],
            transform: [
              { value: 'scale(1.1)' },
              { value: 'rotate(45deg)' },
              { value: 'translateY(-5px)' },
            ],
            opacity: [{ value: '0.5' }, { value: '0.8' }, { value: '1' }],
          };

          this.cssValueOptions = valueMap[this.cssProperty] || [
            { value: 'auto' },
            { value: '0' },
            { value: '10px' },
            { value: '16px' },
            { value: '24px' },
            { value: '100%' },
          ];

          this.loadingCssValues = false;
        }, 200);
      },

      // 输入提示处理函数
      queryPropertySearch(queryString, cb) {
        const properties = [
          { value: 'backgroundColor' },
          { value: 'borderRadius' },
          { value: 'boxShadow' },
          { value: 'color' },
          { value: 'fontSize' },
          { value: 'fontWeight' },
          { value: 'height' },
          { value: 'left' },
          { value: 'opacity' },
          { value: 'padding' },
          { value: 'position' },
          { value: 'right' },
          { value: 'top' },
          { value: 'transform' },
          { value: 'width' },
          { value: 'zIndex' },
        ];

        const results = queryString
          ? properties.filter(
              prop => prop.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0,
            )
          : properties;

        // 调用回调返回建议列表
        cb(results);
      },

      queryValueSearch(queryString, cb) {
        // 如果有属性，获取该属性的建议值
        if (this.cssProperty) {
          this.getCssValueOptions();
          setTimeout(() => {
            const results = queryString
              ? this.cssValueOptions.filter(
                  item => item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0,
                )
              : this.cssValueOptions;
            cb(results);
          }, 200);
        } else {
          cb([]);
        }
      },

      // 客服系统相关方法
      initServiceConversations() {
        // 清空会话列表
        this.serviceItemsAll = [];
        this.filteredServiceItems = [];
        this.conversationPage = 1;
        this.loadingInitialConversations = true;
        this.activeServiceItem = ''; // 重置选中的会话

        // 模拟加载初始会话数据
        setTimeout(() => {
          this.loadMoreConversations(true);
        }, 1000);
      },

      generateMockConversations(page, pageSize) {
        // 模拟用户名和群组
        const names = [
          '张先生',
          '李女士',
          '王先生',
          '赵女士',
          '钱先生',
          '孙女士',
          '周先生',
          '吴女士',
          '郑先生',
          '王女士',
          '李先生',
          '赵先生',
          '陈女士',
          '杨先生',
          '黄女士',
          '刘先生',
          '周女士',
          '魏女士',
          '陈先生',
          '马先生',
          '林女士',
          '高先生',
          '唐女士',
        ];

        const groups = ['优先级-高', '优先级-中', '优先级-低', '新用户'];
        const products = [
          '智能手表',
          '无线耳机',
          '智能手机',
          '智能台灯',
          '空气净化器',
          '智能门锁',
          '平板电脑',
          '智能音箱',
          '电动牙刷',
          '智能体重秤',
        ];

        // 时间描述
        const times = [
          '刚刚',
          '5分钟前',
          '10分钟前',
          '半小时前',
          '1小时前',
          '2小时前',
          '今天',
          '昨天',
          '前天',
          '上周',
          '两周前',
        ];

        // 消息模板
        const messages = [
          '请问我的订单什么时候能到货？',
          '这个商品有什么颜色可选？',
          '能便宜一点吗？',
          '请问有优惠活动吗？',
          '我想退货，怎么操作？',
          '送货上门吗？',
          '这个商品的质量怎么样？',
          '有安装服务吗？',
          '保修期是多久？',
          '你们接受货到付款吗？',
          '我昨天购买的商品已经收到了，非常满意',
          '商品有问题，需要换货',
          '请问如何解绑账号？',
          '如何修改收货地址？',
          '我的会员积分怎么查询？',
        ];

        // 修复ID前缀问题
        const idPrefix = page === 1 ? 'cust' : `cust${page}_`;
        const avatars = [
          'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg',
          'https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg',
          'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          '',
        ];

        // 模拟生成会话列表数据
        const conversations = [];

        for (let i = 0; i < pageSize; i++) {
          const nameIndex = Math.floor(Math.random() * names.length);
          const groupIndex = Math.floor(Math.random() * groups.length);
          const timeIndex = Math.floor(Math.random() * times.length);
          const messageIndex = Math.floor(Math.random() * messages.length);
          const avatarIndex = Math.floor(Math.random() * avatars.length);
          const productIndex = Math.floor(Math.random() * products.length);

          // 随机生成未读消息数，大部分为0
          const unreadRandom = Math.random();
          let unread = 0;
          if (unreadRandom > 0.7) {
            unread = Math.floor(Math.random() * 5) + 1;
          }

          // 随机生成在线状态
          const online = Math.random() > 0.5;

          conversations.push({
            id: `${idPrefix}${i + 1}`,
            label: names[nameIndex],
            group: groups[groupIndex],
            online: online,
            unread: unread,
            time: times[timeIndex],
            avatar: avatars[avatarIndex],
            lastMessage: messages[messageIndex],
            vipLevel:
              unreadRandom > 0.8
                ? '钻石会员'
                : unreadRandom > 0.6
                ? '黄金会员'
                : unreadRandom > 0.3
                ? '白银会员'
                : '普通会员',
            registerTime: `${2020 + Math.floor(Math.random() * 4)}-${String(
              Math.floor(Math.random() * 12) + 1,
            ).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            lastPurchase:
              unreadRandom > 0.2
                ? `${products[productIndex]} ${
                    ['Pro', 'Plus', 'Max', 'Lite', ''][Math.floor(Math.random() * 5)]
                  }`
                : '未购买',
          });
        }

        return conversations;
      },

      loadMoreConversations(isInitial = false) {
        if (!isInitial && !this.hasMoreConversations) return;

        this.loadingMoreConversations = true;

        // 模拟API请求延迟
        setTimeout(() => {
          // 生成新的会话数据
          const newConversations = this.generateMockConversations(
            this.conversationPage,
            this.conversationPageSize,
          );

          // 将新数据添加到总列表中
          this.serviceItemsAll = [...this.serviceItemsAll, ...newConversations];

          // 如果是初始加载或者没有搜索关键词，直接更新展示的列表
          if (isInitial || !this.serviceSearchText) {
            this.filteredServiceItems = [...this.serviceItemsAll];
          } else {
            // 否则需要根据关键词过滤
            this.filterServiceItems();
          }

          // 更新页码和加载状态
          this.conversationPage++;
          this.loadingMoreConversations = false;
          this.loadingInitialConversations = false;

          // 模拟服务器端是否还有更多数据
          this.hasMoreConversations = this.conversationPage < 5; // 假设只有5页数据

          // 如果是初始加载，默认选中第一个会话
          if (isInitial && newConversations.length > 0) {
            this.activeServiceItem = newConversations[0].id;
            console.log('初始加载选中会话:', this.activeServiceItem);
          }
        }, 1000);
      },

      handleConversationScroll(e) {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        // 当滚动到底部时，自动触发加载更多
        if (
          scrollHeight - scrollTop - clientHeight < 50 &&
          this.hasMoreConversations &&
          !this.loadingMoreConversations
        ) {
          this.loadMoreConversations();
        }
      },

      handleServiceItemChange(item) {
        console.log('会话切换:', item, item.id, item.uniqueKey);
        // 注意：item.uniqueKey可能是由组件生成的键，而item.id是我们需要的实际ID
        const itemId = item.id || item.uniqueKey;
        this.activeServiceItem = itemId;

        // 在两个数据源中查找匹配的项
        const serviceItem = this.serviceItemsAll.find(i => i.id === itemId);
        if (serviceItem) {
          serviceItem.unread = 0;
          console.log('已找到并更新项:', serviceItem.id);
        } else {
          console.log('未找到对应的会话项:', itemId);
        }
      },

      filterServiceItems() {
        if (!this.serviceSearchText) {
          this.filteredServiceItems = [...this.serviceItemsAll];
          return;
        }

        const searchText = this.serviceSearchText.toLowerCase();
        this.filteredServiceItems = this.serviceItemsAll.filter(
          item =>
            item.label.toLowerCase().includes(searchText) ||
            (item.lastMessage && item.lastMessage.toLowerCase().includes(searchText)),
        );
      },

      handleServiceMenuCommand(command, item) {
        const serviceItem = this.serviceItemsAll.find(i => i.id === item.id);
        if (!serviceItem) return;

        if (command === 'mark-read') {
          serviceItem.unread = 0;
        } else if (command === 'end') {
          this.$confirm('确定要结束与该客户的会话吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              // 模拟结束会话
              this.$message({
                type: 'success',
                message: `已结束与 ${serviceItem.label} 的会话`,
              });
            })
            .catch(() => {});
        } else if (command === 'transfer') {
          this.$message({
            type: 'info',
            message: `已将 ${serviceItem.label} 的会话转接给其他客服`,
          });
        }
      },
      handleQuickReplyClick(item) {
        const text = item.data.description;
        this.replyMessage = text;
        this.$message({
          type: 'success',
          message: '已选择快速回复模板',
        });
      },

      // 虚拟滚动测试相关方法
      generateTestData() {
        const dataSizes = {
          small: 50,
          medium: 500,
          large: 2000,
        };

        const count = dataSizes[this.dataSize];
        const items = [];

        // 预定义的分组
        const groups = ['工作群组', '学习小组', '朋友圈', '家庭群', '技术交流', '兴趣爱好'];
        const icons = [
          'el-icon-chat-dot-round',
          'el-icon-chat-round',
          'el-icon-chat-line-round',
          'el-icon-user',
          'el-icon-office-building',
        ];
        const times = ['刚刚', '5分钟前', '10分钟前', '半小时前', '1小时前', '昨天', '上周'];

        for (let i = 0; i < count; i++) {
          const groupIndex = Math.floor(i / (count / groups.length));
          const item = {
            id: `test-${i + 1}`,
            key: `test-${i + 1}`,
            label: `测试会话 ${i + 1}`,
            subtitle: `这是第 ${i + 1} 个测试消息，用于演示滚动性能`,
            icon: icons[i % icons.length],
            time: times[i % times.length],
          };

          // 如果启用分组，添加分组信息
          if (this.enableGrouping) {
            item.group = groups[groupIndex] || groups[0];
          }

          items.push(item);
        }

        this.testConversationItems = items;

        // 默认选中第一项
        if (items.length > 0) {
          this.activeTestItem = items[0].id;
        }
      },

      handleScrollModeChange() {
        // 滚动模式切换时重新生成数据以确保组件重新渲染
        this.$nextTick(() => {
          this.generateTestData();
        });
      },

      handleTestItemChange(item) {
        this.activeTestItem = item.uniqueKey || item.id;

        // 点击居中功能
        if (this.scrollInteractions.scrollToMiddleOnClick && this.scrollMode === 'virtual') {
          this.$nextTick(() => {
            const conversationComponent = this.$children.find(
              child => child.$options.name === 'ElXConversations' && child.virtualScroll,
            );

            if (conversationComponent) {
              conversationComponent.scrollToItem(item.id || item.uniqueKey);
            }
          });
        }
      },

      getTestGroupIcon(groupTitle) {
        const iconMap = {
          工作群组: 'el-icon-office-building',
          学习小组: 'el-icon-reading',
          朋友圈: 'el-icon-user',
          家庭群: 'el-icon-house',
          技术交流: 'el-icon-cpu',
          兴趣爱好: 'el-icon-star-on',
        };
        return iconMap[groupTitle] || 'el-icon-folder';
      },

      // 自定义虚拟滚动处理方法 - 包含性能监控、统计和特殊交互
      customVirtualScrollHandler(event, scrollInfo) {
        // 只在虚拟滚动模式下执行自定义逻辑
        if (this.scrollMode !== 'virtual') {
          return;
        }

        // === 性能监控 ===
        if (this.performanceMonitorVisible) {
          this.updatePerformanceMetrics(scrollInfo);
        }

        // === 滚动统计 ===
        this.updateScrollStatistics(scrollInfo);

        // === 滚动高亮特效 ===
        if (this.scrollInteractions.highlightOnScroll) {
          this.highlightVisibleItems();
        }

        // === 智能滚动优化 ===
        if (this.scrollInteractions.smoothScrollEnabled) {
          this.applySmoothScrolling(event);
        }

        // 继续执行默认滚动处理
        return undefined;
      },

      // 更新性能指标
      updatePerformanceMetrics(scrollInfo) {
        const currentTime = performance.now();
        this.scrollPerformanceData.scrollEvents++;

        // 计算 FPS
        if (this.scrollPerformanceData.lastTime) {
          const deltaTime = currentTime - this.scrollPerformanceData.lastTime;
          if (deltaTime > 0) {
            const currentFPS = Math.round(1000 / deltaTime);
            this.scrollPerformanceData.fps = currentFPS;
          }
        }
        this.scrollPerformanceData.lastTime = currentTime;

        // 计算滚动速度
        if (this.scrollStatistics.lastScrollTop !== undefined) {
          const deltaScroll = Math.abs(scrollInfo.scrollTop - this.scrollStatistics.lastScrollTop);
          const deltaTime = currentTime - (this.scrollPerformanceData.lastTime || currentTime);
          if (deltaTime > 0) {
            this.scrollPerformanceData.currentScrollSpeed = (deltaScroll / deltaTime) * 1000;
            if (
              this.scrollPerformanceData.currentScrollSpeed >
              this.scrollPerformanceData.maxScrollSpeed
            ) {
              this.scrollPerformanceData.maxScrollSpeed =
                this.scrollPerformanceData.currentScrollSpeed;
            }
          }
        }
      },

      // 更新滚动统计
      updateScrollStatistics(scrollInfo) {
        if (this.scrollStatistics.lastScrollTop !== undefined) {
          const deltaScroll = Math.abs(scrollInfo.scrollTop - this.scrollStatistics.lastScrollTop);
          this.scrollStatistics.totalScrollDistance += deltaScroll;

          // 判断滚动方向
          if (scrollInfo.scrollTop > this.scrollStatistics.lastScrollTop) {
            this.scrollStatistics.scrollDirection = 'down';
          } else if (scrollInfo.scrollTop < this.scrollStatistics.lastScrollTop) {
            this.scrollStatistics.scrollDirection = 'up';
          }
        }

        this.scrollStatistics.lastScrollTop = scrollInfo.scrollTop;

        // 记录最大滚动位置
        if (scrollInfo.scrollTop > this.scrollStatistics.maxScrollPosition) {
          this.scrollStatistics.maxScrollPosition = scrollInfo.scrollTop;
        }
      },

      // 高亮可见项目
      highlightVisibleItems() {
        // 简单的视觉反馈，可以通过CSS动画实现
        this.$nextTick(() => {
          const visibleItems = document.querySelectorAll('.test-item-label');
          visibleItems.forEach((item, index) => {
            if (index % 3 === 0) {
              // 每三个项目高亮一个
              item.style.transition = 'background-color 0.3s ease';
              item.style.backgroundColor = 'rgba(64, 158, 255, 0.1)';
              setTimeout(() => {
                item.style.backgroundColor = '';
              }, 300);
            }
          });
        });
      },

      // 应用平滑滚动
      applySmoothScrolling(event) {
        // 添加平滑滚动的CSS类
        const container = event.target;
        if (container) {
          container.style.scrollBehavior = 'smooth';
        }
      },

      // 重置性能数据
      resetPerformanceData() {
        this.scrollPerformanceData = {
          fps: 0,
          scrollEvents: 0,
          lastTime: 0,
          frameCount: 0,
          averageRenderTime: 0,
          maxScrollSpeed: 0,
          currentScrollSpeed: 0,
        };
        this.scrollStatistics = {
          totalScrollDistance: 0,
          scrollDirection: 'down',
          lastScrollTop: 0,
          scrollSessions: 0,
          averageScrollSpeed: 0,
          maxScrollPosition: 0,
        };
        this.$message.success('性能数据已重置');
      },

      // 跳转到随机项目
      jumpToRandomItem() {
        if (this.testConversationItems.length === 0) return;

        const randomIndex = Math.floor(Math.random() * this.testConversationItems.length);
        const randomItem = this.testConversationItems[randomIndex];

        // 使用组件的公共方法滚动到指定项目
        const conversationComponent = this.$children.find(
          child => child.$options.name === 'ElXConversations' && child.virtualScroll,
        );

        if (conversationComponent) {
          conversationComponent.scrollToItem(randomItem.id);
          this.activeTestItem = randomItem.id;
          this.$message.info(`已跳转到：${randomItem.label}`);
        }
      },

      // 开始自动滚动
      startAutoScroll() {
        if (this.autoScrollTimer) return;

        this.autoScrollTimer = setInterval(() => {
          const conversationComponent = this.$children.find(
            child => child.$options.name === 'ElXConversations' && child.virtualScroll,
          );

          if (conversationComponent) {
            const container = conversationComponent.getVirtualScrollContainer();
            if (container && container.$el) {
              const currentScrollTop = container.$el.scrollTop;
              const maxScroll = container.$el.scrollHeight - container.$el.clientHeight;
              const newScrollTop = currentScrollTop + this.scrollInteractions.autoScrollSpeed * 10;

              if (newScrollTop >= maxScroll) {
                // 到达底部，回到顶部
                container.scrollToPosition(0);
              } else {
                container.scrollToPosition(newScrollTop);
              }
            }
          }
        }, 100);

        this.$message.success('自动滚动已开始');
      },

      // 停止自动滚动
      stopAutoScroll() {
        if (this.autoScrollTimer) {
          clearInterval(this.autoScrollTimer);
          this.autoScrollTimer = null;
          this.$message.info('自动滚动已停止');
        }
      },
    },
    beforeDestroy() {
      // 清理自动滚动定时器
      if (this.autoScrollTimer) {
        clearInterval(this.autoScrollTimer);
        this.autoScrollTimer = null;
      }
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

  .demo-description {
    margin-top: 15px;
    color: #909399;
    font-size: 14px;
  }

  .demo-controls {
    margin-top: 15px;
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

  .grouped-container,
  .lazy-container {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    height: 300px;
    overflow: hidden;
  }

  .operation-log {
    margin-top: 15px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 4px;

    h4 {
      margin-top: 0;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 500;
    }

    .log-item {
      padding: 4px 0;
      border-bottom: 1px dashed #ebeef5;
      font-size: 13px;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .custom-group-title {
    display: flex;
    align-items: center;

    i {
      margin-right: 8px;
      color: #67c23a;
    }

    .group-count {
      margin-left: 5px;
      font-size: 12px;
      color: #909399;
    }
  }

  .custom-label {
    display: flex;
    align-items: center;
    width: 100%;

    .custom-icon {
      color: #409eff;
      margin-right: 8px;
    }

    .custom-text {
      flex: 1;
    }

    .custom-time {
      font-size: 12px;
      color: #909399;
    }
  }

  .custom-css-form {
    margin-top: 10px;
  }

  .applied-styles {
    margin-top: 10px;
  }

  .style-title {
    margin-bottom: 10px;
    font-weight: bold;
  }

  .style-tag {
    margin-right: 5px;
    margin-bottom: 5px;
  }

  .real-world-container {
    margin-top: 15px;
  }

  .customer-service-panel {
    border: 1px solid #ebeef5;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .panel-header {
    background-color: #409eff;
    color: #fff;
    padding: 15px 20px;

    h4 {
      margin: 0;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .online-badge {
      background-color: #67c23a;
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 10px;
    }
  }

  .panel-body {
    display: flex;
    height: 600px;
  }

  .sidebar {
    width: 300px;
    border-right: 1px solid #ebeef5;
    display: flex;
    flex-direction: column;
  }

  .search-bar {
    padding: 10px;
    border-bottom: 1px solid #ebeef5;
  }

  .conversation-list {
    flex: 1;
    overflow-y: auto;
    position: relative;
  }

  .conversation-loading {
    text-align: center;
    padding: 15px 0;
    color: #909399;
    font-size: 14px;

    i {
      margin-right: 5px;
    }
  }

  .no-more-conversations {
    text-align: center;
    padding: 12px 0;
    color: #909399;
    font-size: 12px;
    border-top: 1px dashed #ebeef5;
  }

  .service-item {
    display: flex;
    align-items: center;
    padding: 8px 0;
    width: 100%;
  }

  .user-avatar {
    position: relative;
    margin-right: 12px;

    &.has-badge {
      ::v-deep .el-avatar {
        border: 2px solid #67c23a;
      }
    }

    .unread-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: #f56c6c;
      color: #fff;
      font-size: 12px;
      min-width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      border-radius: 9px;
      padding: 0 4px;
    }
  }

  .user-info {
    flex: 1;
    overflow: hidden;
  }

  .user-name-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .user-name {
    font-weight: 500;
    color: #303133;
  }

  .message-time {
    font-size: 12px;
    color: #909399;
  }

  .last-message {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #606266;
    font-size: 13px;

    &.is-unread {
      color: #303133;
      font-weight: 500;
    }
  }

  .chat-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f5f7fa;
  }

  .chat-header {
    padding: 15px 20px;
    border-bottom: 1px solid #ebeef5;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chat-title {
    font-weight: 500;
    display: flex;
    align-items: center;

    .user-status {
      margin-left: 10px;
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 10px;
      background-color: #909399;
      color: #fff;

      &.is-online {
        background-color: #67c23a;
      }
    }
  }

  .header-actions {
    display: flex;
    gap: 10px;
  }

  .chat-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }

  .chat-message-placeholder {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .welcome-message {
    width: 90%;
    max-width: 600px;
  }

  .customer-info {
    margin-top: 20px;
    background-color: #fff;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    h4 {
      margin-top: 0;
      margin-bottom: 10px;
      color: #409eff;
      font-size: 14px;
    }

    p {
      margin: 8px 0;
      font-size: 13px;
    }
  }

  .quick-replies {
    margin-top: 20px;
    background-color: #f9fafc;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

    h4 {
      margin-top: 0;
      margin-bottom: 15px;
      color: #409eff;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;

      &:before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 16px;
        background: #409eff;
        margin-right: 8px;
        border-radius: 2px;
      }
    }
  }

  .quick-reply-item {
    &:hover {
      background-image: linear-gradient(137deg, #d0ebff 0%, #e4daff 100%) !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
    }

    &:active {
      background-image: linear-gradient(137deg, #c5e5ff 0%, #d9caff 100%) !important;
      transform: translateY(0) !important;
    }

    .el-x-prompts-label {
      font-weight: 600;
      margin-bottom: 4px;
      font-size: 14px;
    }

    .el-x-prompts-desc {
      font-size: 12px;
      color: #606266;
      margin: 0;
      line-height: 1.4;
    }
  }

  .chat-input {
    border-top: 1px solid #ebeef5;
    background-color: #fff;
    padding: 10px 20px;
  }

  .input-tools {
    margin-bottom: 10px;
    display: flex;
    gap: 15px;

    i {
      font-size: 18px;
      color: #606266;
      cursor: pointer;

      &:hover {
        color: #409eff;
      }
    }
  }

  .send-btn {
    margin-top: 10px;
    text-align: right;
  }

  .empty-chat {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #909399;

    i {
      font-size: 60px;
      margin-bottom: 20px;
    }

    p {
      font-size: 16px;
    }
  }

  /* 虚拟滚动测试样式 */
  .virtual-scroll-test {
    .control-section {
      margin-bottom: 20px;
      padding: 15px;
      background-color: #f9f9f9;
      border-radius: 4px;
    }

    .test-container {
      border: 1px solid #ebeef5;
      border-radius: 4px;
      margin: 15px 0;
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

  /* 自定义滚动控制面板样式 */
  .custom-scroll-controls {
    margin-top: 15px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 4px;
    border-left: 4px solid #409eff;

    h4 {
      margin-top: 0;
      margin-bottom: 10px;
      color: #409eff;
      font-size: 14px;
    }
  }

  /* 性能监控面板样式 */
  .performance-monitor {
    margin-top: 15px;
    padding: 15px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    color: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

    h4 {
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 16px;
      text-align: center;
    }

    .performance-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 10px;
      margin-bottom: 15px;
    }

    .performance-item {
      background: rgba(255, 255, 255, 0.1);
      padding: 8px 12px;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      backdrop-filter: blur(10px);

      .label {
        font-size: 12px;
        opacity: 0.9;
      }

      .value {
        font-weight: bold;
        font-size: 14px;

        &.warning {
          color: #ffa726;
        }

        &.danger {
          color: #ef5350;
        }
      }
    }

    .performance-actions {
      text-align: center;

      .el-button {
        margin: 0 5px;
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;

        &:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }

  /* 滚动高亮动画 */
  @keyframes scrollHighlight {
    0% {
      background-color: transparent;
    }
    50% {
      background-color: rgba(64, 158, 255, 0.2);
    }
    100% {
      background-color: transparent;
    }
  }

  .scroll-highlight {
    animation: scrollHighlight 0.5s ease-in-out;
  }
</style>
