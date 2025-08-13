<template>
  <div>
    <div id="share-banner">
      您正在浏览基于 Vue 2.x + Element-UI-X 的文档;
      <a href="https://element-plus-x.com/">点我查看Element Plus X（Vue3）👏🏻</a>
    </div>

    <div class="custom-home">
      <!-- Hero Section -->
      <div class="custom-hero has-image">
        <div class="container">
          <div class="main">
            <h1 class="heading">
              <span class="name clip">Element-UI-X</span>
              <span class="text">Vue2 的 AI 组件救星</span>
            </h1>
            <p class="tagline">
              别再羡慕 Vue3 有那么多 AI 组件了，Vue2 也能玩转对话框、打字机效果。
              复制粘贴就能用，老项目救星就是我 🎯
            </p>
            <div class="actions">
              <div class="action">
                <el-button
                  type="primary"
                  size="medium"
                  @click="navigateTo('/components/typewriter/')"
                >
                  🎉 来抄代码
                </el-button>
              </div>
              <div class="action preview-dropdown">
                <div class="dropdown-container">
                  <el-button
                    size="medium"
                    class="dropdown-trigger"
                  >
                    👀 康康效果
                    <i class="el-icon-arrow-down"></i>
                  </el-button>
                  <div class="dropdown-menu">
                    <div
                      class="dropdown-item"
                      @click="openLink('https://demo.element-ui-x.com/')"
                    >
                      <i class="el-icon-monitor"></i>
                      <span>Demo 演示</span>
                    </div>
                    <div
                      class="dropdown-item"
                      @click="openLink('https://storybook.element-ui-x.com/')"
                    >
                      <i class="el-icon-document"></i>
                      <span>Storybook</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="action">
                <el-button
                  size="medium"
                  @click="openLink('https://github.com/worryzyy/element-ui-x.git')"
                >
                  ⭐star支持
                </el-button>
              </div>
            </div>
          </div>
          <div class="image">
            <div class="image-container">
              <div class="image-bg"></div>
              <img
                class="image-src"
                src="/images/logo.png"
                alt="Element-UI-X"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Vue2 AI Project Section -->
      <div class="vue2-ai-section">
        <div class="container">
          <div class="content-box">
            <h2 class="section-title">还在用 Vue2?</h2>
            <div class="description">
              <p>别人都升 Vue3 了，但你的项目还在 Vue2？没关系，我也是过来人 😄</p>
              <div class="real-talk">
                <div class="pain-point">
                  <h3>🤦‍♂️ 老项目的痛</h3>
                  <p>想加个 AI 对话框，结果找到的组件库都是 Vue3 的</p>
                </div>
                <div class="solution">
                  <h3>💡 救星来了</h3>
                  <p>这个库专门为 Vue2 老项目而生，复制粘贴就能用</p>
                </div>
              </div>
              <div class="feature-list">
                <span class="tag">和 Element-UI 无缝配合</span>
                <span class="tag">打字机效果超丝滑</span>
                <span class="tag">不用重构老代码</span>
              </div>
              <p class="bottom-text">让你的老项目也能玩转 AI，不服来试试 👊</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Features Section -->
      <div class="custom-features">
        <div class="container">
          <div class="items">
            <div
              class="item grid-3"
              v-for="(feature, index) in features"
              :key="index"
            >
              <div class="feature-box">
                <article class="box">
                  <h2 class="title">{{ feature.title }}</h2>
                  <p class="details">{{ feature.details }}</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Acknowledgment Section -->
      <div class="acknowledgment">
        <div class="container">
          <p class="thanks-text">
            特别感谢
            <a
              href="https://github.com/HeJiaYue520/Element-Plus-X"
              target="_blank"
              class="repo-link"
            >
              @Element-Plus-X
            </a>
            提供优秀的开源项目支持
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Hero',
    data() {
      return {
        features: [
          {
            title: '🎯 继承优秀设计',
            details: '基于 Element Plus X 的成熟设计理念',
          },
          {
            title: '⚡ Vue2 无缝接入',
            details:
              '完全兼容 Vue2 项目，无需额外配置，一键安装即可使用。与 Element-UI 完美融合，老项目升级无压力',
          },
          {
            title: '✨ 组件丰富，选用自如',
            details: '大量实用组件满足你的需求 , 灵活定制与拓展',
          },
        ],
      };
    },
    methods: {
      navigateTo(path) {
        this.$router.push(path);
      },
      openLink(url) {
        window.open(url, '_blank');
      },
    },
  };
</script>

<style lang="scss" scoped>
  // 动画定义
  @keyframes borderSlide {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 0% 100%;
    }
  }

  #share-banner {
    width: 100vw;
    min-height: 30px;
    background-color: #409eff;
    color: #606266;
    text-align: center;
    font-size: 14px;
    position: fixed;
    top: 58px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom: 1px solid #e4e7ed;
    z-index: 9;
    line-height: 30px;
    color: #eee;

    a {
      color: #ffffff;
      text-decoration: none;
      margin: 0 4px;

      &:hover {
        color: #ffffff;
      }
    }
  }

  .custom-home {
    padding-top: 10px;

    .custom-hero {
      &.has-image {
        .container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
      }

      .container {
        margin: 0 auto;
        padding: 0 16px;
        margin-bottom: 8px;
      }

      .main {
        flex: 1;
        max-width: 592px;
      }

      .heading {
        margin-bottom: 8px;

        .name {
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(120deg, #409eff, #ff2485, #ff951a, #5614f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.2;
        }

        .text {
          display: block;
          font-size: 24px;
          font-weight: 400;
          color: #303133;
          line-height: 1.2;
        }
      }

      .tagline {
        font-size: 18px;
        color: #606266;
        margin: 8px 0;
        line-height: 1.6;
      }

      .actions {
        display: flex;
        gap: 8px;

        .action {
          margin-right: 8px;
        }

        .preview-dropdown {
          position: relative;

          .dropdown-container {
            position: relative;
            display: inline-block;

            &::after {
              content: '';
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              height: 8px;
              background: transparent;
              z-index: 999;
            }

            .dropdown-trigger {
              display: flex;
              align-items: center;
              gap: 6px;
              transition: all 0.3s ease;

              .el-icon-arrow-down {
                font-size: 12px;
                transition: transform 0.3s ease;
              }

              &:hover {
                box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
              }
            }

            .dropdown-menu {
              position: absolute;
              top: calc(100% + 4px);
              left: 0;
              min-width: 180px;
              background: #fff;
              border: 1px solid #e4e7ed;
              border-radius: 8px;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
              z-index: 1000;
              opacity: 0;
              visibility: hidden;
              transform: translateY(-20px) scaleY(0.8);
              transform-origin: top center;
              transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
              overflow: hidden;

              &::before {
                content: '';
                position: absolute;
                top: -8px;
                left: 20px;
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-bottom: 8px solid #fff;
                filter: drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.1));
              }

              .dropdown-item {
                padding: 14px 18px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                color: #606266;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.3s ease;
                border-bottom: 1px solid #f5f7fa;
                position: relative;
                overflow: hidden;

                &::before {
                  content: '';
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 0;
                  height: 100%;
                  background: linear-gradient(
                    90deg,
                    rgba(64, 158, 255, 0.1),
                    rgba(64, 158, 255, 0.05)
                  );
                  transition: width 0.3s ease;
                  z-index: 0;
                }

                &:hover {
                  color: #409eff;
                  background: rgba(64, 158, 255, 0.03);
                  transform: translateX(4px);

                  &::before {
                    width: 100%;
                  }
                }

                &:last-child {
                  border-bottom: none;
                }

                i {
                  font-size: 16px;
                  transition: transform 0.3s ease;
                  z-index: 1;
                  position: relative;
                }

                span {
                  z-index: 1;
                  position: relative;
                }

                &:hover i {
                  transform: scale(1.1);
                }
              }
            }

            &:hover {
              .dropdown-trigger .el-icon-arrow-down {
                transform: rotate(180deg);
              }

              .dropdown-menu {
                opacity: 1;
                visibility: visible;
                transform: translateY(0) scaleY(1);
              }
            }
          }
        }
      }

      .image {
        flex: 1;
        max-width: 480px;

        .image-container {
          position: relative;

          .image-bg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 310px;
            height: 310px;
            background: radial-gradient(
              circle,
              rgba(64, 158, 255, 0.1) 0%,
              rgba(64, 158, 255, 0) 60%
            );
            border-radius: 50%;
          }

          .image-src {
            position: relative;
            width: 100%;
            height: auto;
          }
        }
      }
    }
    .vue2-ai-section {
      padding: 3rem 0;

      .container {
        max-width: 1200px;
        margin: 0 auto;
      }

      .content-box {
        background: #fff;
        border-radius: 8px;
        padding: 1rem 2rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border: 1px solid #e4e7ed;
      }
    }

    .section-title {
      font-size: 2.2rem;
      font-weight: 700;
      background: linear-gradient(120deg, #409eff, #79bbff, #409eff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
      margin-bottom: 1rem;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 3px;
        background: linear-gradient(90deg, #409eff, #79bbff);
        border-radius: 2px;
      }
    }

    .description {
      max-width: 900px;
      margin: 0 auto;

      > p {
        font-size: 1.1rem;
        line-height: 1.8;
        color: #2c3e50;
        text-align: center;
        margin-bottom: 2rem;
      }

      .real-talk {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin: 2rem 0;

        .pain-point,
        .solution {
          background: rgba(255, 255, 255, 0.8);
          padding: 1.5rem;
          border-radius: 16px;
          text-align: left;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;

          h3 {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            color: #2c3e50;
          }

          p {
            font-size: 1rem;
            color: #606266;
            line-height: 1.6;
            margin: 0;
          }

          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(64, 158, 255, 0.1);
          }

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(
              to bottom,
              var(--border-color) 0%,
              transparent 30%,
              transparent 70%,
              var(--border-color) 100%
            );
            background-size: 100% 50%;
            animation: borderSlide 2s linear infinite;
          }
        }

        .pain-point {
          --border-color: #f56c6c;
        }

        .solution {
          --border-color: #67c23a;
        }
      }

      .feature-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.8rem;
        margin: 2rem 0;

        .tag {
          background: linear-gradient(135deg, #409eff, #79bbff);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: default;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(64, 158, 255, 0.3);
          }
        }
      }

      .bottom-text {
        font-size: 1.1rem;
        font-weight: 600;
        text-align: center;
        color: #409eff;
        margin-top: 1.5rem !important;
      }

      @media (max-width: 768px) {
        .real-talk {
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .feature-list {
          gap: 0.5rem;

          .tag {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
        }
      }
    }

    .highlight-text {
      font-size: 1.2rem;
      font-weight: 600;
      text-align: center;
      background: linear-gradient(120deg, #409eff, #79bbff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-top: 1rem !important;
      position: relative;

      &::before {
        content: '✨';
        margin-right: 0.5rem;
      }
    }
    .custom-features {
      .container {
        max-width: 1200px;
        margin: 0 auto;
      }

      .items {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 0;
      }

      .feature-box {
        background: #fff;
        border-radius: 8px;
        padding: 2rem;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border: 1px solid #e4e7ed;

        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .details {
          font-size: 1rem;
          color: #606266;
          line-height: 1.6;
        }
      }
    }

    .acknowledgment {
      padding-top: 16px;
      text-align: center;

      .container {
        margin: 0 auto;
      }

      .thanks-text {
        font-size: 14px;
        color: #606266;
        line-height: 1.6;

        .repo-link {
          color: #409eff;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;

          &:hover {
            color: #79bbff;
          }
        }
      }

      @media (max-width: 768px) {
        padding: 16px 0;
      }
    }
  }

  // 响应式设计
  @media (max-width: 768px) {
    .custom-home {
      .custom-hero {
        &.has-image {
          .container {
            flex-direction: column;
            text-align: center;
          }
        }

        .heading {
          .name {
            font-size: 48px;
          }

          .text {
            font-size: 32px;
          }
        }

        .actions {
          justify-content: center;
          flex-wrap: wrap;

          .preview-dropdown .dropdown-container {
            .dropdown-menu {
              left: 50%;
              transform: translateX(-50%) translateY(-20px) scaleY(0.8);
              min-width: 160px;

              &::before {
                left: 50%;
                transform: translateX(-50%);
              }
            }

            &:hover .dropdown-menu {
              transform: translateX(-50%) translateY(0) scaleY(1);
            }
          }
        }

        .image {
          margin-top: 32px;
        }
      }

      .custom-features {
        padding: 2rem 0;

        .container {
          padding: 0 1rem;
        }

        .items {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .feature-box {
          padding: 1.5rem;

          &:hover {
            transform: translateY(-2px);
          }

          .title {
            font-size: 1.2rem;
          }

          .details {
            font-size: 0.9rem;
          }
        }
      }

      .vue2-ai-section {
        padding: 2rem 0;

        .container {
          padding: 0 1rem;
        }

        .content-box {
          padding: 1.5rem;
        }

        .section-title {
          font-size: 1.8rem;
        }

        .description .real-talk {
          grid-template-columns: 1fr;
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 992px) {
    .custom-features {
      padding: 2rem 0;

      .container {
        padding: 0 1.5rem;
      }

      .items {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }

      .feature-box {
        padding: 1.75rem;
      }
    }
  }
</style>
