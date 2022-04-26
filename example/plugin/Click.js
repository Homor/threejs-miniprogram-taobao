
export default function registerClick(THREE, scene, camera, canvas) {

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  let touchStartList = [];

  let startPoint = {};

  function onTouchStart(e) {
    touchStartList = onPointerMove(e.touches[0].pageX, e.touches[0].pageY);
    startPoint = { pageX: e.touches[0].pageX, pageY: e.touches[0].pageY }
  }

  function onTouchEnd(e) {
    const intersects = onPointerMove(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    if (touchStartList.length && intersects.length) {
      if (touchStartList[0].object.name == intersects[0].object.name) {
        const diff_x = Math.abs(startPoint.pageX - e.changedTouches[0].pageX);
        const diff_y = Math.abs(startPoint.pageY - e.changedTouches[0].pageY);
        if (diff_x + diff_y < 2) {
          THREE.EVENT.dispatchEvent({ type: 'click', target: intersects[0], timeStamp: e.timeStamp });
        }
      }
      touchStartList.length = 0;
      intersects.length = 0;
    }
  }


  THREE.EVENT.addEventListener('touchStart', onTouchStart);
  THREE.EVENT.addEventListener('touchEnd', onTouchEnd);

  function onPointerMove(pageX, pageY) {
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    pointer.x = (pageX * THREE.screenPixelRatio / canvas.clientWidth) * 2 - 1;
    pointer.y = -(pageY * THREE.screenPixelRatio / canvas.clientHeight) * 2 + 1;

    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(pointer, camera);

    // 计算物体和射线的焦点
    const intersects = raycaster.intersectObjects(scene.children, true);
    return intersects;
  }

  return function removeClickListener() {
    THREE.EVENT.removeEventListener('touchStart', onTouchStart);
    THREE.EVENT.removeEventListener('touchEnd', onTouchEnd);
  }

}

