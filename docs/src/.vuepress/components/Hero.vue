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
  @import '~element-ui/packages/theme-chalk/src/common/var';

  #share-banner {
    width: 100vw;
    min-height: 30px;
    background-color: $--color-primary;
    color: $--color-text-regular;
    text-align: center;
    font-size: 14px;
    position: fixed;
    top: 58px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom: 1px solid $--border-color-light;
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
        padding: 0 $--size-base * 2;
        margin-bottom: $--size-base;
      }

      .main {
        flex: 1;
        max-width: 592px;
      }

      .heading {
        margin-bottom: $--size-base;

        .name {
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(120deg, $--color-primary, #ff2485, #ff951a, #5614f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.2;
        }

        .text {
          display: block;
          font-size: 24px;
          font-weight: 400;
          color: $--color-text-primary;
          line-height: 1.2;
        }
      }

      .tagline {
        font-size: 18px;
        color: $--color-text-regular;
        margin: $--size-base 0;
        line-height: 1.6;
      }

      .actions {
        display: flex;
        gap: $--size-base;

        .action {
          margin-right: $--size-base;
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
              rgba($--color-primary, 0.1) 0%,
              rgba($--color-primary, 0) 60%
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
        gap: $--size-base * 2;
        padding: 0 $--size-base;
      }

      .feature-box {
        background-color: $--background-color-base;
        border-radius: $--border-radius-base;
        padding: $--size-base $--size-base * 2;
        transition: all 0.3s ease;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 600px;
        margin: 0 auto;

        @media (max-width: $--sm) {
          max-width: 100%;
          margin: 0;
          padding: $--size-base;

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
          color: $--color-text-primary;
          margin-bottom: $--size-base * 1.5;
          display: flex;
          align-items: center;
          gap: $--size-base;

          @media (max-width: $--sm) {
            font-size: 16px;
            margin-bottom: $--size-base;
          }

          &::before {
            content: '';
            width: 4px;
            height: 20px;
            background: $--color-primary;
            border-radius: 2px;

            @media (max-width: $--sm) {
              height: 16px;
            }
          }
        }

        .details {
          font-size: 14px;
          color: $--color-text-regular;
          line-height: 1.8;
          padding-left: $--size-base + 4px;

          @media (max-width: $--sm) {
            font-size: 13px;
            line-height: 1.6;
            padding-left: $--size-base + 2px;
          }
        }
      }
    }

    .acknowledgment {
      padding-top: $--size-base * 2;
      text-align: center;

      .container {
        margin: 0 auto;
      }

      .thanks-text {
        font-size: 14px;
        color: $--color-text-regular;
        line-height: 1.6;

        .repo-link {
          color: $--color-primary;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;

          &:hover {
            color: $--color-primary-light-3;
          }
        }
      }

      @media (max-width: $--sm) {
        padding: $--size-base * 2 0;
      }
    }
  }

  // 响应式设计
  @media (max-width: $--sm) {
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
          margin-top: $--size-base * 4;
        }
      }

      .custom-features {
        .items {
          grid-template-columns: 1fr;
        }
      }
    }
  }

  @media (min-width: $--sm) and (max-width: $--lg) {
    .custom-features {
      .items {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
</style>
