let c = document.getElementById("myCanvas")
let ctx = c.getContext("2d")
let ctrlPts = [];
let isClicked = false;
let clickIdx = -1;
let aboveIdx = -1;

// CP가 4개일 때는 3차 베지어 곡선이 생성된다.


ctrlPts.push(new THREE.Vector2(100, 400));
ctrlPts.push(new THREE.Vector2(120, 300));

ctrlPts.push(new THREE.Vector2(200, 200));
ctrlPts.push(new THREE.Vector2(250, 150));
ctrlPts.push(new THREE.Vector2(270, 130));

ctrlPts.push(new THREE.Vector2(300, 120));
ctrlPts.push(new THREE.Vector2(350, 200));

ctrlPts.push(new THREE.Vector2(400, 400));


function draw_point(p, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
  ctx.fill();
}

function draw_line(p0, p1, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  ctx.lineTo(p1.x, p1.y);
  ctx.stroke();
}

function draw_bezier(ctrlPts) {

  for (let i = 0; i < ctrlPts.length - 1; i++)
    draw_line(ctrlPts[i], ctrlPts[i + 1], "#000000");

  for (let i = 0; i < ctrlPts.length; i++) {
    if (i == aboveIdx) {
        draw_point(ctrlPts[i], "#00ff00")
    }
    else {
        draw_point(ctrlPts[i], "#000000");
    }
  }

  let bezierPts = [];
  //let resolution = 10;
  let resolution = 1; // resolution을 크게 할수록 더 부드러운 곡선이 된다. resolution이 2면 두 개의 직선으로 그려진다.
  for (let i = 0; i <= resolution; i++) {
    let t = i / resolution;
    bezierPts.push(bezier_curve(ctrlPts, t));
  }
  for (let i = 0; i < bezierPts.length - 1; i++)
    draw_line(bezierPts[i], bezierPts[i + 1], "#cc00cc");

}

//bezier function
function Berstein_polynomial(n, i, t) {
  let binomial_coefficient = factorial(n) / (factorial(i) * factorial(n - i));
  let mid = Math.pow(t, i);
  let back = Math.pow(1 - t, n - i);
  return binomial_coefficient * mid * back;
}
function factorial(n) {
  if (n == 1 || n == 0)
    return 1;
  return n * factorial(n - 1);
}
function bezier_curve(ctrlPts, t) {
  let result_point = new THREE.Vector2(0, 0);
  for (let i = 0; i < ctrlPts.length; i++) {
    result_point.x += ctrlPts[i].x * Berstein_polynomial(ctrlPts.length - 1, i, t);
    result_point.y += ctrlPts[i].y * Berstein_polynomial(ctrlPts.length - 1, i, t);
  }
  return result_point;
}

//animation functions
function getMousePos(c, e) {
  var rect = c.getBoundingClientRect();
  return new THREE.Vector2(Math.round(e.clientX - rect.left), Math.round(e.clientY - rect.top));

}
c.addEventListener("mousemove", function (e) {
  var mousePos = getMousePos(c, e);
  if (isClicked) {
    ctrlPts[clickIdx].x = mousePos.x;
    ctrlPts[clickIdx].y = mousePos.y;
  }

  aboveIdx = -1
  for (let i = 0; i < ctrlPts.length; i++) {
    if (mousePos.distanceTo(ctrlPts[i]) < 10) {
        aboveIdx = i
    }
  }

}, false);

c.addEventListener("mousedown", function (e) {
  var mousePos = getMousePos(c, e);
  isClicked = false;
  clickIdx = -1;

  for (let i = 0; i < ctrlPts.length; i++) {
    if (mousePos.distanceTo(ctrlPts[i]) < 10) {
      isClicked = true;
      clickIdx = i;
    }
  }
  console.log(isClicked + " " + clickIdx);
}, false);

c.addEventListener("mouseup", function (e) {
  isClicked = false;
  clickIdx = -1;
})

function clear() {
  ctx.clearRect(0, 0, c.width, c.height);
}
function draw_image() {
  draw_bezier(ctrlPts);
}
function update() {
  clear();
  draw_image();
  requestAnimationFrame(update);
}
update();