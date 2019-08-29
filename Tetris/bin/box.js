function Box(i, j) {
  this.color = random(255);
  this.i = i;
  this.j = j;

  this.show = function()
  {
    rect(this.i * BoxSize, this.j * BoxSize, BoxSize, BoxSize);
  }

  this.down = function()
  {
    this.j += 1;
  }

}
