

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var start = 0;
var grid;
var cols;
var rows;
var w = 20;
var totalBees = 50;
var options = [];

function setup() {
  createCanvas(401, 401);

  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols,rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i,j]);
    }
  }
}

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
		  if (mouseButton == LEFT && !grid[i][j].flagged) {
			  if (start == 0) {
				      startGame(i, j);
				      start = 1;
			  }
			  grid[i][j].reveal();

			  if (grid[i][j].bee){
				gameOver();
			  }
		    } else if (mouseButton == RIGHT) {
				if (grid[i][j].flagged) {
					grid[i][j].flagged = false;
				} else {
					grid[i][j].flagged = true;
				}
			}
        }
    }
  }
}

function startGame(i, j) {
	//to start with an area around the player, splice out the cells surrounding the initial click
	for (var xoff = -1; xoff <= 1; xoff++) {
		for (var yoff = -1; yoff <= 1; yoff++) {
			var x = i + xoff;
			var y = j + yoff;
			if (x > -1 && x < cols && y > -1 && y < rows) {
				for (var n = 0; n < options.length; n++) {
					if (options[n][0] == x && options[n][1] == y) {
						options.splice(n, 1);
					}
				}
			}
		}
	}

	for (var n = 0; n <= totalBees; n++) {
		var index = floor(random(options.length));
		var choice = options[index]
		var i = choice[0];
		var j = choice[1];
		options.splice(index, 1);
		grid[i][j].bee = true;
	}

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countBees();
    }
  }
}

function draw() {
  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}
