var fireworks = [];
var grav;

var slider;

function setup() {
  createCanvas(1000,600);

  slider = createSlider(3000, 20000, 20000);
  slider.position(width + 30, height / 2);

  colorMode(HSB);
  grav = createVector(0, height / 1500);
  //fireworks.push(new Firework());
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);
  if (random(1) < width / slider.value()) {
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
