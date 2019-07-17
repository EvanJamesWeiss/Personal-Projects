import peasy.*;

PeasyCam cam;

int prime = 1;
boolean moveFinished = true; 

int dim = 3;
Cubie[] cube = new Cubie[dim * dim * dim];

Move move;
Move[] ScrambleQ = new Move[100];
boolean scram = false;
int scramIndex = 0;
int scramNum = 10;

void setup() {
  size(displayWidth, displayHeight, P3D);
  cam = new PeasyCam(this, 400);
  int index = 0;
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      for (int z = -1; z <= 1; z++) {
        PMatrix3D matrix = new PMatrix3D();
        matrix.translate(x, y, z);
        cube[index] = new Cubie(matrix, x, y, z);
        index++;
      }
    }
  }
  move = new Move(1, 0, 0, 1);
}

void turnX(int index, int dir) {
  for (int i = 0; i < cube.length; i++) {
    Cubie qb = cube[i];
    if (qb.x == index) {
      PMatrix2D matrix = new PMatrix2D();
      matrix.rotate(dir * HALF_PI);
      matrix.translate(qb.y, qb.z);
      
      qb.update(round(qb.x), round(matrix.m02), round(matrix.m12));
      qb.turnFacesX(dir);
    }
  }
}

void turnY(int index, int dir) {
  for (int i = 0; i < cube.length; i++) {
    Cubie qb = cube[i];
    if (qb.y == index) {
      PMatrix2D matrix = new PMatrix2D();
      matrix.rotate(dir * HALF_PI);
      matrix.translate(qb.x, qb.z);
      
      qb.update(round(matrix.m02), round(qb.y), round(matrix.m12));
      qb.turnFacesY(dir);
    }
  }
}

void turnZ(int index, int dir) {
  for (int i = 0; i < cube.length; i++) {
    Cubie qb = cube[i];
    if (qb.z == index) {
      PMatrix2D matrix = new PMatrix2D();
      matrix.rotate(dir * HALF_PI);
      matrix.translate(qb.x, qb.y);
      
      qb.update(round(matrix.m02), round(matrix.m12), round(qb.z));
      qb.turnFacesZ(dir);
    }
  }
}

void keyPressed() {
  if (moveFinished) {
    if (key == '1') {
      move = new Move(2, 2, 1, prime);
      move.start();
    } else if (key == '2') {
      move = new Move(2, 2, 0, prime);
      move.start();
    } else if (key == '3') {
      move = new Move(2, 2, -1, prime);
      move.start();
    } else if (key == '4') {
      move = new Move(2, -1, 2, prime);
      move.start();
    } else if (key == '5') {
      move = new Move(2, 0, 2, prime);
      move.start();
    } else if (key == '6') {
      move = new Move(2, 1, 2, prime);
      move.start();
    } else if (key == '7') {
      move = new Move(-1, 2, 2, prime);
      move.start();
    } else if (key == '8') {
      move = new Move(0, 2, 2, prime);
      move.start();
    } else if (key == '9') {
      move = new Move(1, 2, 2, prime);
      move.start();
    } else if (key == ' ') {
      buildScramble();
      scram = true;
    }
  }
}

void keyReleased() {
  if (keyCode == SHIFT) {
    prime *= -1;
  }
}

void setFinished(boolean done) {
  moveFinished = done;
}

void buildScramble() {
  int i = 0;
  int r = 0;
  int x = 2;
  int y = 2;
  int z = 2;
  int dir = prime;

  while (i < scramNum) {
      if (random(50) < 25) {
        dir *= dir;
      }
      r = round(random(1, 3));
      if (r == 1) {
        x = round(random(-1, 1));
      } else if (r == 2) {
        y = round(random(-1, 1));
      } else if (r == 3) {
        z = round(random(-1, 1));
      }
      move = new Move(x, y, z, dir);
      ScrambleQ[i] = move;
      i++;
  }
}

void draw() {
  background(100);
  scale(50);
  move.update();
  if (scram) {
    if (moveFinished) {
      move = ScrambleQ[scramIndex];
      move.start();
      scramIndex++;
    }
    if (scramIndex == scramNum) {
    scram = false;
    scramIndex = 0;
    }
  }

  for (int i = 0; i < cube.length; i++) {
        push();
        if (move.x != 2 && cube[i].x == move.x) {
          rotateX(move.angle);
        } else if (move.y != 2 && cube[i].y == move.y) {
          rotateY(move.angle);
        } else if (move.z != 2 && cube[i].z == move.z) {
          rotateZ(move.angle);
        }
        cube[i].show();
        pop();
   }
}
