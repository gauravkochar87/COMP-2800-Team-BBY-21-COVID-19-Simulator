///////////////////////////////////////////////////////////////
////               ALL CONSTANTS DECLARATION               ////
///////////////////////////////////////////////////////////////

const peopleCount = 100;
const iso = document.getElementById('iso');
const checkbox = document.querySelector('input[type="checkbox"]');
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

///////////////////////////////////////////////////////////////
////               ALL VARIABLES DECLARATION               ////
///////////////////////////////////////////////////////////////

let peopleInfectedCount = 1;
let isoValue;
let sound = new Audio("../audio/easter.mp3");
let status = true;
let isolationFactor; // % of people who self isolate
let allInfected = false;
let radius = 10;

//console.log(document.getElementById('sim').clientWidth)
//console.log(document.getElementById('sim').offsetWidth)


//console.log(c);
//console.log(innerWidth);

///////////////////////////////////////////////////////////////
////              SETS CANVAS HEIGHT AND WIDTH             ////
///////////////////////////////////////////////////////////////

canvas.width = document.getElementById('sim').offsetWidth;
canvas.height = document.getElementById('sim').offsetHeight;

//console.log(isolationFactor);

// addEventListener('click', () => {
//   canvas.width = window.innerWidth
//   canvas.height = window.innerHeight

//   init()
// })

///////////////////////////////////////////////////////////////
////                  BALL OBJECT CREATION                 ////
///////////////////////////////////////////////////////////////


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

    // EASTER EGG FUNCTION //

    update2() {
        //if (this.status) {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy; //multiply by friction if to create  gravity
        } else {
            this.dy += 1; // this rate decide the velocity of the ball more faster; less slower
        }

        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }

        this.y += this.dy;
        this.x += this.dx;

        this.draw()
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
        radius = 10;

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
////                  CASE 2 WITH  MAKS                    ////
///////////////////////////////////////////////////////////////
function init2() {
    ball = [];
    for (let i = 0; i < peopleCount; i++) {

        let y = randomIntFromRange(radius, canvas.height - radius);
        let x = randomIntFromRange(radius, canvas.width - radius);
        let dx = Math.random() * 2 + 1; // - .5;
        let dy = Math.random() * 2 + 1; // - .5;
        let color;
        radius = 10;

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
////                  CASE 3 EASTER EGG                    ////
///////////////////////////////////////////////////////////////

function init3() {
    ball = [];

    for (let i = 0; i < 80; i++) {
        radius = randomIntFromRange(10, 30);
        let y = randomIntFromRange(radius, canvas.height - radius);
        let x = randomIntFromRange(radius, canvas.width - radius);
        let color = Math.floor(Math.random() * 16777215).toString(16);
        let dx = randomIntFromRange(-3, 3);
        let dy = randomIntFromRange(1, 3);
        ball.push(new Ball(x, y, radius, dx, dy, color));
    }
    easter = true;
}


///////////////////////////////////////////////////////////////
////          Sets isolation factor and Init func          ////
///////////////////////////////////////////////////////////////

iso.addEventListener('input', (e) => {
    isoValue = parseInt(e.target.value);
    console.log(isoValue);
    console.log(isoValue === 100);

    if (isoValue === 0) {
        isolationFactor = 0;
    } else {
        isolationFactor = Math.floor((100 / isoValue));
    }
    console.log(isolationFactor);
    status = true;
    init1();
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            if (isoValue === 100) {
                status = true;
                console.log('Checked2');
                init3();
            } else {
                // do this
                console.log('Checked');
                status = true;
                init2();
            }
        } else {
            // do that
            console.log('Not checked');
            status = true;
            init1();
        }
    });
});
console.log(checkbox.checked);

///////////////////////////////////////////////////////////////
////                    ANIMATION LOOP                     ////
///////////////////////////////////////////////////////////////

function animate() {

    if (!status) {
        return;
    }
    requestAnimationFrame(animate) // this calls animate fun over and over again
    c.clearRect(0, 0, canvas.width, canvas.height);
    //console.log(isoValue);
    if (isoValue === 100) {
        sound.play();
        for (let index = 0; index < ball.length; index++) {
            ball[index].update2();

        }
    } else {
        for (let index = 0; index < ball.length; index++) {
            ball[index].update(ball);

        }
    }
}

///////////////////////////////////////////////////////////////
////                    CLEARS ANIMATION                   ////
///////////////////////////////////////////////////////////////
function inanimate() {
    ball = [];
    c.clearRect(0, 0, canvas.width, canvas.height);
    iso.value = ' ';
    checkbox.checked = false;
    status = false;
    location.reload();


}



///////////////////////////////////////////////////////////////
////                  UTILITY FUNCTIONS                    ////
///////////////////////////////////////////////////////////////

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


///////////////////////////////////////////////////////////////
////                EXECUTING ANIMATIONS                    ////
///////////////////////////////////////////////////////////////

document.getElementById('start').onclick = animate;
document.getElementById('stop').onclick = inanimate;




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