function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.neighborCount = 0;
  this.bee = false;
  this.revealed = false;
  this.flagged = false;
}


Cell.prototype.show = function() {
  stroke(0);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  if (this.revealed) {
    if (this.bee) {
      fill(200);
      stroke(0);
      ellipse(this.x + this.w * .5, this.y + this.w * .5, this.w * .5);
    } else {
      fill(200);
      stroke(0);
      rect(this.x, this.y, this.w, this.w);
      if (this.neighborCount > 0) {
        textAlign(CENTER);
        fill(0);
        text(this.neighborCount, this.x + this.w * .5, this.y + this.w * .75);
      }
    }
  } else if (this.flagged) {
    fill(150);
    stroke(0);
    triangle(this.x + this.w *.2, this.y + this.w * .8, this.x + this.w * .5, this.y + this.w * .2, this.x + this.w * .8, this.y + this.w * .8);
  }
}

Cell.prototype.countBees = function() {
  if (this.bee) {
    this.neighborCount = -1;
    return;
  }
  var total = 0;
  for (var xoff = -1; xoff <= 1; xoff++) {
    for (var yoff = -1; yoff <= 1; yoff++) {
      i = this.i + xoff;
      j = this.j + yoff;
      if (i > -1 && i < cols && j > -1 && j < rows) {
        var neighbor = grid[i][j];
        if (neighbor.bee) {
          total++;
        }
      }
    }
  }
  this.neighborCount = total;
}

Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
  this.revealed = true;
  if (this.neighborCount == 0) {
    for (var xoff = -1; xoff <= 1; xoff++) {
      for (var yoff = -1; yoff <= 1; yoff++) {
        i = this.i + xoff;
        j = this.j + yoff;
        if (i > -1 && i < cols && j > -1 && j < rows) {
          var neighbor = grid[i][j];
          if (neighbor.revealed != true) {
            neighbor.reveal();
          }
        }
      }
    }
  }
}
