let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

//Make data
let pts = [];
pts.push(new THREE.Vector2(0, 0));
pts.push(new THREE.Vector2(50, 50));
pts.push(new THREE.Vector2(0, 100));
pts.push(new THREE.Vector2(300, 200));

//Draw Line
for (let i = 0; i < pts.length; i += 2) {
    draw_line(pts[i],pts[i+1]);
}

function draw_line(p0,p1)
{
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke(); // 선을 그리겠다. 선분이라서 안을 못채워서 fill이 아닌 stroke.
}
//시험문제 네모 그려놓고 좌표 6개 주고 그림 그려라하기 원점 좌측상단

function draw_point(p)
{
    ctx.fillStyle = "#ff0000";  // 빨강 초록 파란 2글자씩 16진수 해석
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0,  2*Math.PI, true); // arc == 원호
    ctx.fill();  // 점 채우기
}

function line_line_intersection(p0, p1, p2, p3) {
    console.log(p0); 
    console.log(p1);
    console.log(p2);
    console.log(p3);

    //Need to write...

    let a = (p0.x - p1.x) * (p2.y - p3.y) - (p0.y - p1.y) * (p2.x - p3.x)

    let pre = (p0.x * p1.y - p0.y * p1.y)
    let pre2 = (p2.x * p3.y - p2.y * p3.x)

    let intersectionX= (pre* (p2.x - p3.x) - (p0.x - p1.x) * pre2 ) / a;
    let intersectionY= (pre* (p2.y - p3.y) - (p0.y - p1.y) * pre2 ) / a;

    console.log(intersectionX,intersectionY)
    let intersectionPt = new THREE.Vector2(intersectionX, intersectionY);
    draw_point(intersectionPt);
}

line_line_intersection(pts[0],pts[1],pts[2],pts[3]);