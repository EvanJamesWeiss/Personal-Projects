function Piece(starting_x, starting_y)
{
  this._PickShape = function()
  {
    return [[new Box(this.x, this.y, this.color),
            new Box(this.x + 1, this.y, this.color),
            new Box(this.x, this.y + 1, this.color),
            new Box(this.x, this.y + 2, this.color)],
            [[0, 0], [1, 0], [0, 1], [0, 2]]];
  }

  this.color = color(random(255), random(255), random(255));
  this.x = starting_x;
  this.y = starting_y;
  this.player = true;
  this.shape = this._PickShape();
  console.log(this.shape);
  this.LoseControl = function()
  {
    this.player = false;
  }

  this.show = function()
  {
    for (var b in this.shape[0])
    {
      this.shape[0][b].show();
    }
  }

  this.down = function()
  {
    for (var b in this.shape[0])
    {
      this.shape[0][b].down();
    }
  }

  this.horizontal = function(x)
  {
    for (var b in this.shape[0])
    {
      this.shape[0][b].horizontal(x);
    }
  }

  this.isfixed = function()
  {
    for (var b in this.shape[0])
    {
      if (this.shape[0][b].isfixed())
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
