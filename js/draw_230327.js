let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let xValue = 50;
let yValue = 200;

let boxPts = [];

// 0 1: red - dynamic
boxPts.push(new THREE.Vector2(xValue, yValue));
boxPts.push(new THREE.Vector2(xValue + 50, yValue + 50));

// 2 3: green - fixed
boxPts.push(new THREE.Vector2(150, 150));
boxPts.push(new THREE.Vector2(350, 350));

// 4 5: yellow - fixed
boxPts.push(new THREE.Vector2(70, 70));
boxPts.push(new THREE.Vector2(200, 130));

// 6 7: blue - fixed
boxPts.push(new THREE.Vector2(400, 30));
boxPts.push(new THREE.Vector2(460, 300));

// 8 9: orange - fixed
boxPts.push(new THREE.Vector2(40, 400));
boxPts.push(new THREE.Vector2(420, 480));

// 10 11: purple - fixed
boxPts.push(new THREE.Vector2(20, 310));
boxPts.push(new THREE.Vector2(80, 370));

colors = ['red', 'green', 'yellow', 'blue', 'orange', 'purple']

function draw_box(minPt, maxPt, isFill) {
  ctx.beginPath();
  ctx.rect(minPt.x, minPt.y, maxPt.x - minPt.x, maxPt.y - minPt.y);
  if (isFill)
    ctx.fill();
  else
    ctx.stroke();
}

function check_state_and_draw(boxpts1, boxpts2, color1, boxpts3, boxpts4, color2) {
  //01(dynamic): red, 23: green, 45: yellow, 67: blue, 89: orange, 1011: purple
  let isFill = false;
  if (box_box_collision(boxpts1, boxpts2, boxpts3, boxpts4))
    isFill = true;

  ctx.strokeStyle = color2
  ctx.fillStyle = color2
  draw_box(boxpts3, boxpts4, isFill)

  ctx.strokeStyle = color1
  ctx.fillStyle = color1
  draw_box(boxpts1, boxpts2, isFill)

  // boxpts1, boxpts2, color1이 dynamic한 red 사각형인데 이 코드를 color2 위에 올리면
  // collision이 일어났을 때 빨간 사각형의 테두리만 위에 있는 경우가 있었었다.
}

function draw_image() {
  // let isFill = false;
  // if (box_box_collision(boxPts[0], boxPts[1], boxPts[2], boxPts[3]))
  //   isFill = true;
  // ctx.strokeStyle = "green";
  // ctx.fillStyle = "green"
  // draw_box(boxPts[0], boxPts[1], isFill)
  // ctx.strokeStyle = "red"
  // ctx.fillStyle = "red"
  // draw_box(boxPts[2], boxPts[3], isFill)

  for (let i=1; i<=5; i++) // fixed된 box의 개수만큼 반복
    check_state_and_draw(boxPts[0], boxPts[1], colors[0], boxPts[i*2], boxPts[i*2+1], colors[i])
}

function box_box_collision(pMin, pMax, qMin, qMax) {
  let pw = pMax.x - pMin.x;
  let qw = qMax.x - qMin.x;
  let ph = pMax.y - pMin.y;
  let qh = qMax.y - qMin.y;

  let maxx = Math.max(pMin.x, pMax.x, qMin.x, qMax.x)
  let maxy = Math.max(pMin.y, pMax.y, qMin.y, qMax.y)

  let minx = Math.min(pMin.x, pMax.x, qMin.x, qMax.x)
  let miny = Math.min(pMin.y, pMax.y, qMin.y, qMax.y)

  if (pMin.x < qMax.x && pMax.x  > qMin.x && pMin.y < qMax.y && pMax.y > qMin.y)
    return true
  return false

  // 교수님 코드
  //Need to write...
  // if (pMin.x < qMax.x && pMax.x  > qMin.x && pMin.y < qMax.y && pMax.y > qMin.y)
  //   return true;
  // return false
}

//Keyboard Input
function keyDown(e) {
  if (e.key === 'ArrowRight' || e.key === 'Right') {
    xValue += 5;
  } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
    xValue -= 5;
  } else if (e.key === 'ArrowUp' || e.key === 'Up') {
    yValue -= 5;
  } else if (e.key === 'ArrowDown' || e.key === 'Down') {
    yValue += 5;
  }

  boxPts[0].x = xValue;
  boxPts[1].x = xValue + 50;
  boxPts[0].y = yValue;
  boxPts[1].y = yValue + 50;
}

//Animation Callback
function clear() {
  ctx.clearRect(0, 0, c.width, c.height);
}
function update() {
  clear();
  draw_image();
  requestAnimationFrame(update);
}
update();
document.addEventListener('keydown', keyDown);