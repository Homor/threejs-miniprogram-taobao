/*
 * @Author: molor
 * @Date: 2022-04-26 14:30:09
 * @LastEditors: molor
 * @LastEditTime: 2022-04-26 14:48:24
 * @FilePath: \threejs-miniprogram-taobao\src\index.js
 */
import { atob as _atob } from "abab";
import EventTarget from "./EventTarget";
import Touch from "./Touch";

import _XMLHttpRequest from "./XMLHttpRequest";
// import Blob from "blob-polyfill";

export function createScopedThreejs(canvas) {
  // eslint-disable-next-line
  const window = {
    AudioContext: function () {},
    addEventListener: function () {},
    removeEventListener: function () {},
    URL: {},
  };

  // adapt canvas
  canvas.style = { width: canvas.width + "px", height: canvas.height + "px" };
  canvas.addEventListener = function () {};
  canvas.removeEventListener = function () {};

  Object.defineProperty(canvas, 'clientHeight', {
    get() {
      return canvas.height;
    }
  })

  Object.defineProperty(canvas, 'clientWidth', {
    get() {
      return canvas.width;
    }
  })

  // eslint-disable-next-line
  const document = {
    createElementNS(_, type) {
      if (type === "canvas") return canvas;
      if (type === "img"){
        const img =  canvas.createImage();
        img.addEventListener = function(type,cb){
          console.log('img.addEventListener',type);
          if(type=='load'){
            console.log('load');
            img.onload = cb.bind(img);
          }else if(type=='error'){
            img.onerror = cb.bind(img);
          }
        }

        img.removeEventListener = function(type,cb){
          if(type=='load'){
            console.log('load');
            img.onload = null;
          }else if(type=='error'){
            img.onerror = null;
          }
        }
        return img;
      }
    },
  };

  // eslint-disable-next-line
  const atob = (a) => {
    return _atob(a);
  };

  // eslint-disable-next-line
  const XMLHttpRequest = _XMLHttpRequest;

  const exports = {};

  // three.js source code will be injected here
  // eslint-disable-next-line
  __INJECT_THREE__;

  const eventBus = new EventTarget();
  exports.EVENT = eventBus;
  exports.touchCanvas = Touch(eventBus);

  return exports;
}
