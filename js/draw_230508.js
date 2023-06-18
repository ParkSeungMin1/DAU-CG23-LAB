var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
var camera = new THREE.PerspectiveCamera( 75 , 1.0, 0.1, 1000);

function initLight() {
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(10,10,10);
    pointLight.castShadow = true;
    scene.add(pointLight);
}

function initRenderer() {
    camera.position.z = 15;
    renderer.setClearColor("#FFFFFF");
    renderer.setSize(500, 500);
    // Append Renderer to DOM
    document.body.appendChild(renderer.domElement);
}
function initGeometry() {
    // const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
    // scene.add(axesHelper);

    var material0 = new THREE.MeshLambertMaterial({ color: "#8B00FF" });
    var geometryCube = new THREE.BoxGeometry(1, 1, 1);
    var geometrySphere = new THREE.SphereGeometry(1);
    var geometryCone = new THREE.ConeGeometry(1);


    //6번 지멋대로 큐브 속도 돌게 해바라
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var material0 = new THREE.MeshLambertMaterial({ color: "#8B00FF" });
            material0.color.setHex(Math.random()* 0xffffff);
            if(i%2==0)
            material0.wireframe=true
            var cube = new THREE.Mesh(geometryCube, material0);
            //Translation
            cube.translateX(-9.0 + 2.0 * i);
            cube.translateY(-9.0 + 2.0 * j);
            // Add cube to Scene
            scene.add(cube);
        }
    }
}

function init() {
    initLight();
    initRenderer();
    initGeometry();
}

// Render Loop
var render = function () {
    requestAnimationFrame(render);
    for (var i = 1; i < scene.children.length; i++) {
        scene.children[i].rotation.x += Math.random()*0.01;
        if(i/scene.children.length<Math.random()){
            if(i%3==0) scene.children[i].rotation.y += Math.random()*0.01;
            else if (i%3==1) scene.children[i].rotation.z += Math.random()*0.01;
            else scene.children[i].rotation.x += Math.random()*0.002;
        }
    }
    renderer.render(scene, camera);

};

init();
render();