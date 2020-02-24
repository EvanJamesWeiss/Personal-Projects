import java.awt.*;
import java.awt.geom.Point2D;
/**
Attributes: location, health
Methods: disappear when hit, rebuild at score intervals of 10000
    when all are destroyed --> The end
after each level only the existing cities reappear
need to be painted/filled in
 */
public class Cities extends SmartRectangle {
    private Point position;
    private int health = 1;
    private boolean destroyed;

    //Constructor for objects of class Cities
    public Cities(int x, int y) {
        super(MainConstants.CITY_COLOR);
        //place the city and destroyed to false so they appear
        this.setLocation(x, y);
        this.setSize(MainConstants.CITY_WIDTH, MainConstants.CITY_HEIGHT);
        position = new Point(x,y);
        destroyed = false;
    }
    public Point getPosition() {
        //return position of city used for if they get hit
        return position;
    }
    
    public boolean getStatus(){
        //returns true or false on a city
        return destroyed;
    }
    
    public void draw(java.awt.Graphics2D aBrush)
    {
        //draws the cities that aren't destroyed
        if (destroyed){
            this.setColor(Color.RED);
        }

        super.draw(aBrush);
        super.fill(aBrush);
    }
    
    void dissipate()
    {
        //dissipate if hit so city won't appear
        health -= 1;
        if (health < 1)
        {
            destroyed = true;
        }
    }

    public boolean isMissileColliding(Point mPoint)
    {
        return (mPoint.y >= position.y && mPoint.y <= position.y + MainConstants.CITY_HEIGHT && mPoint.x >= position.x && mPoint.x <= position.x + MainConstants.CITY_WIDTH);
    }
}
