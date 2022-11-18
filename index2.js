const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

class Circle {
    constructor(x, y, radius, length, theta0) {
        this.axisX = window_width/2;
        this.axisY = 100;
        this.x = x + this.axisX;
        this.y = y + this.axisY;
        this.radius = radius;
        this.length = length;
        this.theta0 = theta0;
        this.time = Date.now();
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = 'green';
        context.fill()
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        context.stroke();
        context.closePath();
        
        context.beginPath();
        context.moveTo(this.axisX, this.axisY);
        context.lineWidth = 4;
        context.lineTo(this.x, this.y);
        context.stroke();
    }

    update(context) {
        context.clearRect(0, 0, window_width, window_height);

        this.draw(context);

        var b = 0.007;
        var m = 10;
        var t = Date.now() - this.time;
        //var theta = this.theta0 * Math.sin((9.8/(this.length/0.1)) * t + this.theta0);
        //var theta = this.theta0 * Math.pow(Math.E, (-b/(2*m))*t) * Math.cos((Math.sqrt(Math.pow(9.8/(this.length/100), 2)-Math.pow(b/(2*m), 2))) * t + this.theta0);
        var theta = this.theta0 * Math.pow(Math.E, (-b/(2*m))*t) * Math.cos((Math.sqrt(Math.pow(9.8/(this.length/0.15), 2) - Math.pow(b/(2*m), 2))) * t + this.theta0);
        this.x = this.length * Math.sin(theta) + this.axisX;
        this.y = this.length * Math.cos(theta) + this.axisY;
        //console.log(this.x, this.y)
        //console.log(theta)
    }
}

let length = 300;
let theta0 = Math.PI/4;
let my_circle = new Circle(length * Math.sin(theta0), length * Math.cos(theta0), 20,  length, theta0);

my_circle.draw(context);

let updateCircle = function() {
    requestAnimationFrame(updateCircle);
    my_circle.update(context);
}

updateCircle();