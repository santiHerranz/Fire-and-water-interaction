

function HotSpot(x, y, xs, ys) {
  this.x = x;
  this.y = groundPoint;
  this.radius = 20;

  this.healthMax = 1000;
  this.health = this.healthMax;

  this.max = 100;
  this.speed = 1.5;
  this.size = 8;

  this.fireWidth = 10;

  this.particles = [];

  this.listeners = [];

  this.showLifeIndicator = true;

}

HotSpot.prototype.addListener = function (listener) {
  this.listeners.push(listener);
}

HotSpot.prototype.step = function (dt) {


  this.max = 100 * (this.health/this.healthMax)

  //Move the particle based on its horizontal and vertical speeds
  this.x += 0;
  this.y += gravity * 8;

  //Move based on game wind
  this.x += game.wind.x;
  this.y += game.wind.y;

  if (this.y > groundPoint)
    this.y = groundPoint;

  for (var i = 0; i < 1*this.health/this.healthMax; i++) {
    //Adds a particle at the position, with random horizontal and vertical speeds
    var p = new FireParticle(this.x + (Math.random() - 0.5) * this.fireWidth, groundPoint, ((Math.random() - 0.5) * this.speed) / 2, 0 - Math.random() * 2 * this.speed);
    this.particles.push(p);
  }

  this.smoking({ x: this.x, y: this.y });

  this.health -= 0.1;
}

HotSpot.prototype.draw = function (ctx) {

  this.drawMode = game.drawMode;

  // Life indicator
  if (this.showLifeIndicator) {
    let offset = this.radius * 0.8;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "#ffcccc";
    ctx.lineWidth = 2;
    ctx.moveTo(this.x - 10, groundPoint + offset);
    ctx.lineTo(this.x + 10, groundPoint + offset);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 3;
    ctx.moveTo(this.x - 10, groundPoint + offset);
    ctx.lineTo(this.x - 10 + 20 * (this.health / this.healthMax), groundPoint + offset);
    ctx.stroke();
    ctx.restore();
  }

  if (this.drawMode == Game.DRAWMODE.WIREFRAME) {
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.restore();
    // return;
  }


  ctx.save();
  //Makes the colors add onto each other, producing
  //that nice white in the middle of the fire
  for (i = 0; i < this.particles.length; i++) {

    // ctx.globalCompositeOperation = "source-over";


    if (i < this.particles.length / 2) {
      ctx.globalCompositeOperation = "xor";
    }
    else
      ctx.globalCompositeOperation = "lighter";


    //Set the file colour to an RGBA value where it starts off red-orange, but progressively gets more grey and transparent the longer the particle has been alive for
    let r = (260 - (this.particles[i].life * 2));
    let g = ((this.particles[i].life * 2) + 50);
    let b = (this.particles[i].life * 2);
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (((this.max - this.particles[i].life) / this.max) * 0.4) + ")";

    ctx.beginPath();
    //Draw the particle as a circle, which gets slightly smaller the longer it's been alive for
    ctx.arc(this.particles[i].x, this.particles[i].y, Math.max(1, (this.max - this.particles[i].life) / this.max * (this.size / 2) + (this.size / 2)), 0, 2 * Math.PI);
    ctx.fill();

    //Move the particle based on its horizontal and vertical speeds
    this.particles[i].x += this.particles[i].xs;
    this.particles[i].y += this.particles[i].ys;

    this.particles[i].life++;
    //If the particle has lived longer than we are allowing, remove it from the array.
    if (this.particles[i].life >= this.max) {
      this.particles.splice(i, 1);
      i--;
    }
  }
  ctx.restore();



}


HotSpot.prototype.smoking = function (position) {
  this.listeners.forEach(listener => {
    listener.smoking(position);
  });
}

function FireParticle(x, y, xs, ys) {
  this.x = x;
  this.y = y;
  this.xs = xs;
  this.ys = ys;
  this.life = 0;
}





