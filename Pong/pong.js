var playerSpeed = 10;

var player1;
var p1_pos;

var player2;
var p2_pos;

var ball;

var backdrop;

var velMod = 7;

function setup() {
  createCanvas(windowWidth, windowHeight - 40);
  p1_pos = 10;
  p2_pos = width - 45;
  player1 = new Paddle(p1_pos);
  player2 = new Paddle(p2_pos);
  ball = new Ball();
  backdrop = new Scene();
}

function draw() {
  background(0);
  fill(0, 255);
  backdrop.render();
  player1.render();
  player2.render();
  ball.render();

}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    player2.setMotion(-1);
  } else if (keyCode == DOWN_ARROW) {
    player2.setMotion(1);
  }
}

function keyTyped() {
  if (key == 'w') {
    player1.setMotion(-1);
  } else if (key == 's') {
    player1.setMotion(1);
  }
}

function keyReleased() {
  if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) {
    player2.setMotion(0);
  } else if (key == 'w' || key == 's') {
    player1.setMotion(0);
  }
}

function Paddle(x) {
  this.pos = createVector(x, height / 2.5);
  this.motion = 0;
  this.paddle_height = windowHeight / 5.5;
  this.paddle_width = 15;

  this.render = function() {
    push();
    stroke(0);
    fill(255);
    rect(this.pos.x, this.pos.y, this.paddle_width, this.paddle_height);
    pop();
    this.move();
  }

  this.setMotion = function(dir) {
    this.motion = dir;
  }

  this.move = function() {
    this.pos.y += playerSpeed * this.motion;
    if (this.pos.y < 10 || this.pos.y > height - 10 - this.paddle_height) {
      this.pos.y -= playerSpeed * this.motion;
    }
  }

}

function Ball() {
  this.size = windowWidth / 100;
  this.pos = createVector((width / 2) - this.size, height / 2);
  this.vel = createVector(-velMod, 0);

  this.render = function() {
    push();
    stroke(0);
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
    pop();
    this.move();
  }

  this.move = function() {
    if (this.pos.y < this.size || this.pos.y > height - this.size) {
      this.vel.y *= -1;
    }
    if (((this.pos.x < p1_pos + this.size / 2 + player1.paddle_width) && (this.pos.y > player1.pos.y) && (this.pos.y < player1.pos.y + player1.paddle_height)) || ((this.pos.x > p2_pos - this.size) && (this.pos.y > player2.pos.y) && (this.pos.y < player2.pos.y + player2.paddle_height))) {
      this.vel.x *= -1;
      if (this.vel.x > 0) {
        this.vel.x += .2;
      } else {
        this.vel.x -= .2;
      }
      this.vel.y += player1.motion + player2.motion;
    }

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    if (this.pos.x < 0) {
      backdrop.score2 += 1;
      this.reset();
    }
    if (this.pos.x > width) {
      backdrop.score1 += 1;
      this.reset();
    }
  }

  this.reset = function() {
    this.pos.x = (width / 2) - this.size;
    this.pos.y = height / 2;
    this.vel = createVector(-velMod, 0);
  }

}

function Scene() {
  this.score1 = 0;
  this.score2 = 0;

  this.render = function() {
    var midline_width = 25;
    var midline_height = 100;
    var i = (width / 2) - (midline_width / 2);
    var j = 0;
    push();
    stroke(0);
    fill(100);
    while (j < height) {
      rect(i, j, midline_width, midline_height);
      j += midline_height + 16;
    }
    textSize(50);
    text(this.score1, (width / 2) - 100, 50);
    text(this.score2, (width / 2) + 100 - midline_width, 50);
    pop();
  }
}
