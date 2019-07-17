function Firework() {
  this.hue = random(255);
  this.firework = new Particle(random(width), height, false, this.hue);
  this.exploded = false;
  this.particles = [];
  this.numOfParticles = 110

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
      var p = new Particle(this.firework.pos.x, this.firework.pos.y, true, this.hue)
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
