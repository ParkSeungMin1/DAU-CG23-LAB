var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
//var camera = new THREE.OrthographicCamera(-3, 3, 5, -5, -10, 10);
var camera = new THREE.PerspectiveCamera(70,1.2,0.1,1000);
function initRenderer() {
  camera.position.z = 4;
  renderer.setClearColor("#000000");
  renderer.setSize(500, 500);
  document.body.appendChild(renderer.domElement);
}
function initGeometry() {
  const axesHelper = new THREE.AxesHelper();
  scene.add(axesHelper);

  var material = new THREE.MeshBasicMaterial({ color: "#fed136" });
  material.wireframe = true;

  var material2 = new THREE.MeshBasicMaterial({ color: "red" });
  material2.wireframe = true;

  var geometryCube = new THREE.BoxGeometry(1, 1, 1);
  var cube0 = new THREE.Mesh(geometryCube, material);
  var cube1 = new THREE.Mesh(geometryCube, material2);
  cube0.translateX(0.5);
  cube0.translateZ(-1.0);
  cube1.translateZ(-4.0);

  scene.add(cube0);
  scene.add(cube1);
}

function init() {
  initRenderer();
  initGeometry();
}

var render = function () {
  renderer.render(scene, camera);
};

init();
render();