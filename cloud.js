

function Cloud(x, y, xs, ys) {
  this.x = x;
  this.y = y;
  this.radius = 20;
  this.activeTime = 10;
  this.life = 50;
  this.damagePoints = 100;

  this.max = 30;
  this.speed = 5;
  this.size = 8;

  this.cloudWidth = 20;

  this.particles = [];

  this.listeners = [];


}

Cloud.prototype.addListener = function (listener) {
  this.listeners.push(listener);
}

Cloud.prototype.step = function (dt) {

  //Move the particle based on its horizontal and vertical speeds
  this.x += 0;
  this.y += gravity * 8;

  //Move based on game wind
  this.x += game.wind.x;
  this.y += game.wind.y;

  if (this.y > groundPoint)
    this.y = groundPoint;


  if (this.activeTime > 0) {
    for (var i = 0; i < 1; i++) {
      //Adds a particle at the position, with random horizontal and vertical speeds
      var p = new WaterParticle(this.x + (Math.random() - 0.5) * this.cloudWidth, this.y, ((Math.random() - 0.5) * this.speed) / 2, Math.random() * 2 * this.speed);
      this.particles.push(p);

    }

    this.activeTime -= 1;
  }

  this.life -= 1;

  for (i = 0; i < this.particles.length; i++) {

    //Move the particle based on its horizontal and vertical speeds
    this.particles[i].x += this.particles[i].xs;
    this.particles[i].y += this.particles[i].ys;

    //Move the particle based on its horizontal and vertical speeds
    this.particles[i].x += game.wind.x;
    this.particles[i].y += game.wind.y;

    if (this.particles[i].y > groundPoint)
      this.particles[i].y -= this.particles[i].ys;

    this.particles[i].life++;
    //If the particle has lived longer than we are allowing, remove it from the array.
    if (this.particles[i].life >= this.max) {
      this.particles.splice(i, 1);
      i--;
    }
  }
}

Cloud.prototype.draw = function (ctx) {

  this.drawMode = game.drawMode;


  if (this.drawMode == Game.DRAWMODE.WIREFRAME) {
    ctx.save();
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.restore();
    //return;
  }


  ctx.save();

  ctx.globalCompositeOperation = "source-over";

  //Makes the colors add onto each other, producing
  //that nice white in the middle of the fire
  for (i = 0; i < this.particles.length; i++) {

    //Set the file colour to an RGBA value where it starts off red-orange, but progressively gets more grey and transparent the longer the particle has been alive for
    let r = ((this.particles[i].life * 2));
    let g = ((this.particles[i].life * 2) + 50);
    let b = (260 - this.particles[i].life * 2);
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (((this.max - this.particles[i].life) / this.max) * 0.4) + ")";

    ctx.beginPath();
    //Draw the particle as a circle, which gets slightly smaller the longer it's been alive for
    ctx.arc(this.particles[i].x, this.particles[i].y, (this.max - this.particles[i].life) / this.max * (this.size / 2) + (this.size / 2), 0, 2 * Math.PI);
    ctx.fill();

  }
  ctx.restore();
}


Cloud.prototype.smoking = function (position) {
  this.listeners.forEach(listener => {
    listener.smoking(position);
  });
}

function WaterParticle(x, y, xs, ys) {
  this.x = x;
  this.y = y;
  this.xs = xs;
  this.ys = ys;
  this.life = 0;
}





