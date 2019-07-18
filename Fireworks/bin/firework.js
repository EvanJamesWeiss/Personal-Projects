function Firework() {
  this.hue = random(0, 15);
  this.firework = new Particle(random(width), height, false, this.hue);
  this.exploded = false;
  this.particles = [];
  this.shapeArray = [[.1, -.4], [.25, -.5], [.5, -.7], [.75, -1], [1, -1.5],
  [1.25, -1.6], [1.3, -1.65], [1.35, -1.7], [1.45, -1.71], [1.5, -1.73],
  [1.53, -1.75], [1.54, -1.73], [1.55, -1.71], [1.6, -1.7], [1.7, -1.65],
  [1.71, -1.6], [1.72, -1.55], [1.73, -1.5], [1.74, -1.45], [1.75, -1.4],
  [1.76, -1.3], [1.77, -1.2], [1.78, -1.1], [1.79, -1], [1.8, -1],
  [1.82, -.9], [1.8, -.8], [1.75, -.6], [1.7, -.4], [1.65, -.2], [1.6, 0],
  [1.5, .1], [1.4, .2], [1.3, .3], [1.2, .4], [1.1, .5], [1, .6], [.9, .7],
  [.8, .8], [.7, .9], [.6, 1], [.5, 1.1], [.4, 1.2], [.3, 1.3], [.2, 1.4],
  [.1, 1.5], [0, 1.6]]
  this.shapeArray = this.shapeArray.reverse()
  this.numOfParticles = this.shapeArray.length

  this.update = function() {
    if (!this.exploded) {
      this.firework.applyForce(grav);
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.explode();
      }
    }

    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(grav);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  this.explode = function() {
    this.exploded = true;

    for (var i = 0; i < this.numOfParticles; i++) {
      var p = new Particle(this.firework.pos.x, this.firework.pos.y, true, this.hue);
      p.vel = createVector(this.shapeArray[i][0], this.shapeArray[i][1]);
      this.particles.push(p);
      p = new Particle(this.firework.pos.x, this.firework.pos.y, true, this.hue);
      p.vel = createVector(-1 * this.shapeArray[i][0], this.shapeArray[i][1]);
      this.particles.push(p);
    }
    /*for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].vel.x = random(-3, 3);
      this.particles[i].vel.y = random(-4, 3);
    } */
  }

  this.show = function() {
    if (!this.exploded) {
      this.firework.show();
    }
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }

  this.done = function() {
    if (this.exploded && this.particles.length === 0) {
        return true;
    } else {
        return false;
    }
}
}
