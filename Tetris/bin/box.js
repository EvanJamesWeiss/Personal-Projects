function Box(i, j, c = color(255, 255, 255))
{
  this.color = c;
  this.i = i;
  this.j = j;

  // the key to the dynamic player.
  this.controlled = true;

  this.show = function()
  {
    fill(this.color);
    rect(this.i * BoxSize, this.j * BoxSize, BoxSize, BoxSize);
  }

  this.down = function()
  {
    if (this.j < 24)
    {
      this.j += 1;
    }
  }

  this.horizontal = function(x)
  {
    this.i += x;
  }

  this.isfixed = function()
  {
    return this.fixed;
  }

}
