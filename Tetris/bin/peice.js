function Piece(starting_x, starting_y)
{
  this._PickShape = function()
  {
    return [new Box(this.x, this.y, this.color)];
  }

  this.color = color(random(255), random(255), random(255));
  this.x = starting_x;
  this.y = starting_y;
  this.player = true;
  this.shape = this._PickShape();

  this.LoseControl = function()
  {
    this.player = false;
  }

  this.show = function()
  {
    for (var b in this.shape)
    {
      this.shape[b].show();
    }
  }

  this.down = function()
  {
    for (var b in this.shape)
    {
      this.shape[b].down();
    }
  }

  this.horizontal = function(x)
  {
    for (var b in this.shape)
    {
      this.shape[b].horizontal(x);
    }
  }

  this.isfixed = function()
  {
    for (var b in this.shape)
    {
      if (this.shape[b].isfixed())
      {
        return true
      }
    }
    return false;
  }

  this.isplayer = function()
  {
    return this.player;
  }

}
