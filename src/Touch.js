/*
 * @Author: molor
 * @Date: 2022-04-26 11:51:58
 * @LastEditors: molor
 * @LastEditTime: 2022-04-28 18:12:13
 * @FilePath: \threejs-miniprogram-taobao\src\Touch.js
 */
export default function Touch(EventBus) {
  // constructor(EventBus){
  //   this.EventBus=EventBus;
  // }
  return function (e) {
    const type = e.type;
    e.preventDefault = function () { }
    e.stopPropagation = function () { }
    if (type == 'touchStart' || type == 'touchMove') {
      if (!e.touches || e.touches.length == 0) {
        console.log('无效点击事件,', type);
      } else {
        if (e.touches[0].x !== undefined) {
          e.touches.forEach(item => {
            item.pageX = item.x;
            item.pageY = item.y;
            item.clientX = item.x;
            item.clientY = item.y;
          });
        }
        EventBus.dispatchEvent(e);
      }
    } else if (type == 'touchEnd' || type == 'touchCancel') {
      if (!e.touches || e.touches.length == 0) {
        e.touches = [];
      } else {
        if (e.touches[0].x !== undefined) {
          e.touches.forEach(item => {
            item.pageX = item.x;
            item.pageY = item.y;
            item.clientX = item.x;
            item.clientY = item.y;
          });
        }
      }

      if (!e.changedTouches || e.changedTouches.length == 0) {
        console.log('无效点击事件,', type);
      } else {
        if (e.changedTouches[0].x !== undefined) {
          e.changedTouches.forEach(item => {
            item.pageX = item.x;
            item.pageY = item.y;
            item.clientX = item.x;
            item.clientY = item.y;
          });
        }
        EventBus.dispatchEvent(e);
      }
    }
  }
}