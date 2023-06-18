var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
var camera = new THREE.PerspectiveCamera(30, 1.0, 0.1, 1000);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var torus;
var cylinder;

const spotLight1 = new THREE.SpotLight(0xff0000, 0.9, 0, Math.PI * 0.5, 0.1, 1); // RED
const spotLight2 = new THREE.SpotLight(0x00ff00, 0.9, 0, Math.PI * 0.5, 0.1, 1); // GREEN
const spotLight3 = new THREE.SpotLight(0x0000ff, 0.9, 0, Math.PI * 0.5, 0.1, 1); // BLUE
const spotLight4 = new THREE.SpotLight(0xffffff, 0.9, 0, Math.PI * 0.5, 0.1, 1); // WHITE

controls.enableDamping = true;
var gui = new dat.GUI();

function initLight() {
    spotLight1.position.set(-2,-2,2);
    spotLight2.position.set(2,-2,2);
    spotLight3.position.set(2,2,2);
    spotLight4.position.set(-2,2,2);
    
    scene.add(spotLight1);
    scene.add(spotLight2);
    scene.add(spotLight3);
    scene.add(spotLight4);

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
    plane.translateX(-5.0);
    plane.translateZ(5.0);
    plane.rotateY(Math.PI * 0.5);
    scene.add(plane);

    var geoTorus = new THREE.TorusGeometry(1.0, 0.6);
    torus = new THREE.Mesh(geoTorus, material0);
    torus.castShadow = true;
    torus.translateZ(0);
    scene.add(torus);

    var geoTorus = new THREE.TorusGeometry(0.9, 0.5);
    torus = new THREE.Mesh(geoTorus, material0);
    torus.castShadow = true;
    torus.translateZ(0.5);
    scene.add(torus);

    var geoTorus = new THREE.TorusGeometry(0.8, 0.4);
    torus = new THREE.Mesh(geoTorus, material0);
    torus.castShadow = true;
    torus.translateZ(1.0);
    scene.add(torus);

    var geoTorus = new THREE.TorusGeometry(0.7, 0.3);
    torus = new THREE.Mesh(geoTorus, material0);
    torus.castShadow = true;
    torus.translateZ(1.5);
    scene.add(torus);

    var geoCylinder = new THREE.CylinderGeometry(1.0);
    cylinder = new THREE.Mesh(geoCylinder, material0);
    cylinder.castShadow = true;
    cylinder.translateX(3);
    cylinder.translateY(-3);
    cylinder.translateZ(0.5);
    cylinder.rotateX(Math.PI * 0.5);
    scene.add(cylinder);

    var geoCylinder = new THREE.CylinderGeometry(1.0);
    cylinder = new THREE.Mesh(geoCylinder, material0);
    cylinder.castShadow = true;
    cylinder.translateX(-3);
    cylinder.translateY(3);
    cylinder.translateZ(0.5);
    cylinder.rotateX(Math.PI * 0.5);
    scene.add(cylinder);

    var geoCone = new THREE.ConeGeometry(1.0, 1.5);
    var cone = new THREE.Mesh(geoCone, material0);
    cone.translateX(3.0);
    cone.translateY(3.0);
    cone.translateZ(0.5);
    cone.rotateX(Math.PI * 0.5);
    scene.add(cone);

    var geoCone = new THREE.ConeGeometry(1.0,1.5);
    var cone = new THREE.Mesh(geoCone, material0);
    cone.translateX(-3.0);
    cone.translateY(-3.0);
    cone.translateZ(0.5);
    cone.rotateX(Math.PI * 0.5);
    scene.add(cone);
}

function initRenderer() {
    camera.position.x = 15;
    camera.position.y = -15;
    camera.position.z = 15;
    camera.up.x = 0;
    camera.up.y = 0;
    camera.up.z = 1;
    controls.update();
    renderer.setClearColor("#000000");
    renderer.setSize(500, 500);
    // Append Renderer to DOM
    document.body.appendChild(renderer.domElement);
    console.log("[02-quiz]");
    console.log(scene.children);
}

function initGUI() {
    gui.add(spotLight1, "visible").name("Spot Light RED");
    gui.add(spotLight2, "visible").name("Spot Light GREEN");
    gui.add(spotLight3, "visible").name("Spot Light BLUE");
    gui.add(spotLight4, "visible").name("Spot Light WHITE");

}

function init() {
    initGeometry();
    initLight();
    initRenderer();
    initGUI();
}

// Render Loop
var render = function () {
    requestAnimationFrame(render);
    controls.update();

    renderer.render(scene, camera);
};

init();
render();