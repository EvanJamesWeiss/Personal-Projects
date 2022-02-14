var fireworks = [];
var grav;

function setup() {
  let canvas = createCanvas(window.innerWidth - 10, 800);
  canvas.parent('canvas')
  colorMode(HSB);
  grav = createVector(0, height / 2000);
  //fireworks.push(new Firework());
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);
  if (random(1) < width / 15000) {
    fireworks.push(new Firework());
  }
  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}
