// 自动导入 SVG 图标
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('@/assets/svg', false, /\.svg$/);
requireAll(req);

// 获取所有图标名称
export function getIconNames() {
  return req.keys().map(key => {
    const name = key.replace(/^\.\/(.+)\.svg$/, '$1');
    return name;
  });
}

// 检查图标是否存在
export function hasIcon(name) {
  return getIconNames().includes(name);
}
