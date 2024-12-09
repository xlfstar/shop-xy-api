function makeFab() {
  let last = 1,
    current = 1;
  return function inner() {
    [current, last] = [current + last, current];
    return last;
  };
}

//防抖
function debounce(func, time) {
  let timer = 0;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      timer = 0;
      func.apply(this, args);
    }, time);
  };
}
// input.onkeypress = debounce(function () { console.log(input.value) // 事件处理逻辑}, 500)
//节流
function throttle(func, time) {
  let timer = 0; // 定时器标记相当于一个锁标志
  return function (...args) {
    if (timer) return func.apply(this, args);
    timer = setTimeout(() => (timer = 0), time);
  };
}
const crypto = require('crypto')
console.log(crypto);