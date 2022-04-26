/*
 * @Author: molor
 * @Date: 2022-04-26 11:51:58
 * @LastEditors: molor
 * @LastEditTime: 2022-04-26 13:57:47
 * @FilePath: \threejs-miniappe:\s\node_modules\_@tbminiapp_threejs-miniapp@0.0.1@@tbminiapp\threejs-miniapp\src\Touch.js
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
        e.touches.forEach(item => {
          item.pageX = item.x;
          item.pageY = item.y;
          item.clientX = item.x;
          item.clientY = item.y;
        });
        EventBus.dispatchEvent(e);
      }
    } else if (type == 'touchEnd' || type == 'touchCancel') {
      if (!e.touches || e.touches.length == 0) {
        e.touches = [];
      }else{
        e.touches.forEach(item => {
          item.pageX = item.x;
          item.pageY = item.y;
          item.clientX = item.x;
          item.clientY = item.y;
        });
      }

      if (!e.changedTouches || e.changedTouches.length == 0) {
        console.log('无效点击事件,', type);
      } else {
        e.changedTouches.forEach(item => {
          item.pageX = item.x;
          item.pageY = item.y;
          item.clientX = item.x;
          item.clientY = item.y;
        });
        EventBus.dispatchEvent(e);
      }
      
    }

  }
}