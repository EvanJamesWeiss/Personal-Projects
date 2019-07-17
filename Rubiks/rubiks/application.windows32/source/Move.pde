class Move {
  float angle = 0;
  int x = 0;
  int y = 0;
  int z = 0;
  int dir = 0;
  float rspeed = .1;
  boolean animating = false;
  
  
  Move(int i, int j, int k, int d) {
    x = i;
    y = j;
    z = k;
    dir = d;
  }
  
  void start() {
    animating = true;
    setFinished(false);
  }
    
  void update() {
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
