/**
 * 判断文件类型是否为图片
 * @param {string} type 文件类型
 * @returns {boolean} 是否为图片类型
 */
export const isImageFileType = type => type.indexOf('image/') === 0;

const MEASURE_SIZE = 200;

/**
 * 预览图片文件并生成预览URL
 * @param {File|Blob} file 图片文件对象
 * @returns {Promise<string>} 返回图片预览URL的Promise
 */
export function previewImage(file) {
  return new Promise(resolve => {
    if (!file || !file.type || !isImageFileType(file.type)) {
      resolve('');
      return;
    }

    const img = new Image();
    img.onload = () => {
      const { width, height } = img;

      const ratio = width / height;
      const MEASURE_SIZE_WIDTH = ratio > 1 ? MEASURE_SIZE : MEASURE_SIZE * ratio;
      const MEASURE_SIZE_HEIGHT = ratio > 1 ? MEASURE_SIZE / ratio : MEASURE_SIZE;

      const canvas = document.createElement('canvas');
      canvas.width = MEASURE_SIZE_WIDTH;
      canvas.height = MEASURE_SIZE_HEIGHT;
      canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE_WIDTH}px; height: ${MEASURE_SIZE_HEIGHT}px; z-index: 9999; display: none;`;
      document.body.appendChild(canvas);
      const ctx = canvas.getContext('2d');

      ctx.drawImage(img, 0, 0, MEASURE_SIZE_WIDTH, MEASURE_SIZE_HEIGHT);
      const dataURL = canvas.toDataURL();
      document.body.removeChild(canvas);
      window.URL.revokeObjectURL(img.src);
      resolve(dataURL);
    };

    img.crossOrigin = 'anonymous';
    if (file.type.startsWith('image/svg+xml')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          img.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('image/gif')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      img.src = window.URL.createObjectURL(file);
    }
  });
}

/**
 * 根据文件后缀名获取文件类型
 * @param {string} fileExtension 文件后缀名
 * @returns {{lowerCase: string, upperCase: string}} 返回文件类型对象
 */
export function getFileType(fileExtension) {
  // 去除后缀名开头的点，并转换为小写
  const cleanExtension = fileExtension.replace('.', '').toLowerCase();
  if (!cleanExtension) {
    return {
      lowerCase: 'unknown',
      upperCase: 'Unknown',
    };
  }

  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg', 'webp'];
  const wordExtensions = ['doc', 'docx'];
  const excelExtensions = ['xls', 'xlsx'];
  const pptExtensions = ['ppt', 'pptx'];
  const audioExtensions = ['mp3', 'wav', 'ogg', 'flac'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'mkv'];
  const codeExtensions = ['js', 'ts', 'html', 'css', 'py', 'java', 'c', 'cpp', 'json', 'php'];
  const databaseExtensions = ['sql', 'db', 'sqlite'];
  const zipExtensions = ['zip', 'rar', '7z'];
  const markExtensions = ['md', 'mdx'];

  if (imageExtensions.includes(cleanExtension)) {
    return {
      lowerCase: 'image',
      upperCase: 'Image',
    };
  }
  if (wordExtensions.includes(cleanExtension)) {
    return {
      lowerCase: 'word',
      upperCase: 'Word',
    };
  }
  if (excelExtensions.includes(cleanExtension)) {
    return {
      lowerCase: 'excel',
      upperCase: 'Excel',
    };
  }
  if (pptExtensions.includes(cleanExtension)) {
    return {
      lowerCase: 'ppt',
      upperCase: 'Ppt',
    };
  }
  if (cleanExtension === 'pdf') {
    return {
      lowerCase: 'pdf',
      upperCase: 'Pdf',
    };
  }
  if (cleanExtension === 'txt') {
    return {
      lowerCase: 'txt',
      upperCase: 'Txt',
    };
  }
  if (markExtensions.includes(cleanExtension)) {
    return {
      lowerCase: 'mark',
      upperCase: 'Markdown',
    };
  }
  if (audioExtensions.includes(cleanExtension)) {
    return {
      lowerCase: 'audio',
      upperCase: 'Audio',
    };
  }
  if (videoExtensions.includes(cleanExtension)) {
    return {
      lowerCase: 'video',
      upperCase: 'Video',
    };
  }
  if (codeExtensions.includes(cleanExtension)) {
    return {
      lowerCase: 'code',
      upperCase: 'Code',
    };
  }
  if (databaseExtensions.includes(cleanExtension)) {
    return {
      lowerCase: 'database',
      upperCase: 'Database',
    };
  }
  if (cleanExtension === 'lnk') {
    return {
      lowerCase: 'link',
      upperCase: 'Link',
    };
  }
  if (zipExtensions.includes(cleanExtension)) {
    return {
      lowerCase: 'zip',
      upperCase: 'Zip',
    };
  }
  if (cleanExtension === 'obj' || cleanExtension === 'fbx' || cleanExtension === 'glb') {
    return {
      lowerCase: 'three',
      upperCase: '3D',
    };
  }
  return {
    lowerCase: 'file',
    upperCase: 'File',
  };
}

/**
 * 获取文件大小
 * @param {number} size 文件大小
 * @returns {string} 返回文件大小
 */
export function getSize(size) {
  let retSize = size;
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
  let unitIndex = 0;

  while (retSize >= 1024 && unitIndex < units.length - 1) {
    retSize /= 1024;
    unitIndex++;
  }

  return `${retSize.toFixed(0)} ${units[unitIndex]}`;
}
