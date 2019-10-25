/*
 * @Author: tim
 * @LastEditors: tim
 * @Description: 常用操作
 * @Date: 2019-03-12 20:53:38
 * @LastEditTime: 2019-03-20 10:52:24
 */

/**
 * 查找最近的祖先元素
 * @param {*} el         相对元素
 * @param {*} selector  要查找的祖先元素选择器
 */
export function closest(el, selector) {
  let matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  let isFind = false

  while (el) {
    el = el.parentElement;
    if (matchesSelector.call(el, selector)) {
      isFind = true
      break;
    }
  }
  return isFind ? el : null;
}

/**
 * 简单复制对象
 * @param obj 原对象
 * @returns {any} 新对象
 */
export function copyObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 获取UUID
 */
export function getUUID() {
  var s = [];
  let hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  return s.join("");
}
