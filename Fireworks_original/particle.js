function Particle(x, y, exploder, hue) {
  this.pos = createVector(x,y);
  this.exploder = exploder;
  this.lifespan = 255;
  this.hue = hue;

  // How fast the explosion disappears
  this.lifeDecrease = 6;

  if (!exploder) {
    this.vel = createVector(0, random(-1 * height / 27, -1 * height / 36));
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(.5,6));
  }
  this.acc = createVector(0,0);

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    if (this.exploder) {
      this.vel.mult(0.95);
      this.lifespan -= this.lifeDecrease;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    stroke(this.hue, 255, this.lifespan, this.lifespan);
  }

  this.show = function() {
    colorMode(HSB);
    if (this.exploder) {
      strokeWeight(2);
      //stroke(this.hue, 255, 255, this.lifespan);
    } else {
      strokeWeight(4);
      stroke(this.hue, 255, 255);
    }
    point(this.pos.x, this.pos.y);
  }

  this.done = function() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }
}
