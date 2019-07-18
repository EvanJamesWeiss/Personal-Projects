let p;
var w = 600;
var h = 600;

var x = [w/ 2, 20, w - 20];

var y = [20, h - 20, h - 20];

var xpre = x[0];
var ypre = x[0];

function setup() {
  createCanvas(w, h);
  background(50);
  stroke(255);

  point(x[0], y[0]);
  point(x[1], y[1]);
  point(x[2], y[2]);

}

function draw() {
  strokeWeight(5);
  stroke(255);
  p; // draw new point
  index = floor(random(3)); // pick a random vertex to go towards
  addnew(index); // generate the new point
}

function addnew(index) {
  xnew = (xpre + x[index]) / 2;
  ynew = (ypre + y[index]) / 2;

  p = point(xnew, ynew);

  xpre = xnew;
  ypre = ynew;
}
