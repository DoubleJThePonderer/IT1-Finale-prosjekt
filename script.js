
let cv = document.querySelector("canvas")
REZ = [1000, 500]
cv.width = REZ[0];
cv.height = REZ[1];
const ctx = cv.getContext("2d");

//posisjon
x = 100
y = 100
radius = 30


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
    ctx.clearRect(0, 0, REZ[0], REZ[1])

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
            if (x >= 0 + radius) {
                xspe = -10
                // platxsp = 10
            }
            return
        case 'd':
            xspe = 10
            // platxsp = -10
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