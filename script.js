
let cv = document.querySelector("canvas")
REZ = [1000, 500]
cv.width = REZ[0];
cv.height = REZ[1];
const ctx = cv.getContext("2d");

//posisjon
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

class player{
    constructor({
    position = { x: 200, y: 200 },
    color = 'red',
    charradius = radius,
    height = 100,
  }){
    this.position = position
    this.radius = charradius
    this.height = height
    this.color = color
  }
draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color
        ctx.fill();
        
    }
}

const char = new player({
    position: {
        x: 100,
        y: 100
    },
    color: "red"
})

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
    char.draw()
    char.position.x += xspe

    // dette skaper tyngdekraft
    if (char.position.y <= REZ[1] - radius + 1 ) {
        char.position.y += yvel
        yvel += G
        
    }
    // dette er kolisjon
    else {
        canJump = true
        yvel = 0
        char.position.y = REZ[1] - radius + 1

    }

    if (char.position.x >= rigtEdge) {
        Number(viewportTransform.x -= REZ[0])
        char.position.x += 10
        rigtEdge += REZ[0]
        leftEdge += REZ[0]
    }
    if (char.position.x == leftEdge) {
        Number(viewportTransform.x += REZ[0])
        char.position.x -= 10
        rigtEdge -= REZ[0]
        leftEdge -= REZ[0]
    }
    platforms()
    // denne lager neste frame
    requestAnimationFrame(animate);
}

// dette er kontrollene
document.addEventListener("keydown", (event) => {

    switch (event.key) {
        case ' ':
            if (char.position.y >= 0 + radius && canJump) {
                yvel += jump
                char.position.y += yvel
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