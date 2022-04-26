/*
 * @Author: molor
 * @Date: 2022-04-26 14:30:09
 * @LastEditors: molor
 * @LastEditTime: 2022-04-26 14:55:00
 * @FilePath: \threejs-miniprogram-taobao\example\pages\index\index.js
 */
// const { createScopedThreejs } = require('threejs-miniprogram')
import { createScopedThreejs } from "../../../dist/index";

// import { createScopedThreejs } from "@tbminiapp/threejs-miniapp";

const { renderModel } = require("../../plugin/model");

// 引入淘积木互动插件 https://open.taobao.com/ability#/detail?id=188
// 使用前需要为应用或者模板订购插件权限
const taojimu = requirePlugin('taojimu');

let THREE = null;

Page({
  data: {},

  canvasOnReady() {
    my.createCanvas({
      id: "webgl",
      success: (canvas) => {
        const three = createScopedThreejs(canvas);

        const system = my.getSystemInfoSync();
        if (system.cameraAuthorized == undefined) {
          console.log('IDE');
          three.inIDE = true;
          three.screenPixelRatio = 1;
        } else {
          console.log('非IDE');
          three.inIDE = false;
          three.screenPixelRatio = system.pixelRatio;
        }

        THREE = three;
        renderModel(canvas, THREE);
        THREE.EVENT.addEventListener('click', (e) => {
          console.log(e);
        });
      },
    });

  },


  onReady() {

    const system = my.getSystemInfoSync();
    console.log(system);
    console.log(system.cameraAuthorized);

    if (system.cameraAuthorized == undefined) {
      console.log('IDE');
    } else {
      console.log('非IDE');
    }

    // 如，定义了"startInteractive"
    // 项目中需要有应用 taojimu.log.sendLog(trackerConfig.startInteractive) 的调用
    // 这样可以避免埋点的漏报情况
    const trackerConfig = {
      // 公用埋点声明
      // 请勿删除
      startInteractive: {
        // 日志类型
        atype: 'startInteractive',
        // 日志标识
        atitle: '开始互动',
      },
    };

    // 业务代码有对应上报行为
    taojimu.log.sendLog(trackerConfig.startInteractive);

  },

  touchHandle(e) {
    THREE.touchCanvas(e);
  },

});
