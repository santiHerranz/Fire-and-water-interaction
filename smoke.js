
var SmokeParticle = function(x,y, v, r = 1) {

    var smokeColors = ['rgba(255,255,255,0.2)', 'rgba(200,200,200,0.2)','rgba(230,230,230,0.2)'];

	v = v || {x:1,y:3}

	this.x = x;
	this.y = y;
	this.vx = v.x;
	this.vy = v.y;
	this.radius = r;
	this.life = 200;
    this.strokeColor = smokeColors[randNum(0, smokeColors.length-1)];
    this.fillColor = smokeColors[randNum(0, smokeColors.length-1)];
}

SmokeParticle.prototype.step = function(dt) {

    this.vy += gravity*0.01;

    this.vx += game.wind.x;
    this.vy += game.wind.y;

    // apply forces	
    this.x += dt * this.vx;
    this.y += dt * this.vy;

    if (this.y > groundPoint)
        this.y = groundPoint;

    this.life -= 1;

    if (this.radius < 20) {
        this.radius += 0.1;
    }
}

SmokeParticle.prototype.draw = function(ctx) {

ctx.save();
ctx.beginPath();
ctx.lineWidth  = 0;
ctx.strokeStyle = this.strokeColor;
ctx.fillStyle = this.fillColor;
ctx.arc(this.x, this.y, this.radius , 0, 2*Math.PI,false);
ctx.fill();
ctx.stroke();
ctx.restore();


}

