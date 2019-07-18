var ship;
var field = [];
var numAsteroids = 5
var score = 0;
var highScore = 3264;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i = 0; i < numAsteroids; i++) {
    field[i] = new asteroid();
  }
}

function draw() {
  background(0);
  ship.render();
  ship.turn();
  ship.fly();
  for (var i = 0; i < field.length; i++) {
    field[i].render();
    field[i].float();
  }
  if (gameoverCollision()) {
    ship.killed = true;
    console.log("You lost!");
    console.log("Score: ", score);
    console.log("Current high score: ", highScore)
    noLoop();
  }
  var hit = asteroidShot();
  if (hit[0] != -1) {
    score += floor(field[hit[1]].r);
    ship.lazers[hit[0]].done = true;
    field.splice(hit[1], 1);
  }

  gameWon();
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    ship.setRotation(.11);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-.11);
  } else if (keyCode == UP_ARROW) {
    ship.flying = true;
  } else {
    ship.fire();
  }

}

function keyReleased() {
  if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
    ship.setRotation(0);
  } else if (keyCode == UP_ARROW) {
    ship.flying = false;
  }

}

function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.vel = createVector(0, 0);
  this.acc = createVector(.01, .01);
  this.lazers = [];
  var accelMod = 3;
  this.r = 20;
  this.heading = 0;
  this.rotation = 0;
  this.flying = false;
  this.killed = false;

  this.render = function() {
    if (!this.killed) {
      push();
      translate(this.pos.x, this.pos.y);
      noFill();
      stroke(255);
      rotate(this.heading);
      triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
      pop();
      for (var i = 0; i < this.lazers.length; i++) {
        this.lazers[i].render();
        this.lazers[i].update();
        if (this.lazers[i].done) {
          this.lazers.splice(i, 1);
        }
      }
    }
  }

  // Updates heading by rotation
  this.turn = function() {
    this.heading += this.rotation;
  }

  // Used to set rotation
  this.setRotation = function(a) {
    this.rotation = a;
  }

  this.fly = function() {
    // Is the button pressed? if not, slow down
    if (this.flying) {
      this.vel.x = accelMod * Math.sin(this.heading);
      this.vel.y = accelMod * Math.cos(this.heading);
    } else {
      if (abs(this.vel.x) > 0) {
        if (this.vel.x > 0) {
          this.vel.x -= this.acc.x;
        } else {
          this.vel.x += this.acc.x;
        }
      } else {
        this.vel.x = 0;
      }
      if (abs(this.vel.y) > 0) {
        if (this.vel.y > 0) {
          this.vel.y -= this.acc.y;
        } else {
          this.vel.y += this.acc.y;
        }
      } else {
        this.vel.y = 0;
      } // Slowing down
    }

    // Position updating by velocity
    this.pos.x += this.vel.x;
    this.pos.y -= this.vel.y;

    // Screen wrapping
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }

  this.fire = function() {
    var lazer_x = this.pos.x + (this.r * sin(this.heading));
    var lazer_y = this.pos.y + (this.r * cos(this.heading));
    var lazer = new Lazer(this.pos.x, this.pos.y, this.heading);
    this.lazers.push(lazer);
  }
}

function asteroid() {
  // Ensure asteroids don't start too close
  do {
    var n = random(width);
    var m = random(height);
    if (abs((width / 2) - n) > 90 && abs((height / 2) - m) > 90) {
      break;
    }
  } while(1)
  var velMod = .4
  this.pos = createVector(n, m);
  this.vel = createVector(random(-velMod, velMod), random(-velMod, velMod));
  this.r = random(15, 50);
  this.offset = [];
  this.numEdges = floor(random(5, 15));
  for (var i = 0; i < this.numEdges; i++) {
    this.offset[i] = random(-15, 10);
  }

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(255);
    beginShape();
    // Pick a bunch of random points to create the shape of the asteroid
    for (var i = 0; i < this.numEdges; i++) {
      var r = this.r + this.offset[i];
      var angl = map(i, 0, this.numEdges, 0, TWO_PI);
      var x = r * cos(angl);
      var y = r * sin(angl);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  // move the asteroid
  this.float = function() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    // Screen wrapping
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }
}

function Lazer(x, y, heading) {
  this.pos = createVector(x, y);
  var lazerSpeed = 8;
  this.vel = createVector(lazerSpeed * sin(heading), lazerSpeed * cos(heading));
  this.done = false;
  this.size = 10;

  this.render = function() {
    push();
    fill(255);
    stroke(255);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
    pop();
  }

  this.update = function() {
    this.pos.x += this.vel.x;
    this.pos.y -= this.vel.y;
    if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
      this.done = true;
    }
  }
}

function gameoverCollision() {
  var collisionTolerance = 30;
  var x = ship.pos.x + ship.r;
  var y = ship.pos.y + ship.r;
  for (var i = 0; i < field.length; i++) {
    var j = field[i].pos.x;
    var k = field[i].pos.y;
    var collision_x = (abs(x - j) < collisionTolerance);
    var collision_y = (abs(y - k) < collisionTolerance);
    if (collision_x && collision_y) {
      return true;
    }
  }
  return false;
}

function asteroidShot() {
  var cT = 30;
  for (var i = 0; i < ship.lazers.length; i++) {
    var x = ship.lazers[i].pos.x;
    var y = ship.lazers[i].pos.y;
    for (var j = 0; j < field.length; j++) {
      var m = field[j].pos.x;
      var n = field[j].pos.y;
      if (abs(x - m) < cT && abs(y - n) < cT) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
}

function gameWon() {
  if (field.length == 0) {
    console.log("Winner!");
    numAsteroids += 5;
    console.log("level ", numAsteroids / 5);
    nextLevel();
  }
}

function nextLevel() {
  for (var i = 0; i < numAsteroids; i++) {
    field[i] = new asteroid();
    field[i].velMod += numAsteroids / 5 / 8;
  }
  ship.pos.x = width / 2;
  ship.pos.y = height / 2;
  ship.vel = createVector(0, 0);
}
