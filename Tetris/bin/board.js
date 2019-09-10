function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var org_grid = make2DArray(BoardCols, BoardRows);

function Board()
{

  this.grid = org_grid;
  this.currentPeice = null;

  this.addPiece = function()
  {
    // Make all peices give up control
    this._clearControl();

    // Add a new player peice
    while (true)
    {
      var i = floor(random(0, 10));
      var j = floor(random(1, 24));
      if (this.grid[i][j] == null)
      {
        this.currentPeice = new Piece(i, j);
        this.grid[i][j] = this.currentPeice;
        return;
      }
    }
  }

  this._clearControl = function()
  {
    for (var i = 0; i < BoardCols; i++) {
      for (var j = 0; j < BoardRows; j++) {
        if (this.grid[i][j] != null)
        {
          this.grid[i][j].LoseControl();
        }
      }
    }
  }

  this._addNpeices = function(n)
  {
    for (var i = 0; i < n; i++)
    {
      this.addPiece();
    }
  }

  this.render = function()
  {
    for (var i = 0; i < BoardCols; i++) {
      for (var j = 0; j < BoardRows; j++) {
        if (this.grid[i][j] != null)
        {
          this.grid[i][j].show();
        }
      }
    }

    return this.clearFilledRows();
  }

  this.clearFilledRows = function()
  {
    var rowsCleared = 0;

    for (var j = BoardRows; j >= 0; j--) {
      for (var i = 0; i < BoardCols; i++) {
        // If you find an empty space in a row, go to next row
        if (this.grid[i][j] == null)
        {
          break;
        }

        // if the box has the ability to move down, go to next row
        if (this._canMoveDown(i, j))
        {
          break;
        }

        // if you reach the end of the row, all spaces are full, so clear it
        if (i == BoardCols - 1)
        {
          for (var k = 0; k < BoardCols; k++)
          {
            this.grid[k][j] = null;
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
      if (this.grid[i][0] != null)
      {
        return true;
      }
    }
    return false;
  }

  this.applyGravity = function()
  {
    // Moves bottom row first, ensures peices are only moved one space down
    // at a time
    for (var j = BoardRows; j >= 0; j--) {
      for (var i = 0; i < BoardCols; i++) {
        if (this.grid[i][j] != null)
        {
          if (this._canMoveDown(i, j))
          {
            this.grid[i][j + 1] = this.grid[i][j];
            this.grid[i][j] = null;
            this.grid[i][j + 1].down();
          }
        }
      }
    }
  }

  this._canMoveDown = function(i, j)
  {
    return ((j < 23) && (!(this.grid[i][j].isfixed()) && this.grid[i][j + 1] == null));
  }

  this.movePlayer = function(dir)
  {
    this.currentPeice.horizontal(dir)
  }

}
