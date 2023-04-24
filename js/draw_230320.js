let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
// 방향키를 이용해서 원을 이동할 수 있다.
let xValue = 0; // draw_circle에서 xValue와 yValue 사용. 중심점과 반지름만 있으면 원을 그릴 수 있다. xValue와 yValue를 이용하여 원의 중심점 정의
let yValue = 0;

//Make data
let linePts = [];
linePts.push(new THREE.Vector2(50, 50));
linePts.push(new THREE.Vector2(150, 200));

linePts.push(new THREE.Vector2(50, 250));
linePts.push(new THREE.Vector2(350, 250));

let boxPts = [];

boxPts.push(new THREE.Vector2(100, 100));
boxPts.push(new THREE.Vector2(300, 300));


function draw_line(p0, p1) {
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
}

function draw_point(p) {
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
    ctx.fill();
}

function draw_box(minPt, maxPt) {
    let p0 = new THREE.Vector2(minPt.x, minPt.y);
    let p1 = new THREE.Vector2(minPt.x, maxPt.y);
    let p2 = new THREE.Vector2(maxPt.x, maxPt.y);
    let p3 = new THREE.Vector2(maxPt.x, minPt.y);
    draw_line(p0, p1);
    draw_line(p1, p2);
    draw_line(p2, p3);
    draw_line(p3, p0);
}

function draw_circle(ctr, radius) {
    ctx.beginPath();
    ctx.arc(ctr.x, ctr.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

// 화면에 그려지는 것
function draw_image() {
    ctx.strokeStyle = "blue"; // 16진수가 아닌 이름으로도 색상 부여 가능
    draw_line(linePts[0], linePts[1]);
    ctx.strokeStyle = "red";
    draw_line(linePts[2], linePts[3]);
    ctx.strokeStyle = "green";
    draw_box(boxPts[0], boxPts[1])
    ctx.strokeStyle = "black";
    draw_circle(new THREE.Vector2(230 + xValue, 230 + yValue), 110);

    line_line_intersection(linePts[0], linePts[1], linePts[2], linePts[3])

    line_box_intersection(linePts[0], linePts[1], boxPts[0], boxPts[1])
    line_box_intersection(linePts[2], linePts[3], boxPts[0], boxPts[1])

    line_circle_intersection(linePts[0], linePts[1], new THREE.Vector2(230 + xValue, 230 + yValue), 110)
    line_circle_intersection(linePts[2], linePts[3], new THREE.Vector2(230 + xValue, 230 + yValue), 110)

    box_circle_intersection(boxPts[0], boxPts[1], new THREE.Vector2(230 + xValue, 230 + yValue), 110)

}

function line_line_intersection(p0, p1, p2, p3) {
    // y=ax+b : 직선의 방정식
    // a:기울기 : y증가량 / x증가량
    // y=a0x+b0  y=a1x+b1
    let a0 = (p1.y - p0.y) / (p1.x - p0.x);
    let b0 = p0.y - a0 * p0.x;

    let a1 = (p3.y - p2.y) / (p3.x - p2.x);
    let b1 = p2.y - a1 * p2.x;

    //직선의 교점? a0x+b0=a1x+b1 --> (a0-a1)x = b1 -b0
    let intersectionX = (b1 - b0) / (a0 - a1);
    let intersectionY = a0 * intersectionX + b0;

    if (Math.min(p0.x, p1.x) > intersectionX || Math.max(p0.x, p1.x) < intersectionX)
        return;
    if (Math.min(p2.x, p3.x) > intersectionX || Math.max(p2.x, p3.x) < intersectionX)
        return;
    if (Math.min(p0.y, p1.y) > intersectionY || Math.max(p0.y, p1.y) < intersectionY)
        return;
    if (Math.min(p2.y, p3.y) > intersectionY || Math.max(p2.y, p3.y) < intersectionY)
        return;

    let intersectionPt = new THREE.Vector2(intersectionX, intersectionY);
    draw_point(intersectionPt);
}

function line_box_intersection(lineP0, lineP1, boxMinPt, boxMaxPt) {
    //Need to write...
    let boxMinRightPt = new THREE.Vector2(boxMaxPt.x, boxMinPt.y)
    let boxMaxLeftPt = new THREE.Vector2(boxMinPt.x, boxMaxPt.y)

    let a0 = (lineP1.y - lineP0.y) / (lineP1.x - lineP0.x)
    let b0 = lineP0.y - a0 * lineP0.x

    let y1 = boxMinPt.y
    let x1 = (y1-b0)/a0

    let x2 = boxMinPt.x
    let y2 = a0*x2 + b0

    let x3 = boxMaxPt.x
    let y3 = a0*x3 + b0

    let y4 = boxMaxPt.y
    let x4 = (y4-b0)/a0

    if (line_point_intersection(lineP0, lineP1, x1, y1) && line_point_intersection(boxMaxLeftPt, boxMaxPt, x1, y1))
        draw_point(new THREE.Vector2(x1, y1))
    if (line_point_intersection(lineP0, lineP1, x2, y2) && line_point_intersection(boxMaxLeftPt, boxMinPt, x2, y2))
        draw_point(new THREE.Vector2(x2, y2))
    if (line_point_intersection(lineP0, lineP1, x3, y3) && line_point_intersection(boxMaxPt, boxMinRightPt, x3, y3))
        draw_point(new THREE.Vector2(x3, y3))
    if (line_point_intersection(lineP0, lineP1, x4, y4) && line_point_intersection(boxMinPt, boxMinRightPt, x4, y4))
        draw_point(new THREE.Vector2(x4, y4))

}

function line_point_intersection(lineP0, lineP1, x, y) {
    return (Math.min(lineP0.x, lineP1.x) <= x && x <= Math.max(lineP0.x, lineP1.x) &&
            Math.min(lineP0.y, lineP1.y) <= y && y <= Math.max(lineP0.y, lineP1.y)
            ? true
            : false)
}

function line_circle_intersection(lineP0, lineP1, circleCtr, circleRadius) {
    //Need to write...
    let a0 = (lineP1.y - lineP0.y) / (lineP1.x - lineP0.x)
    let b0 = lineP0.y - a0 * lineP0.x

    // 수평선인 경우(x=☆ 형태) → 기울기가 Infinity
    if (!isFinite(a0)) {
        let C = circleCtr.y*circleCtr.y - circleRadius*circleRadius + (lineP0.x-circleCtr.x)*(lineP0.x-circleCtr.x)
        let D = circleCtr.y*circleCtr.y - C

        if (D < 0) return

        let x = lineP0.x
        let y1 = circleCtr.y + Math.sqrt(D)
        if (line_point_intersection(lineP0, lineP1, x, y1))
            draw_point(new THREE.Vector2(x, y1))

        if (D == 0) return

        y1 = circleCtr.y - Math.sqrt(D)
        if (line_point_intersection(lineP0, lineP1, x, y1))
            draw_point(new THREE.Vector2(x, y1))

        return
    }
    let A = 1 + a0*a0
    let B = a0*b0 - circleCtr.x - a0*circleCtr.y
    let C = circleCtr.x*circleCtr.x + b0*b0 - 2*circleCtr.y*b0 + circleCtr.y*circleCtr.y - circleRadius*circleRadius
    let D = B*B - A*C

    if (D < 0) return

    let x1 = (-1*B + Math.sqrt(D)) / A
    let y1 = a0*x1 + b0
    if (line_point_intersection(lineP0, lineP1, x1, y1))
        draw_point(new THREE.Vector2(x1, y1))
    
    if (D == 0) return

    x1 = (-1*B - Math.sqrt(D)) / A
    y1 = a0*x1 + b0
    if (line_point_intersection(lineP0, lineP1, x1, y1))
        draw_point(new THREE.Vector2(x1, y1))
}

function box_circle_intersection(boxMinPt, boxMaxPt, circleCtr, circleRadius) {
    //Need to write...
    let boxMinRightPt = new THREE.Vector2(boxMaxPt.x, boxMinPt.y)
    let boxMaxLeftPt = new THREE.Vector2(boxMinPt.x, boxMaxPt.y)

    line_circle_intersection(boxMinPt, boxMinRightPt, circleCtr, circleRadius)
    line_circle_intersection(boxMinPt, boxMaxLeftPt, circleCtr, circleRadius)
    line_circle_intersection(boxMinRightPt, boxMaxPt, circleCtr, circleRadius) 
    line_circle_intersection(boxMaxLeftPt, boxMaxPt, circleCtr, circleRadius)
}

//Keyboard Input. keyDown은 누르고 있을 때
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
    // 원점이 좌상단에 있기 때문에 yValue의 증감이 일반적인 경우와 반대이다.
}

//Animation Callback
function clear(){
    ctx.clearRect(0, 0, c.width, c.height);
}
function update(){
    // console.log("update") // update 주기를 console에 찍어서 얼마나 자주 update가 발생하는지 출력
    clear(); // 사용자 정의
    draw_image(); // 사용자 정의
    requestAnimationFrame(update); // canvas에서 제공하는 함수. update를 재귀적으로 호출하며 그림을 지웠다 그렸다 반복
}
update();
document.addEventListener('keydown', keyDown);