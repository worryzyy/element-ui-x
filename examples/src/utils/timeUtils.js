/**
 * 时间处理工具函数
 */

/**
 * 根据时间获取分组标签
 * @param {string|Date|number} dateTime - 时间字符串、Date对象或Unix时间戳
 * @returns {string} 分组标签：今天、7天内、30天内、yyyy-MM
 */
export function getTimeGroup(dateTime) {
  // 处理Unix时间戳（秒）
  let createdAt;
  if (typeof dateTime === 'number') {
    // Unix时间戳通常是秒，需要转换为毫秒
    createdAt = new Date(dateTime * 1000);
  } else {
    createdAt = new Date(dateTime);
  }

  const now = new Date();
  const diffTime = now - createdAt;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return '今天';
  } else if (diffDays <= 7) {
    return '7天内';
  } else if (diffDays <= 30) {
    return '30天内';
  } else {
    // 格式化为 yyyy-MM
    const year = createdAt.getFullYear();
    const month = String(createdAt.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }
}

/**
 * 批量为数据项添加时间分组字段
 * @param {Array} items - 数据项数组
 * @param {string} timeField - 时间字段名，默认为'created_at'
 * @returns {Array} 添加了group字段的数据项数组
 */
export function addTimeGroupToItems(items, timeField = 'created_at') {
  return items.map(item => ({
    ...item,
    group: getTimeGroup(item[timeField]),
  }));
}

/**
 * 格式化时间为可读格式
 * @param {string|Date|number} dateTime - 时间字符串、Date对象或Unix时间戳
 * @param {string} format - 格式化模式，默认为'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的时间字符串
 */
export function formatTime(dateTime, format = 'YYYY-MM-DD HH:mm:ss') {
  // 处理Unix时间戳（秒）
  let date;
  if (typeof dateTime === 'number') {
    // Unix时间戳通常是秒，需要转换为毫秒
    date = new Date(dateTime * 1000);
  } else {
    date = new Date(dateTime);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}
