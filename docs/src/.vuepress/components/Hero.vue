<template>
  <div>
    <div id="share-banner">
      您正在浏览基于 Vue 2.x + Element UI 的文档;
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
              <div class="action">
                <el-button
                  size="medium"
                  @click="openLink('https://demo.element-ui-x.com')"
                >
                  👉在线预览
                </el-button>
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
            title: '复刻经典 推陈出新',
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

    .custom-features {
      .container {
        margin: 0 auto;
      }

      .items {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 0 8px;
      }

      .feature-box {
        background-color: #f5f7fa;
        border-radius: 4px;
        padding: 8px 16px;
        transition: all 0.3s ease;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 600px;
        margin: 0 auto;

        @media (max-width: 768px) {
          max-width: 100%;
          margin: 0;
          padding: 8px;

          &:hover {
            transform: none;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.15);
          }
        }

        &:hover {
          transform: translateX(10px);
          box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
        }

        .title {
          font-size: 20px;
          font-weight: 600;
          color: #303133;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;

          @media (max-width: 768px) {
            font-size: 16px;
            margin-bottom: 8px;
          }

          &::before {
            content: '';
            width: 4px;
            height: 20px;
            background: #409eff;
            border-radius: 2px;

            @media (max-width: 768px) {
              height: 16px;
            }
          }
        }

        .details {
          font-size: 14px;
          color: #606266;
          line-height: 1.8;
          padding-left: 12px;

          @media (max-width: 768px) {
            font-size: 13px;
            line-height: 1.6;
            padding-left: 10px;
          }
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
        }

        .image {
          margin-top: 32px;
        }
      }

      .custom-features {
        .items {
          grid-template-columns: 1fr;
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 992px) {
    .custom-features {
      .items {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
</style>
