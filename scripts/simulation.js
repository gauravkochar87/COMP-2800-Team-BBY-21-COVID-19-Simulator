///////////////////////////////////////////////////////////////
////               ALL CONSTANTS DECLARATION               ////
///////////////////////////////////////////////////////////////

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
let peopleCount = 100;
let easter = false;


///////////////////////////////////////////////////////////////
////              SETS CANVAS HEIGHT AND WIDTH             ////
///////////////////////////////////////////////////////////////

canvas.width = document.getElementById('sim').offsetWidth;
canvas.height = document.getElementById('sim').offsetHeight;
if (document.getElementById('sim').offsetWidth < 500) {
    peopleCount = 50;
    radius = 6;
}

///////////////////////////////////////////////////////////////
////                  BALL OBJECT CREATION                 ////
///////////////////////////////////////////////////////////////


class Ball {
    constructor(x, y, radius, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
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
    }


    // EASTER EGG FUNCTION //

    update2() {
        //if (this.status) {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy;
        } else {
            this.dy += 1;
        }

        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }

        this.y += this.dy;
        this.x += this.dx;

        this.draw()
    }

}


// Implementation

let ball = [];;

///////////////////////////////////////////////////////////////
////                  CASE 1 where no masks                ////
///////////////////////////////////////////////////////////////

function init1() {
    ball = [];
    for (let i = 0; i < peopleCount; i++) {
        let y = randomNum(radius, canvas.height - radius);
        let x = randomNum(radius, canvas.width - radius);
        let dx = Math.random() * 2 + 1;
        let dy = Math.random() * 2 + 1;
        let color;


        // to make 1st person infected
        if (i === 0) {
            x = 50;
            y = 50;
            dx = 1;
            dy = 1;
            color = 'ff0000';

        } else {

            color = 'C0C0C0';
        }

        // to move people based on self isolation factor
        //isolation factor 1 means 100%, 2 means 50% and so on...
        if (i % isolationFactor === 0 && i > 0) {
            dx = 0;
            dy = 0;
        }

        //to make sure balls don't overlap when being created
        if (i > 0) {
            for (let j = 0; j < ball.length; j++) {
                if (distance(x, y, ball[j].x, ball[j].y) - radius * 2 < 0) {
                    y = randomNum(radius, canvas.height - radius);
                    x = randomNum(radius, canvas.width - radius);
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

        let y = randomNum(radius, canvas.height - radius);
        let x = randomNum(radius, canvas.width - radius);
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
        let maskedNumber = randomNum(1, 10);
        if (i % maskedNumber === 0 && i > 0) {
            color = '0000ff';
        }

        if (i > 0) { //to make sure balls don't overlap
            for (let j = 0; j < ball.length; j++) {
                if (distance(x, y, ball[j].x, ball[j].y) - radius * 2 < 0) {
                    y = randomNum(radius, canvas.height - radius);
                    x = randomNum(radius, canvas.width - radius);
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
        radius = randomNum(10, 30);
        if (document.getElementById('sim').offsetWidth < 500) {

            radius = randomNum(5, 15);
        }
        let y = randomNum(radius, canvas.height - radius);
        let x = randomNum(radius, canvas.width - radius);
        let color = Math.floor(Math.random() * 16777215).toString(16);
        let dx = randomNum(-3, 3);
        let dy = randomNum(1, 3);
        ball.push(new Ball(x, y, radius, dx, dy, color));
    }
    easter = true;
}


///////////////////////////////////////////////////////////////
////          Sets isolation factor and Init func          ////
///////////////////////////////////////////////////////////////

$(document).ready(function () {
    $('input[type=radio]').click(function () {
        console.log(this.value);
        isoValue = parseInt(this.value);
        console.log(isoValue);
        console.log(isoValue === 100);

        if (isoValue === 0) {
            isolationFactor = 0;
        } else {
            isolationFactor = (100 / isoValue);
        }
        console.log(isolationFactor);
        status = true;
        init1();
        if (isoValue === 100) {
            init1();
        }
        checkbox.addEventListener('change', function () {
            if (isoValue === 100) {
                status = true;
                console.log('Checked2');
                easter = true;
                init3();
            } else if (this.checked) {
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
});


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
    if (isoValue === 100 && easter) {
        sound.play();
        for (let index = 0; index < ball.length; index++) {
            ball[index].update2();

        }
        document.getElementById('message').style = "display:block; border:2px dashed yellow;margin: 2%;color: wheat;text-align:center;font-size:2em";
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
    status = false;
    easter = false;
    location.reload();

}


///////////////////////////////////////////////////////////////
////                  UTILITY FUNCTIONS                    ////
///////////////////////////////////////////////////////////////

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}


///////////////////////////////////////////////////////////////
////                EXECUTING ANIMATIONS                   ////
///////////////////////////////////////////////////////////////

document.getElementById('start').onclick = animate;
document.getElementById('stop').onclick = inanimate;