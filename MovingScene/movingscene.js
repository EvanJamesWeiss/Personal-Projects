var fore;
var forest;
var peaks = 10;
var MINelev = 150;
var MAXelev = -100;
var forestSize = 13;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  fore = new foreground();
  forest = new trees();
}

function draw() {
  background(0, 150, 220);
  forest.render();
  fore.render();
}

function foreground() {
  this.y = windowHeight / 2;
  this.elevations = [];
  this.summits = [];
  this.dist = windowWidth / peaks;

  for (var i = 0; i < peaks + 1; i++) {
    this.elevations[i] = 0;
    this.summits[i] = 0;
  }

  this.render = function() {
    this.popVerts();
    push();
    colorMode(RGB);
    stroke(181, 101, 29);
    fill(101, 67, 33);
    beginShape();
    vertex(-10, this.y);
    for (var i = 0; i < peaks + 1; i++) {
      vertex(this.summits[i], this.elevations[i]);
    }
    vertex(windowWidth + 10, this.y);
    vertex(windowWidth + 10, windowHeight);
    vertex(-10, windowHeight);
    endShape(CLOSE);
    pop();
  }

  this.popVerts = function() {
    for (var i = 0; i < peaks + 1; i++) {
      if (this.elevations[i] == 0) {
        this.elevations[i] = this.y + random(MINelev, MAXelev);
      }
      if (this.summits[i] == 0) {
        this.summits[i] = i * this.dist;
      } else {
        this.summits[i] -= 1;
        if (this.summits[i] < -this.dist) {
          this.summits.shift();
          this.elevations.shift();
          this.elevations[peaks] = 0;
          this.summits[peaks] = ((peaks + 1) * this.dist);
        }
      }
    }
  }
}

function trees() {
  this.xloc = [];
  this.sizes = []

  for (var i = 0; i < forestSize; i++) {
    this.xloc[i] = 0;
    this.sizes[i] = 0;
  }

  this.makeSingleTree = function(size, x, y) {
    push();
    colorMode(RGB);
    stroke(0, 128, 0);
    fill(0, 255, 0);
    beginShape();
    vertex(x, y + (size * 2));
    vertex(x, y - size);
    vertex(x - size, y - size);
    vertex(x, y - (1.8 * size));
    vertex(x - size, y - (1.8 * size));
    vertex(x + (size / 2), y - (3 * size));
    vertex(x + (2 * size), y - (1.8 * size));
    vertex(x + size, y - (1.8 * size));
    vertex(x + (2 * size), y - size);
    vertex(x + size, y - size);
    vertex(x + size, y + (size * 2));
    endShape(CLOSE);
    pop();
  }

  this.render = function() {
    for (var i = 0; i < forestSize; i++) {
      if (this.xloc[i] == 0) {
        this.xloc[i] = random(10, windowWidth);
      }
      if (this.sizes[i] == 0) {
        this.sizes[i] = random(20, 50);
      }
      this.makeSingleTree(this.sizes[i], this.xloc[i], (windowHeight / 2) + MINelev);
    }
  }
}
