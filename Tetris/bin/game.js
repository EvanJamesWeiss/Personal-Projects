var board = new Board();
var score = 0;
var timeKeeper = 0;

function setup()
{
  createCanvas(CanvasWidth, CanvasHeight);

  board.addPiece();
}

function draw()
{
  colorMode(RGB);
  background(150, 150, 150, 100);

  score += board.render();

  timeKeeper += 1;

  if (timeKeeper == TimeStep)
  {
    board.applyGravity();
    console.log("applied");
    timeKeeper = 0;
  }

  textSize(16);
  text("Tetris", CanvasWidth / 2, 20);
  text("Score: " + score.toString(), CanvasWidth / 2, 40);

  if (board.gameOver())
  {
    textSize(32);
    text("Game Over: " + score.toString(), 10, 30);
    fill(0, 102, 153);
  }

}
