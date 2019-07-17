import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import peasy.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class rubiks extends PApplet {



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

public void setup() {
  
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

public void turnX(int index, int dir) {
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

public void turnY(int index, int dir) {
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

public void turnZ(int index, int dir) {
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

public void keyPressed() {
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

public void keyReleased() {
  if (keyCode == SHIFT) {
    prime *= -1;
  }
}

public void setFinished(boolean done) {
  moveFinished = done;
}

public void buildScramble() {
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

public void draw() {
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
class Cubie {
  PMatrix3D matrix;
  int c;
  int x = 0;
  int y = 0;
  int z = 0;
  Face[] faces = new Face[6];
  
  Cubie(PMatrix3D m, int i, int j, int k) {
    matrix = m;
    x = i;
    y = j;
    z = k;
    c = color(255);
    
    faces[0] = new Face(new PVector(0, 0, -1), color(0, 0, 255));
    faces[1] = new Face(new PVector(0, 0, 1), color(0, 128, 0));
    faces[2] = new Face(new PVector(0, 1, 0), color(255, 255, 255));
    faces[3] = new Face(new PVector(0, -1, 0), color(255, 255, 0));
    faces[4] = new Face(new PVector(1, 0, 0), color(255, 165, 0));
    faces[5] = new Face(new PVector(-1, 0, 0), color(255, 0, 0));    
    
  }
   public void turnFacesX(int dir) {
     for (Face f : faces) {
      f.turnX(dir * HALF_PI); 
     }    
   }
  
  public void turnFacesY(int dir) {
   for (Face f : faces) {
    f.turnY(dir * HALF_PI); 
   }    
  }
     
  public void turnFacesZ(int dir) {
   for (Face f : faces) {
    f.turnZ(dir * HALF_PI); 
   }    
  }

  
  public void update(int i, int j, int k) {
    matrix.reset();
    matrix.translate(i, j, k);
    x = i;
    y = j;
    z = k;
    
  }
  
  public void show() {
    noFill();
    stroke(0);
    strokeWeight(0.1f);
    pushMatrix();
    applyMatrix(matrix);   
    box(1);
    for (Face f : faces) {
      f.show();
    }
    popMatrix();
  }
}
class Face {
  PVector normal;
  int c;
  
  Face(PVector norm, int col) {
    normal = norm;
    c = col;
  }
  
  public void turnZ(float angle) {
    PVector v2 = new PVector();
    v2.x = round(normal.x * cos(angle) - normal.y * sin(angle));
    v2.y = round(normal.x * sin(angle) + normal.y * cos(angle));
    v2.z = round(normal.z);
    normal = v2;
  }
  
  public void turnY(float angle) {
    PVector v2 = new PVector();
    v2.x = round(normal.x * cos(angle) - normal.z * sin(angle));
    v2.z = round(normal.x * sin(angle) + normal.z * cos(angle));
    v2.y = round(normal.y);
    normal = v2;
  }
  
  public void turnX(float angle) {
    PVector v2 = new PVector();
    v2.y = round(normal.y * cos(angle) - normal.z * sin(angle));
    v2.z = round(normal.y * sin(angle) + normal.z * cos(angle));
    v2.x = round(normal.x);
    normal = v2;
  }
  
  
  public void show() {
    pushMatrix();
    fill(c);
    noStroke();
    rectMode(CENTER);
    translate(.5f * normal.x, .5f * normal.y, .5f * normal.z);
    if (abs(normal.x) > 0) {
      rotateY(HALF_PI);
    } else if (abs(normal.y) > 0) {
      rotateX(HALF_PI);
    }
    square(0, 0, 1);
    popMatrix();
  }
}
class Move {
  float angle = 0;
  int x = 0;
  int y = 0;
  int z = 0;
  int dir = 0;
  float rspeed = .1f;
  boolean animating = false;
  
  
  Move(int i, int j, int k, int d) {
    x = i;
    y = j;
    z = k;
    dir = d;
  }
  
  public void start() {
    animating = true;
    setFinished(false);
  }
    
  public void update() {
    if (animating) {
      angle += dir * rspeed;
      if (abs(angle) > HALF_PI) {
        angle = 0;
        animating = false;
        if (x != 2) {
          turnX(x, dir);
        } else if (y != 2) {
          turnY(y, -dir);
        } else if (z != 2) {
          turnZ(z, dir);
        }
        setFinished(true);
      }  
    }
  }
}
  public void settings() {  size(displayWidth, displayHeight, P3D); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "rubiks" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
