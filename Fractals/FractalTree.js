function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);

  stroke(255);
  translate(200, height);
  branch(125);
}

function branch(len) {
  var angle = PI/5.8;
  var reducer = 0.67
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 2) {
    push();
    rotate(angle);
    branch(len*reducer);
    pop();
    push();
    rotate(-angle);
    branch(len*reducer)
    pop();
  }
}
