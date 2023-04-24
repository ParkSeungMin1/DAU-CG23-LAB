let c = document.getElementById("myCanvas")
let ctx = c.getContext("2d")
let ctrlPts = []

ctrlPts.push(new THREE.Vector2(100,200))

function draw_point(p){
    ctx.fillStyle="#ff0000"
    ctx.beginPath()
    ctx.arc(p.x,p.y,5,0,2*Math.PI)
    ctx.fill()
}

function draw_line(p0,p1){
    ctx.strokeStyle="#ff0000"
    ctx.beginPath()
    ctx.moveTo(p0.x,p0.y)
    ctx.lineTo(p1.x,p1.y)
    ctx.stroke()
}

let moustPt = new THREE.Vector2(mouseX,mouseY)
if(mousePt.distanceTo(circleData.ctr)<= circleData.radius)
if (mousePt.distanceTo(circleData.ctr) <= circleData.radius)
