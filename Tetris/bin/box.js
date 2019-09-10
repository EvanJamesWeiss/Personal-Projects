function Box(i, j, c = color(255, 255, 255), visible = true)
{
  this.color = c;
  this.i = i;
  this.j = j;
  this.visible = visible;

  // the key to the dynamic player.
  this.controlled = true;

  this.show = function()
  {
    fill(this.color);
    if (!this.visible)
    {
      fill(color(55,55,55));
    }
    rect(this.i * BoxSize, this.j * BoxSize, BoxSize, BoxSize);
  }

  this.down = function()
  {
    if (this.j < 23)
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
