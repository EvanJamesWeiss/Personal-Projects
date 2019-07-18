let x = 0;
let y = 0;
let s = 20;

function setup() {
  createCanvas(600, 600);
  background(0);
}

function draw() {
  stroke(255);
  strokeWeight(random(1,4));
  if (random(1) < .5) {
    line(x, y, x + s, y + s);
  } else {
    line(x, y + s, x + s, y);
  }
  x += s;
  if (x > width) {
    x = 0;
    y += s;
  }
}
