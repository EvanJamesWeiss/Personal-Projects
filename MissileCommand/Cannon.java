import java.awt.*;

public class Cannon extends SmartRectangle
{
    private boolean centerCannon;
    private Point firePoint;
    private int ammo = MainConstants.CANNON_AMMO;

    Cannon(int x, int y, boolean center)
    {
        super(MainConstants.CANNON_COLOR);
        this.setLocation(x, y);

        int h = (center) ? MainConstants.CENTER_CANNON_HEIGHT : MainConstants.CANNON_HEIGHT;
        this.setSize(MainConstants.CANNON_WIDTH, h);

        firePoint = new Point(x + (MainConstants.CANNON_WIDTH / 2), y);
        centerCannon = center;
    }

    boolean isCenterCannon()
    {
        return centerCannon;
    }

    int getAmmo()
    {
        return ammo;
    }

    Missile fire(Point mPnt)
    {
        ammo -= 1;
        int firespeed = (centerCannon) ? MainConstants.MISSILE_CENTER_FAST : MainConstants.MISSILE_FAST;
        return new Missile(firePoint, mPnt, firespeed, 1, centerCannon);
    }

    boolean allOut()
    {
        return (ammo == 0);
    }

    void Reload()
    {
        ammo = MainConstants.CANNON_AMMO;
    }

    public void draw(java.awt.Graphics2D aBrush)
    {
        super.draw(aBrush);
        super.fill(aBrush);
    }

}
