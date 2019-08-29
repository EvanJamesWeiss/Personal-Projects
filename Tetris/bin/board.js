function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var grid = make2DArray(BoardCols, BoardRows);

function Board()
{
  this.grid = function(i, j)
  {
    return grid[i][j];
  }

  this.addPiece = function()
  {
    while (true)
    {
      var i = floor(random(0, 10));
      var j = floor(random(1, 24));
      if (grid[i][j] == null)
      {
        grid[i][j] = new Box(i, j);
        return;
      }
    }
  }

  this.render = function()
  {
    for (var i = 0; i < BoardCols; i++) {
      for (var j = 0; j < BoardRows; j++) {
        if (grid[i][j] != null)
        {
          grid[i][j].show();
          if (grid[i][j + 1] == null && j < 23)
          {
            grid[i][j + 1] = grid[i][j];
            grid[i][j] = null;
            grid[i][j + 1].down();
          }
        }
      }
    }

    return this.clearFilledRows();
  }

  this.clearFilledRows = function()
  {
    var rowsCleared = 0;

    for (var j = 0; j < BoardRows; j++) {
      for (var i = 0; i < BoardCols; i++) {
        if (grid[i][j] == null)
        {
          break;
        }
        if (i == BoardCols - 1)
        {
          for (var k = 0; k < BoardCols; k++)
          {
            grid[k][j] = null;
          }
          rowsCleared += 1;
        }
      }
    }
    return rowsCleared;
  }

  this.gameOver = function()
  {
    for (var i = 0; i < BoardCols; i++)
    {
      if (grid[i][0] != null)
      {
        return true;
      }
    }
    return false;
  }

}
