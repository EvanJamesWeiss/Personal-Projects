import java.awt.*;
import java.lang.Math;

class Explosion extends SmartRectangle
{
    private boolean dissipated = false;
    private int health = MainConstants.EXPLOSION_TIME;
    private boolean smart;

    Explosion(Point point, boolean S)
    {
        super((S) ? MainConstants.SMART_EXPLOSION_COLOR : MainConstants.EXPLOSION_COLOR);
        smart = S;
        this.setLocation(point.x, point.y);
        this.setSize(MainConstants.EXPLOSION_SIZE, MainConstants.EXPLOSION_SIZE);
    }

    void dissipate()
    {
        health -= 1;
        if (health < 1)
        {
            dissipated = true;
        }
    }

    boolean hasDissipated()
    {
        return dissipated;
    }

    boolean isMissileColliding(Point mPoint, boolean S)
    {
        if (S && !smart)
        {
            return false;
        }
        boolean xcheck = (Math.abs((this.getX() + (MainConstants.EXPLOSION_SIZE / 2.0)) - mPoint.x) < MainConstants.EXPLOSION_SIZE / 1.9);
        boolean ycheck = (Math.abs((this.getY() + (MainConstants.EXPLOSION_SIZE / 2.0)) - mPoint.y) < MainConstants.EXPLOSION_SIZE / 1.9);
        return (xcheck && ycheck);
    }
}
