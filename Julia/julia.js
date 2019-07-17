function setup() {
  createCanvas(360,360);
  //colorMode(HSB, 1);
  pixelDensity(1);
}

var angle = 0.0;

function draw() {
  var max_iter = 100;
  var min_val = -1.5
  var max_val = 1.5
  loadPixels();
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {

      var a = map(x, 0, width, min_val, max_val);
      var b = map(y, 0, height, min_val, max_val);

      // pattern 1
      // var ca = -.70176;
      // var cb = -.3842;

      //pattern 2
      // var ca = 0;
      // var cb = .8;

      //Dynamic version (mouse inputs)
      var ca = map(mouseX, 0, width, -1, 1);
      var cb = map(mouseY, 0, height, -1, 1);

      var n = 0;
      var z = 0;

      while (n < max_iter) {
        var aa = (a * a) - (b * b);
        var bb = 2 * a * b;
        if (abs(aa + bb) > 4) {
          break;
        }
        a = aa + ca;
        b = bb + cb;
        n++;
      }

      // var h = sqrt(n / max_iter);
      // var bright = color(h, 150, 255)

      var bright = map(n, 0, max_iter, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);
      if (n === max_iter) {
        bright = 0;
      }

      var pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}
