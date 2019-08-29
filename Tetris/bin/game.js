var board = new Board();
var score = 0;

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
  textSize(16);
  text("Tetris", CanvasWidth / 2, 20);

  board.addPiece();

  if (board.gameOver())
  {
    textSize(32);
    text("Game Over: " + score.toString(), 10, 30);
    fill(0, 102, 153);
  }

}
