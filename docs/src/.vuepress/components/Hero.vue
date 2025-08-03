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
              <span class="text">AI体验新秩序</span>
            </h1>
            <p class="tagline">
              开箱即用的企业级 AI 交互组件库，让构建智能界面像搭积木一样简单。 RICH
              设计范式，打造卓越 AI 界面解决方案，引领智能新体验。
            </p>
            <div class="actions">
              <div class="action">
                <el-button
                  type="primary"
                  size="medium"
                  @click="navigateTo('/components/typewriter/')"
                >
                  ✨开始使用
                </el-button>
              </div>
              <div class="action preview-dropdown">
                <div class="dropdown-container">
                  <el-button
                    size="medium"
                    class="dropdown-trigger"
                  >
                    👉在线预览
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
            <h2 class="section-title">适用于 Vue2 的 AI 应用开发</h2>
            <div class="description">
              <p>如果您正在使用 Vue2 开发 AI 应用，Element-UI-X 将是您的理想选择：</p>
              <ul>
                <li>完全兼容 Vue2 生态系统</li>
                <li>基于成熟稳定的 Element-UI</li>
                <li>提供丰富的 AI 交互组件</li>
                <li>开箱即用的 Dify API 集成</li>
              </ul>
              <p class="highlight-text">为您的 AI 应用注入无限创新可能</p>
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
            title: '复刻经典',
            details: '基于Element Plus X ',
          },
          {
            title: '高性能 灵活性兼备',
            details:
              '精心优化的代码结构，保证组件高性能运行，同时支持高度自定义，适配各种复杂业务逻辑。',
          },
          {
            title: '可视化交互 体验升级',
            details:
              '打字器雾化动画、自动滚动、加载效果、等细节满满，为用户带来生动的可视化体验，增强应用交互性和吸引力。',
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
      position: relative;
      padding: 2rem 0;
      background: linear-gradient(
        135deg,
        rgba(64, 158, 255, 0.1) 0%,
        rgba(121, 187, 255, 0.08) 50%,
        rgba(64, 158, 255, 0.06) 100%
      );
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(
            circle at 20% 80%,
            rgba(64, 158, 255, 0.1) 0%,
            transparent 50%
          ),
          radial-gradient(circle at 80% 20%, rgba(121, 187, 255, 0.08) 0%, transparent 50%);
        pointer-events: none;
      }

      .container {
        position: relative;
        z-index: 1;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
      }

      .content-box {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        padding: 1.5rem;
        box-shadow: 0 8px 32px rgba(64, 158, 255, 0.1), 0 2px 16px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.2);
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

      p {
        font-size: 1.1rem;
        line-height: 1.8;
        color: #2c3e50;
        // margin-bottom: 1.5rem;
        text-align: center;
      }

      ul {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1rem;
        list-style: none;
        padding: 0;
        margin: 2rem 0;
      }

      li {
        background: rgba(64, 158, 255, 0.05);
        padding: 1rem 0.5rem;
        border-radius: 12px;
        border-left: 4px solid #409eff;
        position: relative;
        transition: all 0.3s ease;
        font-size: 1.1rem;
        color: #2c3e50;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(64, 158, 255, 0.15);
        }

        &::before {
          content: '🚀';
          margin-right: 0.5rem;
          font-size: 1.1rem;
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
      position: relative;
      padding: 2rem 0;
      margin-top: 1rem;
      background: linear-gradient(
        135deg,
        rgba(64, 158, 255, 0.12) 0%,
        rgba(64, 158, 255, 0.08) 50%,
        rgba(121, 187, 255, 0.06) 100%
      );
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(
            circle at 80% 20%,
            rgba(64, 158, 255, 0.1) 0%,
            transparent 60%
          ),
          radial-gradient(circle at 20% 80%, rgba(121, 187, 255, 0.08) 0%, transparent 60%);
        pointer-events: none;
      }

      .container {
        position: relative;
        z-index: 1;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
      }

      .items {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        padding: 0;
      }

      .feature-box {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(15px);
        border-radius: 20px;
        padding: 2rem;
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow: 0 10px 40px rgba(64, 158, 255, 0.1), 0 4px 20px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.3);
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #409eff, #79bbff, #409eff);
        }

        &:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 60px rgba(64, 158, 255, 0.15), 0 8px 30px rgba(0, 0, 0, 0.1);
        }

        .title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;

          &::before {
            content: '';
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #409eff, #79bbff);
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(64, 158, 255, 0.5);
          }
        }

        .details {
          font-size: 1rem;
          color: #606266;
          line-height: 1.7;
          padding-left: 1.75rem;
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
        padding: 1rem 0;

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
            transform: translateY(-4px);
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

        .description ul {
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
