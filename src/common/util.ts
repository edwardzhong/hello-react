/**
 * deep copy
 * @param {Object} p parent object
 * @param {Object} c child object to return
 */
function deepCopy(p: object, c: object = {}): object {
  for (const i in p) {
    if (typeof p[i] === 'object') {
      c[i] = (p[i].constructor === Array) ? [] : {};
      deepCopy(p[i], c[i]);
    } else if (typeof p[i] === 'function') {
      c[i] = p[i].prototype.constructor;
    } else c[i] = p[i];
  }
  return c;
}

/**
 * 随机数字和字母
 * @param {Number} l code length
 */
function randomCode(l = 4) {
  const arr = [];
  const codes = '01234567890123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  while (arr.length < l) {
    let i = Math.floor(Math.random() * codes.length);
    if (arr.indexOf(i) < 0) {
      arr.push(i);
    }
  }
  return arr.map(i => codes[i]).join('');
}

/**
 * stringFormat('xx$1x $3 xxx$2', 11,22,33)
 * @param {String} str   string
 * @param  {...any} args arguments to fill string
 */
function stringFormat(str: string, ...args: any[]): string {
  // args = args.flat();// Array can be Array, because flat function
  return str.replace(/\$(\d+)/g, (match, num) => {
    const m = args[parseInt(num, 10) - 1];
    return m ? (`${m}`) : match;
  });
}

/**
 * 格式化日期
 * @param str 日期格式字符串
 */
function formatTime(str: string): string {
  const d = new Date(str);
  const n = new Date();
  const r = n.getTime() - d.getTime();
  const dateStr = `${d.getFullYear()}-${('0' + d.getMonth()).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
  const timeStr = `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}:${('0' + d.getSeconds()).slice(-2)}`;
  const just = 1000 * 10;
  const min = 1000 * 60;
  const hour = 1000 * 60 * 60;
  const day = hour * 24;
  const month = day * 30;
  let i = timeStr;

  if (r < day && n.getDate() - d.getDate() == 0) {
    if (r < just) {
      i = '刚刚';
    } else if (r < min) {
      i = `${Math.floor(r / 1000)}秒前`;
    } else if (r < hour) {
      i = `${Math.floor(r / min)}分钟前`;
    } else if (r < hour * 24) {
      i = `${Math.floor(r / hour)}小时前`;
    }
  } else if (r < day * 2 && new Date(n.getTime() - day).getDate() - d.getDate() == 0) {
    i = `昨天 ${timeStr}`;
  } else if (r < day * 3 && new Date(n.getTime() - day * 2).getDate() - d.getDate() == 0) {
    i = `前天 ${timeStr}`;
  } else if (r < day * 8) {
    i = `${Math.floor(r / day)}天前`;
  } else if (r < day * 30) {
    i = dateStr;
  } else if (r < month * 12) {
    i = `${Math.floor(r / month)}个月前`;
  } else if (r < day * 365 * 5) {
    i = `${Math.floor(r / (day * 365))}年前`;
  } else {
    i = `${dateStr} ${timeStr}`;
  }
  return i;
}

/**
 * html encode
 * html转码
 * @param  {String} str html string
 * @return {String}     encode string
 */
function htmlEncode(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/ /g, '&nbsp;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
}

/**
 * html decode
 * html解码
 * @param  {String} str encode string
 * @return {String}     html string
 */
function htmlDecode(str: string = ''): string {
  if (!str) return '';
  return str.replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, '\'')
    .replace(/&quot;/g, '"');
}

/**
 * Intercept the first n strings
 * @param {String} str string
 * @param {Number} n   string length to cut
 */
function getContentSummary(str: string, n: number): string {
  const replaceHtmlTags = (str: string) => str.replace(/<\s*\/?\s*\w+[\S\s]*?>/g, ''); // 过滤掉html标签
  const pattern = /^[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+/;
  let ret = ''; 
  let count = 0; 
  let m;
  str = replaceHtmlTags(htmlDecode(str));

  while (str.length) {
    if ((m = str.match(pattern))) { // 拉丁文字
      count++;
      ret += m[0];
      str = str.substr(m[0].length);
    } else {
      if (str.charCodeAt(0) >= 0x4E00) { // 中日韩文字
        count++;
      }
      ret += str.charAt(0);
      str = str.substr(1);
    }
    if (count > n) {
      ret += '...';
      break;
    }
  }
  return ret;
}

/**
 * Count the number of string
 * 计算字符串文字数量(拉丁中日韩字符)
 * @param  {String} str string
 * @return {Number} word number
 */
function wordCount(str: string): number {
  const pattern = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
  const m = str.match(pattern);
  let count = 0;
  if (m === null) return count;
  for (let i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4E00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
}

/**
 * 计算包含双字节字符和emoji的准确长度
 * @param {String} str string
 * @return {Number} string length
 */
function charCount(str: string): number {
  const reg = /[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
  return str.replace(reg, 'a').length;
}

/**
 * 压缩图像
 * @param {Image} img
 * @param {Number} size
 */
function compressPicture(img: HTMLImageElement, size: number = 400): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const w = img.width;
  const h = img.height;
  if (Math.max(w, h) > size) {
    if (w > h) {
      canvas.width = size;
      canvas.height = (h / w) * size;
    } else {
      canvas.height = size;
      canvas.width = (w / h) * size;
    }
  } else {
    canvas.width = w;
    canvas.height = h;
  }
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function compressPictureToBase64(img: HTMLImageElement, size = 400): string {
  return compressPicture(img, size).toDataURL('image/jpeg');
}

function compressPictureToBlob(img: HTMLImageElement, size = 400): Promise<Blob> {
  return new Promise((resolve) => {
    compressPicture(img, size).toBlob(resolve, 'image/jpeg');
  });
}

/**
 * base64 装换为 Blob 对象
 * @param {String} base64
 */
function dataURLtoBlob(base64: string): Blob {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}


/**
 * 图形验证码
 * @param {HTMLCanvasElement} canvas 
 * @param {String} str 
 */
function drawCode(canvas: HTMLCanvasElement, str: string) {
  const h = canvas.height;
  const w = canvas.width;
  const ctx = canvas.getContext('2d');
  ctx.font = '80px Verdana';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 4;
  ctx.clearRect(0, 0, w, h);

  //随机线条
  for (let i = 0; i < 50; i++) {
    const hsl = Math.floor(Math.random() * 360);
    const sx = Math.floor(Math.random() * w);
    const sy = Math.floor(Math.random() * h / 2);
    const dx = Math.floor(Math.random() * w);
    const dy = Math.floor(Math.random() * (h - h / 2) + h / 2);
    ctx.save();
    ctx.strokeStyle = 'hsl(' + hsl + ',80%,80%)';
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(dx, dy);
    ctx.stroke();
    ctx.restore();
  }
  // 随机字符
  str.split('').forEach((a, i) => {
    const hsl = Math.floor(Math.random() * 360);
    const rot = (Math.floor(Math.random() * 2) * 2 - 1) * Math.random() * Math.PI / 6;
    ctx.save();
    ctx.translate(40 + i * 60, h / 2);
    ctx.rotate(rot);
    ctx.fillStyle = 'hsl(' + hsl + ',40%,40%)';
    ctx.fillText(a, 0, 0);
    ctx.restore();
  });
  //前景圆形
  // for (let i = 0; i < 30; i++) {
  //   const hsl = Math.floor(Math.random() * 360);
  //   const x = Math.floor(Math.random() * w);
  //   const y = Math.floor(Math.random() * h);
  //   const r = Math.ceil(Math.random() * 8);
  //   ctx.save();
  //   ctx.beginPath();
  //   ctx.fillStyle = 'hsl(' + hsl + ',100%, 95%)';
  //   ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  //   ctx.fill();
  //   ctx.restore();
  // }
}

type ShareArg = { url: string; title: string; pic?: string; desc?: string };
/**
 * sns分享链接
 * @param type sns type
 * @param opts sns option
 */
function shareUrl(type: string, opts: ShareArg): string {
  const configs = {
    weibo: ({ url, title, pic }: ShareArg) => `http://service.weibo.com/share/share.php?url=${encodeURI(url)}&title=${title}&pic=${encodeURIComponent(pic || '')}`,
    qq: ({ url, title, desc }: ShareArg) => `http://connect.qq.com/widget/shareqq/index.html?url=${encodeURI(url)}&title=${title}&source=${desc || ''}`,
    douban: ({ url, title, pic, desc, }: ShareArg) => `https://www.douban.com/share/service?href=${encodeURI(url)}&name=${title}&image=${encodeURIComponent(pic || '')}&text=${desc || ''}`,
    qzone: ({ url, title, pic, desc, }: ShareArg) => `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURI(url)}&title=${title}&pics=${encodeURIComponent(pic || '')}&summary=${desc || ''}&desc=${desc || ''}&site=${encodeURI(url)}`,
    facebook: ({ url }: ShareArg) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(url)}`,
    twitter: ({ url, title }: ShareArg) => `https://twitter.com/intent/tweet?text=${title}&url=${encodeURI(url)}&via=${encodeURI(url)}`,
  };
  return configs[type](opts);
}

/**
 * 包装为 suspense 的数据子组件
 * @param promise Promise 函数
 */
function wrapPromise(promise: (...args: any[]) => Promise<any>, ...args: any[]) {
  let status = 'pending';
  let result: any;
  let thenable: Promise<void>;
  return () => {
    if (!thenable) {
      thenable = promise(...args).then(
        r => {
          status = "success";
          result = r;
        },
        e => {
          status = "error";
          result = e;
        }
      );
    }
    if (status === "pending") {
      throw thenable;
    } else if (status === "error") {
      throw result;
    } else if (status === "success") {
      return result;
    }
  }
}

export {
  deepCopy,
  randomCode,
  stringFormat,
  formatTime,
  htmlEncode,
  htmlDecode,
  getContentSummary,
  charCount,
  wordCount,
  compressPicture,
  compressPictureToBase64,
  compressPictureToBlob,
  dataURLtoBlob,
  drawCode,
  shareUrl,
  wrapPromise,
};
