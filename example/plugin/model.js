import { registerGLTFLoader } from './loaders/gltf-loader';
import { bindControl } from './OrbitControls';
import registerClick from './Click';

export function renderModel(canvas, THREE) {
  registerGLTFLoader(THREE);
  bindControl(THREE);

  var  clock, mixer;
  var camera, scene, renderer, model;

  function init() {
    camera = new THREE.PerspectiveCamera(
      45,
      canvas.width / canvas.height,
      0.25,
      100
    );
    camera.position.set(-1, 1, 1);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0e0e0);
    scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);
    clock = new THREE.Clock();
    // lights
    var light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 20, 0);
    scene.add(light);
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 20, 10);
    scene.add(light);
    // ground
    var mesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2000, 2000),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);
    var grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer.setPixelRatio(my.getSystemInfoSync().pixelRatio);
    renderer.setSize(canvas.width, canvas.height);
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

    const removeClickListener = registerClick(THREE, scene, camera, canvas);
    // setTimeout(() => {
    //   removeClickListener();
    // }, 4000);
    var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.target = new THREE.Vector3(0, 0, 0);

    loadGltf();
  }

  function loadGltf() {

    // model
    var loader = new THREE.GLTFLoader();
    loader.load(
      'https://pernod-ricard.oss-accelerate.aliyuncs.com/123/model/sdjcs.gltf',
      function (gltf) {
        console.log('gltf');
        model = gltf.scene;
        model.scale.x = 1;
        model.scale.y = 1;
        model.scale.z = 1;
        // model.scale = 10;
        scene.add(model);

      },
      // undefined,
      function (e) {
        console.error(e);
      }
    );

  }

  function animate() {
    var dt = clock.getDelta();
    if (mixer) mixer.update(dt);
    canvas.requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  init();

  animate();
}
