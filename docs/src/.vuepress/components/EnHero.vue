<template>
  <div>
    <div id="share-banner">
      You are browsing the documentation based on Vue 2.x + Element-UI-X;
      <a href="https://element-plus-x.com/">Click here to view Element Plus X (Vue3) 👏🏻</a>
    </div>

    <div class="custom-home">
      <!-- Hero Section -->
      <div class="custom-hero has-image">
        <div class="container">
          <div class="main">
            <h1 class="heading">
              <span class="name clip">Element-UI-X</span>
              <span class="text">New Order of AI Experience</span>
            </h1>
            <p class="tagline">
              An out-of-the-box enterprise-level AI interaction component library that makes
              building intelligent interfaces as simple as building blocks. RICH design paradigm,
              creating excellent AI interface solutions and leading intelligent new experiences.
            </p>
            <div class="actions">
              <div class="action">
                <el-button
                  type="primary"
                  size="medium"
                  @click="navigateTo('/components/typewriter/')"
                >
                  ✨Get Started
                </el-button>
              </div>
              <div class="action">
                <el-button
                  size="medium"
                  @click="openLink('https://demo.element-ui-x.com')"
                >
                  👉Live Preview
                </el-button>
              </div>
              <div class="action">
                <el-button
                  size="medium"
                  @click="openLink('https://github.com/worryzyy/element-ui-x.git')"
                >
                  ⭐Star
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
            <h2 class="section-title">AI Application Development for Vue2</h2>
            <div class="description">
              <p>
                If you are developing AI applications using Vue2, Element-UI-X will be your ideal
                choice:
              </p>
              <ul>
                <li>Fully compatible with Vue2 ecosystem</li>
                <li>Based on mature and stable Element-UI</li>
                <li>Provides rich AI interaction components</li>
                <li>Out-of-the-box Dify API integration</li>
              </ul>
              <p class="highlight-text">
                Inject unlimited innovation possibilities into your AI applications
              </p>
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
            Special thanks to
            <a
              href="https://github.com/HeJiaYue520/Element-Plus-X"
              target="_blank"
              class="repo-link"
            >
              @Element-Plus-X
            </a>
            for providing excellent open source project support
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
            title: 'Classic Replication',
            details: 'Based on Element Plus X ',
          },
          {
            title: 'High Performance & Flexibility',
            details:
              'Carefully optimized code structure ensures high-performance component operation while supporting high customization to adapt to various complex business logic.',
          },
          {
            title: 'Visual Interaction & Experience Upgrade',
            details:
              'Typewriter atomization animation, auto-scrolling, loading effects, and other details provide users with vivid visual experiences, enhancing application interactivity and appeal.',
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
