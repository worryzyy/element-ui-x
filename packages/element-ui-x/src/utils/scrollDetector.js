export default function createScrollDetector(elementRef) {
  const state = {
    hasVertical: false,
    hasHorizontal: false,
  };

  const check = () => {
    const el = elementRef.value || elementRef;
    if (!el) return;
    state.hasVertical = el.scrollHeight > el.clientHeight;
    state.hasHorizontal = el.scrollWidth > el.clientWidth;
  };

  let observer = null;

  const init = () => {
    check();
    observer = new ResizeObserver(check);
    observer.observe(elementRef.value || elementRef);
  };

  const destroy = () => {
    if (observer) {
      observer.disconnect();
    }
  };

  return {
    state, // 包含hasVertical和hasHorizontal状态
    check, // 检查滚动条状态
    init, // 初始化监听
    destroy, // 销毁监听
  };
}
