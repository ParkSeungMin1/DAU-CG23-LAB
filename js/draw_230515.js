var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
var camera = new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var index = 0;
controls.enableDamping = false; // 부드러운 감속 효과 활성화
//controls.autoRotate=true;

function loadOBJ(url) {
  var loader = new THREE.OBJLoader();
  // instantiate a loader
  // load a resource
  loader.load(
    // resource URL
    url,
    // called when resource is loaded
    function (object) {
      scene.add(object);

    },
    // called when loading is in progresses
    function (xhr) {

      console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

      console.log('An error happened');

    }
  );
}

function initLight() {
  var pointLight0 = new THREE.PointLight(0xffffff);
  pointLight0.position.set(10, 0, 10);
  scene.add(pointLight0);
}

function initGeometry() {
  const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
  scene.add(axesHelper);
  loadOBJ("../models/kitten.obj");
  //loadOBJ("../models/gargoyle.obj");
  //loadOBJ("../models/bunny_stanford.obj");
}

function initRenderer() {
  camera.position.z = 1;
  controls.update();
  renderer.setClearColor("#ffffff");
  renderer.setSize(500, 500);
  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement);
}

function init() {
  initLight();
  initGeometry();
  initRenderer();
}

// Render Loop
var render = function () {
  requestAnimationFrame(render);
  index++;
  scene.children[2].rotation.y += 0.01;
  
   //scene.children[0].position.set(
   //   10*Math.cos(Math.PI*index/100.0),
   //   0,
   //   10*Math.sin(Math.PI*index/100.0)
   //   );
  controls.update();
  renderer.render(scene, camera);
};

init();
render();