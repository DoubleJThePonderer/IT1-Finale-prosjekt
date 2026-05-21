
let cv = document.querySelector("canvas")
REZ = [1000, 500]
cv.width = REZ[0];
cv.height = REZ[1];
const ctx = cv.getContext("2d");

//posisjon
x = REZ[0]/2
y = 100
radius = 30

rigtEdge = REZ[0]
leftEdge = 0

var viewportTransform = {
    x: 0,
    y: 0,
    scale: 1
}


// movementvariabler
let canJump = true
yvel = 8
jump = -10
G = 0.4
xspe = 0

function player() {
    ctx.beginPath();
    ctx.arc(x, y, radius, Math.PI * 2, false)
    ctx.fillStyle = "red"
    ctx.fill();
}

function platforms() {
    ctx.fillStyle = "blue"
    ctx.fillRect(50, 200, 100, 10)
    ctx.fillRect(900,200, 200, 20)
}

function animate() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, REZ[0], REZ[1])


    ctx.setTransform(
        viewportTransform.scale,
        0,
        0,
        viewportTransform.scale,
        viewportTransform.x,
        viewportTransform.y
    )
    player()
    x += xspe
    // platx += platxsp
    // dette skaper tyngdekraft
    if (y <= REZ[1] - radius + 1 ) {
        y += yvel
        yvel += G
        
    }
    // dette er kolisjon
    else {
        canJump = true
        yvel = 0
        y = REZ[1] - radius + 1

    }

    if (x >= rigtEdge) {
        Number(viewportTransform.x -= 1000)
        x += 10
        rigtEdge += 1000
        leftEdge += 1000
    }
    if (x == leftEdge) {
        Number(viewportTransform.x += 1000)
        x -= 10
        rigtEdge -= 1000
        leftEdge -= 1000
    }
    platforms()
    // denne lager neste frame
    requestAnimationFrame(animate);
}

// dette er kontrollene
document.addEventListener("keydown", (event) => {

    switch (event.key) {
        case ' ':
            if (y >= 0 + radius && canJump) {
                yvel += jump
                y += yvel
                canJump= false

            }
            return
        case 'a':
            xspe = -10
            return
        case 'd':
            xspe = 10
            return
    }
})

document.addEventListener("keyup", (event) =>{
    switch(event.key){
        case 'a':
        case 'd':
            xspe = 0
            // platxsp = 0
            
    }
})

animate();

// ctx.beginPath();
// ctx.moveTo(50,300)
// ctx.lineTo(300,300)
// ctx.strokeStyle = "red"
// ctx.stroke();
// ctx.lineTo(100,100)
// ctx.strokeStyle = "purple"
// ctx.stroke();


/*
for (let i = 0; i < 200; i++) {
    let x = Math.random() * window.innerWidth
    let y = Math.random() * window.innerHeight
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    ctx.beginPath();
    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")"
    ctx.arc(x, y, 60, 0, Math.PI * 2, false);
    ctx.fill();
}
let px = 100
let py = 100
document.addEventListener("keydown", () => {
    ctx.clearRect(px, py, 100, 100);
    py += 100;
    ctx.fillRect(px, py, 100, 100);
})
*/