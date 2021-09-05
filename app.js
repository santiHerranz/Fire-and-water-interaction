
var canvas = document.createElement("canvas");
canvas.id = 'canvas';
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 15;
canvas.height = window.innerHeight - 15;
document.body.appendChild(canvas);
cWidth = canvas.width;
cHeight = canvas.height;


// gravity and stuff
var gravity = 0.8;
var dt = 10 / 100;

var groundPoint = cHeight - (cHeight / 6);

var game = new Game(cWidth/2, groundPoint-600);

function randNum (min, max) {                           
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}


var mousePos = { x: 0, y: 0 };
var mouseDown = false;
var mouseUp = false;
// MOUSE MOVE
addEventListener("mousemove", function (evt) {
  mousePos = getMousePos(canvas, evt);
  game.event("mousemove",mousePos);
}, false);
// MOUSE DOWN
addEventListener("mousedown", function (evt) {
  mousePos = getMousePos(canvas, evt);
  mouseDown = true;
  mouseUp = false;
  game.event("mousedown",mousePos);
}, false);
// MOUSE UP
addEventListener("mouseup", function (evt) {
  mousePos = getMousePos(canvas, evt);
  mouseUp = true;
  mouseDown = false;
  game.event("mouseup",mousePos);
}, false);




var drawScene = function () {

  var ground = groundPoint;

  // sky
  ctx.fillStyle = "rgba(135,206,235,0.5)";
  ctx.fillRect(0, 0, cWidth, ground);

  ctx.beginPath();
  ctx.font = "32px Helvetica";
  ctx.fillStyle = "black";
  ctx.fillText("Fire & Water", 100, 100);
  ctx.stroke();

  ctx.beginPath();
  ctx.font = "18px Helvetica";
  ctx.fillStyle = "black";
  ctx.fillText("Click ground to set fire, click sky to throw water", 100, 150);
  ctx.stroke();


  // ground
  ctx.beginPath();
  ctx.moveTo(0, ground);
  ctx.lineTo(cWidth, ground);
  ctx.strokeStyle = "rgba(0,100,50,0.6)";
  ctx.stroke();
  ctx.fillStyle = "rgba(0,200,100,0.6)";
  ctx.fillRect(0, ground, cWidth, cHeight);

}


// UPDATE //
var update = function (dt) {
  game.step(dt);
}

var render = function () {
  ctx.clearRect(0, 0, cWidth, cHeight);
  drawScene();
  game.draw();
}



var main = function () {
  update(dt);
  render();
  requestAnimationFrame(main);
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


main();





























