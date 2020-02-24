import java.awt.*;
import java.lang.Math;
//import java.swing.*;
import java.awt.geom.Line2D;
import java.awt.geom.Point2D;

public class Missile extends SmartRectangle
{
    private int x, y, missileNum;
    private double missileX, missileY, targetX, targetY;
    private double movestepX, movestepY;
    private boolean smart;
    
    //constructor
    Missile(Point startPoint, Point endPoint, int speed, int diffMod, boolean S)
    {
        super((S) ? MainConstants.SMART_MISSILE_COLOR : MainConstants.MISSILE_COLOR);
        smart = S;
        missileX = startPoint.x;
        missileY = startPoint.y;
        targetX = endPoint.x;
        targetY = endPoint.y;

        movestepX = (targetX - missileX) / (speed * (1.0 / diffMod));
        movestepY = (targetY - missileY) / (speed * (1.0 / diffMod));

        this.setLocation(missileX, missileY);
        this.setSize(MainConstants.MISSILE_SIZE, MainConstants.MISSILE_SIZE);
    }
    
    public Point getPosition(){
        //return position for aiming
        return new Point((int) missileX, (int) missileY);
    }
    
    //some method about hitting the enemy missile?

    public void draw(java.awt.Graphics2D aBrush){
        super.draw(aBrush);
        super.fill(aBrush);
    }

    public Explosion targetReached()
    {
        return new Explosion(this.getPosition(), smart);
    }

    public boolean isSmart()
    {
        return smart;
    }

    public boolean move()
    {
        if ((Math.abs(missileY - targetY) < (Math.abs(movestepY))) && (Math.abs(missileX - targetX) < (Math.abs(movestepX))))
        {
            return false;
        }
        this.setLocation(missileX + movestepX, missileY + movestepY);
        missileY = this.getY();
        missileX = this.getX();
        return true;
    }


}
