class Cubie {
  PMatrix3D matrix;
  color c;
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
   void turnFacesX(int dir) {
     for (Face f : faces) {
      f.turnX(dir * HALF_PI); 
     }    
   }
  
  void turnFacesY(int dir) {
   for (Face f : faces) {
    f.turnY(dir * HALF_PI); 
   }    
  }
     
  void turnFacesZ(int dir) {
   for (Face f : faces) {
    f.turnZ(dir * HALF_PI); 
   }    
  }

  
  void update(int i, int j, int k) {
    matrix.reset();
    matrix.translate(i, j, k);
    x = i;
    y = j;
    z = k;
    
  }
  
  void show() {
    noFill();
    stroke(0);
    strokeWeight(0.1);
    pushMatrix();
    applyMatrix(matrix);   
    box(1);
    for (Face f : faces) {
      f.show();
    }
    popMatrix();
  }
}
