var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
var camera = new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var torus;
//Lights
const spotLight1 = new THREE.SpotLight(0xff0000, 0.5, 30, Math.PI * 0.1, 0.1, 1); // RED
const spotLight2 = new THREE.SpotLight(0x00ff00, 0.5, 30, Math.PI * 0.1, 0.1, 1); // GREEN
const spotLight3 = new THREE.SpotLight(0x0000ff, 0.5, 30, Math.PI * 0.1, 0.1, 1); // BLUE

const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1);
const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);

var gui = new dat.GUI();

controls.enableDamping = true; // 부드러운 감속 효과 활성화


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
  
  spotLight1.castShadow = true;
  spotLight2.castShadow = true;
  spotLight3.castShadow = true;
  spotLight1.position.set(-1,0,10);
  spotLight2.position.set(1,0,10);
  spotLight3.position.set(0,2,10);

  var lightTarget1 = new THREE.Object3D();
  var lightTarget2 = new THREE.Object3D();
  var lightTarget3 = new THREE.Object3D();
  lightTarget1.position.set(-1,0,0);
  spotLight1.target = lightTarget1;
  
  lightTarget2.position.set(1,0,0);
  spotLight2.target = lightTarget2;
  
  lightTarget3.position.set(0,2,0);
  spotLight3.target = lightTarget3;

  scene.add(spotLight1);
  scene.add(spotLightHelper1);
  scene.add(spotLight2);
  scene.add(spotLightHelper2);
  scene.add(spotLight3);
  scene.add(spotLightHelper3);


  scene.add(ambientLight);

//  pointLight.position.set(-2, -2, 2);
//   scene.add(pointLight);
//   scene.add(pointLightHelper);
}

function initGeometry() {
  const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
  scene.add(axesHelper);

  var material0 = new THREE.MeshLambertMaterial({ color: "#ffffff", side: THREE.DoubleSide });
  var geometryPlane = new THREE.PlaneGeometry(10, 10);
  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateY(5.0);
  plane.translateZ(5.0);
  plane.rotateX(Math.PI * 0.5);
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateX(5.0);
  plane.translateZ(5.0);
  plane.rotateY(Math.PI * 0.5);
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateY(-5.0);
  plane.translateZ(5.0);
  plane.rotateX(Math.PI * 0.5);
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateX(-5.0);
  plane.translateZ(5.0);
  plane.rotateY(Math.PI * 0.5);
  scene.add(plane);



  var material1 = new THREE.MeshPhongMaterial({ color: "#ff0000" });
  var geoCube = new THREE.BoxGeometry();
  var cube = new THREE.Mesh(geoCube, material1);
  cube.castShadow = true;
  cube.translateX(-1.0);
  cube.translateY(-1.0);
  cube.translateZ(0.5);
  scene.add(cube);

  var material2 = new THREE.MeshNormalMaterial();
  var geoTorus = new THREE.TorusGeometry(0.5, 0.2);
  torus = new THREE.Mesh(geoTorus, material2);
  torus.castShadow = true;
  torus.translateX(1.0);
  torus.translateY(1.0);
  torus.translateZ(0.5);
  scene.add(torus);

  var material3 = new THREE.MeshStandardMaterial({ color: "#fed136" });
  var geoCone = new THREE.ConeGeometry(0.5, 1);
  var cone = new THREE.Mesh(geoCone, material3);
  cone.translateX(1.0);
  cone.translateY(-1.0);
  cone.translateZ(0.5);
  cone.rotateX(Math.PI * 0.5);
  scene.add(cone);

  var material4 = new THREE.MeshPhysicalMaterial({ color: "#3333cc" });
  var geoCone = new THREE.SphereGeometry(0.5);
  var cone = new THREE.Mesh(geoCone, material4);
  cone.translateX(-1.0);
  cone.translateY(1.0);
  cone.translateZ(0.5);
  cone.rotateX(Math.PI * 0.5);
  scene.add(cone);
}

function initRenderer() {
  camera.position.z = 10;
  controls.update();
  renderer.setClearColor("#000000");
  renderer.setSize(1000, 1000);
  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement);
}

function initGUI() {
gui.add(ambientLight, "visible").name("Ambient Light");

gui.add(spotLight1, "visible").name("Spot Light RED");
gui.add(spotLight2, "visible").name("Spot Light GREEN");
gui.add(spotLight3, "visible").name("Spot Light BLUE");

const spotFolder = gui.addFolder('SpotLight Red')
spotFolder.add(spotLight1.position, 'x', -10.0, 10.0,0.1);
spotFolder.add(spotLight1.position, 'y', -10.0, 10.0,0.1);
spotFolder.add(spotLight1.position, 'z', -10, 10,0.1);

//   gui.add(pointLight, "visible").name("Point Light");

gui.add(ambientLight, "intensity", 0, 1.0);


gui.add(spotLight3, 'angle', 0, Math.PI * 0.5);

//   const pointFolder = gui.addFolder('PointLight')
//   pointFolder.add(pointLight.position, 'x', -10, 10);
//   pointFolder.add(pointLight.position, 'y', -10, 10);
//   pointFolder.add(pointLight.position, 'z', -10, 10);
//   pointFolder.add(pointLight, 'distance', 0, 100);
//   pointFolder.add(pointLight, 'decay', 0, 10);

   const torusFolder = gui.addFolder('torus')
   torusFolder.add(torus.position, 'x', -10, 10);
   torusFolder.add(torus.position, 'y', -10, 10);
   torusFolder.add(torus.position, 'z', -10, 10);
}

function init() {
  initLight();
  initGeometry();
  initRenderer();
  initGUI();
}

// Render Loop
var render = function () {
  requestAnimationFrame(render);
  controls.update();

  spotLightHelper1.update();
  spotLightHelper2.update();
  spotLightHelper3.update();

  if (spotLight1.visible != spotLightHelper1.visible)
    spotLightHelper1.visible = spotLight1.visible;
  if (spotLight2.visible != spotLightHelper2.visible)
    spotLightHelper2.visible = spotLight2.visible;
  if (spotLight3.visible != spotLightHelper3.visible)
    spotLightHelper3.visible = spotLight3.visible;

  renderer.render(scene, camera);

};

init();
render();