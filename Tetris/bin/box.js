function Box(i, j, c = color(255, 255, 255))
{
  this.color = c;
  this.i = i;
  this.j = j;
  this.fixed = false;

  // the key to the dynamic player.
  this.controlled = true;

  this.show = function()
  {
    fill(this.color);
    rect(this.i * BoxSize, this.j * BoxSize, BoxSize, BoxSize);
  }

  this.down = function()
  {
    this.j += 1;
  }

  this.isfixed = function()
  {
    return this.fixed;
  }

}
