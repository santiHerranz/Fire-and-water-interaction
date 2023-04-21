class Game {

    static DRAWMODE = {NORMAL:1, WIREFRAME:2}
    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.stop = false;
        this.dt = 10 / 100;			//{dt=60/100}; //


        this.wind = { x: 0, y: 0 };

        this.hotSpot = [];
        this.clouds = [];
        this.smoke = [];


        this.drawMode = Game.DRAWMODE.NORMAL;



        // let cloud = new Cloud(x, y);
        // cloud.addListener(this);
        // this.clouds.push(cloud);

    }


    step(dt) {


        if (Math.random() > .99) {
            let fire = new HotSpot(cWidth * Math.random(), groundPoint);
            fire.addListener(this);
            this.hotSpot.push(fire);            
        }


        if (mouseDown && !mouseUp) {

            if (mousePos.y < groundPoint) {
                if (this.clouds.length < 50) {
                        let cloud = new Cloud(mousePos.x, mousePos.y);
                        cloud.addListener(this);
                        this.clouds.push(cloud);
                }
            } else {
                if (this.hotSpot.length < 50) {
                        let fires = this.hotSpot.filter(fire => { return this.collide(fire,{x:mousePos.x,y:groundPoint,radius:20})})
                        if (fires.length > 0)
                            fires.forEach(fire => fire.health = fire.healthMax );
                        else {
                            let fire = new HotSpot(mousePos.x, mousePos.y);
                            fire.addListener(this);
                            this.hotSpot.push(fire);
                        }

                }
            }


        }

        this.hotSpot.forEach(fire => fire.step(dt));
        this.clouds.forEach(cloud => cloud.step(dt));
        this.smoke.forEach(particle => particle.step(dt));

        this.hotSpot.forEach(fire => {
            this.clouds
                //.filter(cloud => cloud.activeTime > 0)
                .forEach(cloud => {
                    if (this.collide(fire, cloud)) {
                        if (cloud.damagePoints > 0) {
                            fire.health -= cloud.damagePoints;
                            cloud.activeTime = 0;
                            cloud.damagePoints = 0;
                        }
                    }
                });
        });


        this.hotSpot = this.hotSpot.filter(fire => fire.health > 0);
        this.clouds = this.clouds.filter(cloud => cloud.life > 0);
        this.smoke = this.smoke.filter(particle => particle.life > 0);



    }

    draw() {

        this.smoke.forEach(particle => particle.draw(ctx));
        this.hotSpot.forEach(particle => particle.draw(ctx));
        this.clouds.forEach(particle => particle.draw(ctx));
    }

    event(type, position) {
        // if (type == "mousedown") {

        //     if (position.y < groundPoint) {
        //         if (this.clouds.length < 50) {
        //                 let cloud = new Cloud(position.x, position.y);
        //                 cloud.addListener(this);
        //                 this.clouds.push(cloud);
        //         }
        //     } else {
        //         if (this.hotSpot.length < 50) {
        //                 let fires = this.hotSpot.filter(fire => { return this.collide(fire,{x:position.x,y:groundPoint,radius:20})})
        //                 if (fires.length > 0)
        //                     fires.forEach(fire => fire.health = fire.healthMax );
        //                 else {
        //                     let fire = new HotSpot(position.x, position.y);
        //                     fire.addListener(this);
        //                     this.hotSpot.push(fire);
        //                 }

        //         }
        //     }


        // }
    }

    smoking(position) {
        if (randNum(1, 3) == 1) {
            let pos = { x: position.x + (Math.random() - 0.5) * 20, y: groundPoint };
            let vel = { x: 0, y: -20 };
            this.smoke.push(new SmokeParticle(pos.x, pos.y, vel));
        }
    }

	distance(dot, otherDot) {
		var dx = otherDot.x - dot.x,
			dy = otherDot.y - dot.y,
			dist = Math.sqrt(dx * dx + dy * dy);
		return dist;
	}

    collide(dot, otherDot) {
        var dx = otherDot.x - dot.x,
            dy = otherDot.y - dot.y,
            dist = Math.sqrt(dx * dx + dy * dy),
            minDist = dot.radius + otherDot.radius;
        if (dist < minDist) {
            return true;
        }
        return false;
    }
}