/**
 * 自定义 markdown-it mermaid 插件
 * 直接集成 mermaid，无需依赖第三方插件
 * 支持异步渲染和错误处理
 */

let mermaidCounter = 0;
const pendingRenders = new Map();

function markdownItMermaidPlugin(md) {
  const fence =
    md.renderer.rules.fence ||
    function (tokens, idx, options, env, renderer) {
      return renderer.renderToken(tokens, idx, options);
    };

  md.renderer.rules.fence = function (tokens, idx, options, env, renderer) {
    const token = tokens[idx];
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : '';
    const langName = info.split(/\s+/g)[0];

    if (langName === 'mermaid') {
      const mermaidId = `mermaid-${++mermaidCounter}`;
      const code = token.content.trim();

      // 创建容器元素
      const containerHtml = `<div class="mermaid-container" id="${mermaidId}" data-mermaid-code="${encodeURIComponent(
        code,
      )}">
        <div class="mermaid-loading">正在加载图表...</div>
      </div>`;

      // 延迟渲染，确保 DOM 已插入
      scheduleRender(mermaidId, code);

      return containerHtml;
    }

    return fence(tokens, idx, options, env, renderer);
  };
}

function scheduleRender(containerId, code) {
  // 添加到待渲染队列
  pendingRenders.set(containerId, code);

  // 使用 requestAnimationFrame 确保在下一个渲染帧执行
  requestAnimationFrame(() => {
    renderMermaidDiagram(containerId, code);
  });
}

async function renderMermaidDiagram(containerId, code) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Mermaid container #${containerId} not found`);
    return;
  }

  // 检查 mermaid 是否可用
  if (typeof window.mermaid === 'undefined') {
    showError(container, 'Mermaid 库未加载');
    return;
  }

  try {
    // 配置 mermaid（如果还未配置）
    if (!window.mermaid.initialized) {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily:
          '"Helvetica Neue", Arial, "Hiragino Sans GB", "STHeiti", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
      });
      window.mermaid.initialized = true;
    }

    // 创建临时元素用于渲染
    const tempDiv = document.createElement('div');
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.position = 'absolute';
    tempDiv.innerHTML = `<div class="mermaid">${code}</div>`;
    document.body.appendChild(tempDiv);

    // 渲染图表
    await window.mermaid.init(undefined, tempDiv.querySelector('.mermaid'));

    // 获取渲染结果并插入到容器中
    const renderedContent = tempDiv.querySelector('.mermaid').innerHTML;
    container.innerHTML = `<div class="mermaid">${renderedContent}</div>`;

    // 清理临时元素
    document.body.removeChild(tempDiv);

    // 从待渲染队列中移除
    pendingRenders.delete(containerId);
  } catch (error) {
    console.error('Mermaid rendering error:', error);
    showError(container, `渲染图表时出错: ${error.message}`);
  }
}

function showError(container, message) {
  container.innerHTML = `<div class="mermaid-error">${message}</div>`;
}

// 重新渲染所有待处理的图表（用于组件更新后）
function rerenderAll() {
  const entries = Array.from(pendingRenders.entries());
  pendingRenders.clear();

  entries.forEach(([containerId, code]) => {
    scheduleRender(containerId, code);
  });

  // 同时处理已经存在但可能需要重新渲染的容器
  document.querySelectorAll('.mermaid-container[data-mermaid-code]').forEach(container => {
    const code = decodeURIComponent(container.dataset.mermaidCode);
    if (code && !container.querySelector('.mermaid svg')) {
      scheduleRender(container.id, code);
    }
  });
}

// 导出插件和工具函数
export default markdownItMermaidPlugin;
export { renderMermaidDiagram, rerenderAll };

// 全局可用
if (typeof window !== 'undefined') {
  window.markdownItMermaidPlugin = markdownItMermaidPlugin;
  window.renderMermaidDiagram = renderMermaidDiagram;
  window.rerenderAllMermaid = rerenderAll;
}
