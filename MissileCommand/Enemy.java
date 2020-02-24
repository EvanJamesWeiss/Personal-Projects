import java.awt.*;
import java.lang.Math.*;
import java.lang.reflect.Array;
import java.util.ArrayList;

public class Enemy
{
    private int ammo;
    private int angryLevel;
    private int TriggerHappiness = MainConstants.ENEMY_ROUND_WAIT;
    private ArrayList<Cities> targets;

    Enemy(int aL, ArrayList<Cities> t)
    {
        ammo = MainConstants.ENEMY_AMMO;
        angryLevel = aL;
        targets = t;
    }

    public void updateTargets(ArrayList<Cities> t)
    {
        targets = t;
    }

    public boolean Tick()
    {
        if (TriggerHappiness <= 0)
        {
            TriggerHappiness = MainConstants.ENEMY_FREQUENCY - (50 * (angryLevel - 1));
            return false;
        }
        TriggerHappiness -= 1;
        return true;
    }

    public boolean allOut()
    {
        return (ammo == 0);
    }

    public Missile Fire()
    {
        int startX = (int) (Math.random() * MainConstants.WINDOW_WIDTH);
        int startY = -1;
        Point startP = new Point(startX, startY);

        int endX = (int) (Math.random() * MainConstants.WINDOW_WIDTH);
        int endY = MainConstants.WINDOW_HEIGHT;
        Point endP = new Point(endX, endY);

        ammo -= 1;
        boolean smart = (Math.floorMod(ammo, 5) == 0);
        if (smart)
        {
            endP = targets.get(0).getPosition();
            endP.y += MainConstants.CITY_HEIGHT;
            endP.x += MainConstants.CITY_WIDTH;
        }
        return new Missile(startP, endP, MainConstants.MISSILE_SLOW, angryLevel, smart);
    }

    public void Reload()
    {
        angryLevel += 1;
        ammo = MainConstants.ENEMY_AMMO * angryLevel;
        TriggerHappiness = MainConstants.ENEMY_ROUND_WAIT;
    }


}
