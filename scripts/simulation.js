// import utils from './utils'
let status = true;
const peopleCount = 100;
let isolationFactor; // % of people who self isolate
let allInfected = false;
const radius = 10;
const iso = document.getElementById('iso');
const checkbox = document.querySelector('input[type="checkbox"]');
let peopleInfectedCount = 1;

console.log(document.getElementById('sim').clientWidth)
console.log(document.getElementById('sim').offsetWidth)

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
console.log(c);
console.log(innerWidth);
canvas.width = document.getElementById('sim').offsetWidth;
canvas.height = document.getElementById('sim').offsetHeight;

console.log(isolationFactor);
// const mouse = {
//     x: innerWidth / 2,
//     y: innerHeight / 2
// }
// console.log(mouse.x);

//const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', 'red']

// Event Listeners
// addEventListener('mousemove', (event) => {
//   //console.log(event.clientX)
//   mouse.x = event.clientX
//   mouse.y = event.clientY
// })

// addEventListener('click', () => {
//   canvas.width = window.innerWidth
//   canvas.height = window.innerHeight

//   init()
// })

// Objects created using class is ECMA 6
class Ball {
    constructor(x, y, radius, dx, dy, color) {
        // this.status = true;
        // if(dx == 0 && dy == 0){
        //   this.status = false;
        // }
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.status = true; // to check if this person is counted as infected or not
        this.radius = radius;
        this.color = '#' + color;
        if (this.dx === 0 && this.dy === 0) {
            this.width = 3;
            this.color = '#C0C0C0';
        } else {
            this.width = 1;
        }

    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color; //"rgba(0, 0, 200, 0)" for transparent fill //fillstyle for filling color
        c.strokeStyle = 'black'; //strokestyle for only color in the stroke
        c.fill()
        c.lineWidth = this.width;
        c.stroke();
        c.closePath()


    }

    update(ball) {

        this.draw()
        // to check collision between all balls

        for (let i = 0; i < ball.length; i++) {
            if (this === ball[i]) { // to avoid comparing a ball with itself
                continue;
            }
            if (distance(this.x, this.y, ball[i].x, ball[i].y) - this.radius * 2 < 0) {
                //console.log("collision detected");
                if (ball[i].color == '#ff0000' && (this.dy !== 0 && this.dx !== 0)) {
                    if (this.color !== '#0000ff') {
                        this.color = '#ff0000';
                        this.status = false;
                        // this.dx = 1;
                        // this.dy = 1;
                    }
                }
            }
        }


        // to make sure balls remain within canvas width and height
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.dx = -this.dx;
        }

        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //to check if everyone is infected or not

        // for (let index = 1; index < ball.length; index++) {
        //     if (ball[index].color == '#ff0000' && !(ball[index].status)) {
        //         peopleInfectedCount++;
        //         ball[index].status = true;
        //     }

        // }


        // if (peopleInfectedCount === (peopleCount / isolationFactor) + 1) {
        //     for (let index = 0; index < ball.length; index++) {
        //         ball[index].dx = 0;
        //         ball[index].dy = 0;
        //     }

        //alert("everyone is infected");
        // let d = new Date();
        // let n = d.getSeconds();
        //let el = document.getElementById('seconds-counter');
        //el.innerHTML = "Number";
    }

    //console.log(peopleInfectedCount);

}

// Implementation

let ball = [];;

///////////////////////////////////////////////////////////////
////                  CASE 1 where no masks                ////
///////////////////////////////////////////////////////////////
function init1() {
    ball = [];
    for (let i = 0; i < peopleCount; i++) {
        //randomIntFromRange(10, 50);
        let y = randomIntFromRange(radius, canvas.height - radius);
        let x = randomIntFromRange(radius, canvas.width - radius);
        let dx = Math.random() * 2 + 1; // - .5;
        let dy = Math.random() * 2 + 1; // - .5;
        let color;

        // to make 1st person infected
        if (i === 0) {
            x = 50;
            y = 50;
            dx = 1;
            dy = 1;
            color = 'ff0000';

        } else {

            color = 'C0C0C0'; // Math.floor(Math.random() * 16777215).toString(16);
        }


        // to move people based on self isolation factor
        if (i % isolationFactor === 0 && i > 0) { //isolation factor 1 means 100% 2 means 50% and so on...
            dx = 0;
            dy = 0;
        }

        //to make some blue dots which represent masks
        // if (i % 5 === 0 && i > 0) {
        //     color = '0000ff';
        // }

        if (i > 0) { //to make sure balls don't overlap
            for (let j = 0; j < ball.length; j++) {
                if (distance(x, y, ball[j].x, ball[j].y) - radius * 2 < 0) {
                    y = randomIntFromRange(radius, canvas.height - radius);
                    x = randomIntFromRange(radius, canvas.width - radius);
                    j = -1;
                }
            }
        }

        ball.push(new Ball(x, y, radius, dx, dy, color));

    }

}

///////////////////////////////////////////////////////////////
////                  CASE 2 where no masks                ////
///////////////////////////////////////////////////////////////
function init2() {
    ball = [];
    for (let i = 0; i < peopleCount; i++) {
        //randomIntFromRange(10, 50);
        let y = randomIntFromRange(radius, canvas.height - radius);
        let x = randomIntFromRange(radius, canvas.width - radius);
        let dx = Math.random() * 2 + 1; // - .5;
        let dy = Math.random() * 2 + 1; // - .5;
        let color;

        // to make 1st person infected
        if (i === 0) {
            x = 50;
            y = 50;
            dx = 1;
            dy = 1;
            color = 'ff0000';

        } else {

            color = 'C0C0C0'; // Math.floor(Math.random() * 16777215).toString(16);
        }


        // to move people based on self isolation factor
        if (i % isolationFactor === 0 && i > 0) { //isolation factor 1 means 100% 2 means 50% and so on...
            dx = 0;
            dy = 0;
        }

        //to make some blue dots which represent masks
        let maskedNumber = randomIntFromRange(1, 10);
        if (i % maskedNumber === 0 && i > 0) {
            color = '0000ff';
        }

        if (i > 0) { //to make sure balls don't overlap
            for (let j = 0; j < ball.length; j++) {
                if (distance(x, y, ball[j].x, ball[j].y) - radius * 2 < 0) {
                    y = randomIntFromRange(radius, canvas.height - radius);
                    x = randomIntFromRange(radius, canvas.width - radius);
                    j = -1;
                }
            }
        }

        ball.push(new Ball(x, y, radius, dx, dy, color));

    }

}


///////////////////////////////////////////////////////////////
////               Calculates isolation factor             ////
///////////////////////////////////////////////////////////////
iso.addEventListener('input', (e) => {
    if (e.target.value === 0) {
        isolationFactor = 0;
    } else {
        isolationFactor = Math.floor((100 / e.target.value));
    }
    console.log(isolationFactor);
    status = true;
    init1();
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            // do this
            console.log('Checked');
            status = true;
            init2();
        } else {
            // do that
            console.log('Not checked');
            status = true;
            init1();
        }
    });
});

// let checkbox = document.querySelector('input[type="checkbox"]');
// init1();
// checkbox.addEventListener('change', function() {
//     if (checkbox.checked) {
//         // do this
//         console.log('Checked');
//         status = true;
//         init2();
//     } else {
//         // do that
//         console.log('Not checked');
//         status = true;
//         init1();
//     }
// });

// Animation Loop
let x = 0;

function animate() {
    //to start the clock
    // if (x < 1) {
    //     track();
    //     x++;
    // }
    if (!status) {
        return;
    }
    requestAnimationFrame(animate) // this calls animate fun over and over again
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (let index = 0; index < ball.length; index++) {
        ball[index].update(ball);

    }
}

function inanimate() {
    ball = [];
    c.clearRect(0, 0, canvas.width, canvas.height);
    iso.value = ' ';
    checkbox.checked = false;
    status = false;
}


//init();

//animate();

//utility functions

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}


//timer for number of days

// let sec = 0;

// function count(val) {
//     return val > 9 ? val : "0" + val;
// }

// function track() {
//     setInterval(function () {
//         document.getElementById("days").innerHTML = count(++sec);
//         //document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
//     }, 1000);
// }

document.getElementById('start').onclick = animate;
document.getElementById('stop').onclick = inanimate;