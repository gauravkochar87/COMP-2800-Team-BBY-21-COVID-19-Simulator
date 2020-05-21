///////////////////////////////////////////////////////////////
////               ALL CONSTANTS DECLARATION               ////
///////////////////////////////////////////////////////////////

const iso = document.getElementById('iso');
const checkbox = document.querySelector('input[type="checkbox"]');
const myCanvas = document.getElementById('sim');
const con = myCanvas.getContext('2d');

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

myCanvas.width = document.getElementById('sim').offsetWidth;
myCanvas.height = document.getElementById('sim').offsetHeight;
if (document.getElementById('sim').offsetWidth < 500) {
    peopleCount = 50;
    radius = 6;
}

///////////////////////////////////////////////////////////////
////                  BALL OBJECT CREATION                 ////
///////////////////////////////////////////////////////////////


class Ball {
    constructor(x, y, radius, mx, my, color) {
        this.x = x;
        this.y = y;
        this.mx = mx;
        this.my = my;
        this.radius = radius;
        this.color = '#' + color;
        if (this.mx === 0 && this.my === 0) {
            this.width = 3;
            this.color = '#C0C0C0';
        } else {
            this.width = 1;
        }

    }

    create() {
        con.beginPath()
        con.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        con.fillStyle = this.color; //"rgba(0, 0, 200, 0)" for transparent fill //fillstyle for filling color
        con.strokeStyle = 'black'; //strokestyle for only color in the stroke
        con.fill()
        con.lineWidth = this.width;
        con.stroke();
        con.closePath()


    }

    update(ball) {

        this.create()
        // to check collision between all balls

        for (let i = 0; i < ball.length; i++) {
            if (this === ball[i]) { // to avoid comparing a ball with itself
                continue;
            }
            if (distance(this.x, this.y, ball[i].x, ball[i].y) - this.radius * 2 < 0) {
                //console.log("collision detected");
                if (ball[i].color == '#ff0000' && (this.my !== 0 && this.mx !== 0)) {
                    if (this.color !== '#0000ff') {
                        this.color = '#ff0000';
                        this.status = false;
                        // this.mx = 1;
                        // this.my = 1;
                    }
                }
            }
        }


        // to make sure balls remain within canvas width and height
        if (this.x - this.radius <= 0 || this.x + this.radius >= myCanvas.width) {
            this.mx = -this.mx;
        }

        if (this.y - this.radius <= 0 || this.y + this.radius >= myCanvas.height) {
            this.my = -this.my;
        }

        this.x += this.mx;
        this.y += this.my;
    }


    // EASTER EGG FUNCTION //

    update2() {
        //if (this.status) {
        if (this.y + this.radius + this.my > myCanvas.height) {
            this.my = -this.my;
        } else {
            this.my += 1;
        }

        if (this.x + this.radius + this.mx > myCanvas.width || this.x - this.radius <= 0) {
            this.mx = -this.mx;
        }

        this.y += this.my;
        this.x += this.mx;

        this.create()
    }

}


// Implementation

let ball = [];;

///////////////////////////////////////////////////////////////
////                  CASE 1 where no masks                ////
///////////////////////////////////////////////////////////////

function case1() {
    ball = [];
    for (let i = 0; i < peopleCount; i++) {
        let y = randomNum(radius, myCanvas.height - radius);
        let x = randomNum(radius, myCanvas.width - radius);
        let mx = Math.random() * 2 + 1;
        let my = Math.random() * 2 + 1;
        let color;


        // to make 1st person infected
        if (i === 0) {
            x = 50;
            y = 50;
            mx = 1;
            my = 1;
            color = 'ff0000';

        } else {

            color = 'C0C0C0';
        }

        // to move people based on self isolation factor
        //isolation factor 1 means 100%, 2 means 50% and so on...
        if (i % isolationFactor === 0 && i > 0) {
            mx = 0;
            my = 0;
        }

        //to make sure balls don't overlap when being created
        if (i > 0) {
            for (let j = 0; j < ball.length; j++) {
                if (distance(x, y, ball[j].x, ball[j].y) - radius * 2 < 0) {
                    y = randomNum(radius, myCanvas.height - radius);
                    x = randomNum(radius, myCanvas.width - radius);
                    j = -1;
                }
            }
        }

        ball.push(new Ball(x, y, radius, mx, my, color));

    }

}

///////////////////////////////////////////////////////////////
////                  CASE 2 WITH  MAKS                    ////
///////////////////////////////////////////////////////////////
function case2() {
    ball = [];
    for (let i = 0; i < peopleCount; i++) {

        let y = randomNum(radius, myCanvas.height - radius);
        let x = randomNum(radius, myCanvas.width - radius);
        let mx = Math.random() * 2 + 1; // - .5;
        let my = Math.random() * 2 + 1; // - .5;
        let color;


        // to make 1st person infected
        if (i === 0) {
            x = 50;
            y = 50;
            mx = 1;
            my = 1;
            color = 'ff0000';

        } else {

            color = 'C0C0C0'; // Math.floor(Math.random() * 16777215).toString(16);
        }


        // to move people based on self isolation factor
        if (i % isolationFactor === 0 && i > 0) { //isolation factor 1 means 100% 2 means 50% and so on...
            mx = 0;
            my = 0;
        }

        //to make some blue dots which represent masks
        let maskedNumber = randomNum(1, 10);
        if (i % maskedNumber === 0 && i > 0) {
            color = '0000ff';
        }

        if (i > 0) { //to make sure balls don't overlap
            for (let j = 0; j < ball.length; j++) {
                if (distance(x, y, ball[j].x, ball[j].y) - radius * 2 < 0) {
                    y = randomNum(radius, myCanvas.height - radius);
                    x = randomNum(radius, myCanvas.width - radius);
                    j = -1;
                }
            }
        }

        ball.push(new Ball(x, y, radius, mx, my, color));

    }

}

///////////////////////////////////////////////////////////////
////                  CASE 3 EASTER EGG                    ////
///////////////////////////////////////////////////////////////

function case3() {
    ball = [];

    for (let i = 0; i < 80; i++) {
        radius = randomNum(10, 30);
        if (document.getElementById('sim').offsetWidth < 500) {

            radius = randomNum(5, 15);
        }
        let y = randomNum(radius, myCanvas.height - radius);
        let x = randomNum(radius, myCanvas.width - radius);
        let color = Math.floor(Math.random() * 16777215).toString(16);
        let mx = randomNum(-3, 3);
        let my = randomNum(1, 3);
        ball.push(new Ball(x, y, radius, mx, my, color));
    }
    easter = true;
}


///////////////////////////////////////////////////////////////
////          Sets isolation factor and case func          ////
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
        case1();
        if (isoValue === 100) {
            case1();
        }
        checkbox.addEventListener('change', function () {
            if (isoValue === 100) {
                status = true;
                console.log('Checked2');
                easter = true;
                case3();
            } else if (this.checked) {
                // do this
                console.log('Checked');
                status = true;
                case2();
            } else {
                // do that
                console.log('Not checked');
                status = true;
                case1();
            }
        });

    });
});


///////////////////////////////////////////////////////////////
////                    ANIMATION LOOP                     ////
///////////////////////////////////////////////////////////////

function appear() {

    if (!status) {
        return;
    }
    requestAnimationFrame(appear) // this updates the animation 
    con.clearRect(0, 0, myCanvas.width, myCanvas.height);
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
function disappear() {
    ball = [];
    con.clearRect(0, 0, myCanvas.width, myCanvas.height);
    status = false;
    easter = false;
    location.reload();

}


///////////////////////////////////////////////////////////////
////                  SUPPORTING FUNCTIONS                 ////
///////////////////////////////////////////////////////////////


function distance(xcor1, ycor1, xcor2, ycor2) {
    let x = xcor2 - xcor1
    let y = ycor2 - ycor1
    let result;
    result = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    return result;
}

function randomNum(minimum, maximum) {
    let result = Math.floor(Math.random() * (maximum - minimum + 1) + minimum); 
    return result;
}


///////////////////////////////////////////////////////////////
////                EXECUTING ANIMATIONS                   ////
///////////////////////////////////////////////////////////////

document.getElementById('start').onclick = appear;
document.getElementById('stop').onclick = disappear;