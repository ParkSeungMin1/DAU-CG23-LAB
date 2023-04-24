let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

//Make data
let pts = [];
pts.push(new THREE.Vector2(50, 50));
pts.push(new THREE.Vector2(150, 250));
pts.push(new THREE.Vector2(50, 150));
pts.push(new THREE.Vector2(350, 140));

//Draw Line
for (let i = 0; i < pts.length; i += 2) {
    draw_line(pts[i],pts[i+1]);
}

function draw_line(p0,p1)
{
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
}

function draw_point(p)
{
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI, true);
    ctx.fill();
}

function line_line_intersection(p0, p1, p2, p3) {
    //Need to write...
    g1 = (p1.y-p0.y) / (p1.x-p0.x)
    g2 = (p3.y-p2.y) / (p3.x-p2.x)
    b1 = p0.y-g1*p0.x
    b2 = p2.y-g2*p2.x


    let intersectionX= (b2-b1) / (g1-g2);
    let intersectionY= g1*intersectionX + b1;
    console.log(intersectionX,intersectionY)
    if(p0.x > intersectionX || p1.x < intersectionX) return;
    if(p2.x > intersectionX || p3.x < intersectionX) return;
    if(p0.y > intersectionY || p1.y < intersectionY) return;
    if(p2.y > intersectionY || p3.y < intersectionY) return;
    console.log(intersectionX,intersectionY)
    let intersectionPt = new THREE.Vector2(intersectionX, intersectionY);
    draw_point(intersectionPt);
}

line_line_intersection(pts[0],pts[1],pts[2],pts[3]);