function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var cols = 4;
var rows = 4;
var mult = 100;
let a;

function setup() {
  createCanvas((cols * mult) + 1, (rows * mult) + 1);
  background(0);

  a = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      a[i][j] = 0;
    }
  }
  addCell();
}

function addCell() {
  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (a[i][j] == 0) {
        options.push([i, j]);
      }
    }
  }
  if (options.length > 0) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    // a[i][j] = floor(random(1, 3)) * 2;
    if (random() < .1) {
      a[i][j] = 4;
    } else {
      a[i][j] = 2;
    }
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    moveAllCells("up");
  } else if (keyCode === DOWN_ARROW) {
    moveAllCells("down");
  } else if (keyCode === RIGHT_ARROW) {
    moveAllCells("right");
  } else if (keyCode === LEFT_ARROW) {
    moveAllCells("left");
  } else if (keyCode === ENTER) {
    resetBoard();
  }
}

function moveAllCells(dir) {
  if (dir == "up") {
    for (var i = 0; i < cols; i++) {
      slideUP(i);
    }
  } else if (dir == "down") {
    for (var i = 0; i < cols; i++) {
      slideDOWN(i);
    }
  } else if (dir == "right") {
    for (var j = 0; j < rows; j++) {
      slideRIGHT(j);
    }
  } else if (dir == "left") {
    for (var j = 0; j < rows; j++) {
      slideLEFT(j);
    }
  }
  addCell();
}

function slideUP(i) {
  var noneleft = 0;
  for (var j = 0; j < rows; j++) {
    if (a[i][j] == 0) {
      for (var k = j; k < rows; k++) {
        if (a[i][k] != 0) {
          a[i][j] = a[i][k];
          a[i][k] = 0;
          break;
        }
        if (k == 3) {
          noneleft = 1;
        }
      }
    }
    if (a[i][j] != 0) {
      for (var k = j + 1; k < rows; k++) {
        if (a[i][k] != 0) {
          if (a[i][k] != a[i][j]) {
            break;
          }
          a[i][j] *= 2;
          a[i][k] = 0;
          break;
        }
        if (k == 3) {
          noneleft = 1;
        }
      }
    }
    if (noneleft) {
      break;
    }
  }
}

function slideDOWN(i) {
  var noneleft = 0;
  for (var j = rows - 1; j >= 0; j--) {
    if (a[i][j] == 0) {
      for (var k = j - 1; k >= 0; k--) {
        if (a[i][k] != 0) {
          a[i][j] = a[i][k];
          a[i][k] = 0;
          break;
        }
        if (k == 0) {
          noneleft = 1;
        }
      }
    }
    if (a[i][j] != 0) {
      for (var k = j - 1; k >= 0; k--) {
        if (a[i][k] != 0) {
          if (a[i][k] != a[i][j]) {
            break;
          }
          a[i][j] *= 2;
          a[i][k] = 0;
          break;
        }
        if (k == 0
        ) {
          noneleft = 1;
        }
      }
    }
    if (noneleft) {
      break;
    }
  }
}

function slideRIGHT(j) {
  var noneleft = 0;
  for (var i = cols - 1; i >= 0; i--) {
    if (a[i][j] == 0) {
      for (var k = i - 1; k >= 0; k--) {
        if (a[k][j] != 0) {
          a[i][j] = a[k][j];
          a[k][j] = 0;
          break;
        }
        if (k == 0) {
          noneleft = 1;
        }
      }
    }
    if (a[i][j] != 0) {
      for (var k = i - 1; k >= 0; k--) {
        if (a[k][j] != 0) {
          if (a[k][j] != a[i][j]) {
            break;
          }
          a[i][j] *= 2;
          a[k][j] = 0;
          break;
        }
        if (k == 0) {
          noneleft = 1;
        }
      }
    }
    if (noneleft) {
      break;
    }
  }
}

function slideLEFT(j) {
  var noneleft = 0;
  for (var i = 0; i < cols; i++) {
    if (a[i][j] == 0) {
      for (var k = i + 1; k < cols; k++) {
        if (a[k][j] != 0) {
          a[i][j] = a[k][j];
          a[k][j] = 0;
          break;
        }
        if (k == 3) {
          noneleft = 1;
        }
      }
    }
    if (a[i][j] != 0) {
      for (var k = i + 1; k < cols; k++) {
        if (a[k][j] != 0) {
          if (a[k][j] != a[i][j]) {
            break;
          }
          a[i][j] *= 2;
          a[k][j] = 0;
          break;
        }
        if (k == 3) {
          noneleft = 1;
        }
      }
    }
    if (noneleft) {
      break;
    }
  }
}

function resetBoard() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      a[i][j] = 0;
    }
  }
  addCell();
}

function draw() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      let x = mult * i;
      let y = mult * j;
      if (a[i][j] == 0) {
        fill(200);
        stroke(0);
        rect(x, y, mult, mult);
      } else {
        if (a[i][j] == 2048) {
          colorMode(RGB);
          fill(56, 230, 100);
        } else {
          fill(255);
        }
        stroke(0);
        rect(x, y, mult, mult);
        if (a[i][j] < 100) {
          textSize(70);
        } else if (a[i][j] < 1000) {
          textSize(50);
        } else {
          textSize(30);
        }
        textAlign(CENTER, CENTER);
        fill(0);
        text(a[i][j], x + mult * .5, y + mult * .55);
      }
    }
  }
}
