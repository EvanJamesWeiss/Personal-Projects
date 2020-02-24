import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import java.util.ArrayList;
import java.awt.Graphics;

class MainPanel extends JPanel implements Screen
{
    private int level = 1;
    private SmartRectangle ground;
    private ArrayList<Explosion> explosions = new ArrayList<>();

    private ArrayList<Cities> city = new ArrayList<>();

    private ArrayList<Missile> missiles = new ArrayList<>();

    private Enemy enemy;
    private boolean levelComplete = false;

    private javax.swing.Timer refresh;

    private Cannon LeftCannon;
    private Cannon CenterCannon;
    private Cannon RightCannon;

    private int score = 0;
    private boolean paused = false;
    private int timesRebuild = 0;

    private boolean showLevelTransition = true;
    private int levelTransitionTime = MainConstants.ENEMY_ROUND_WAIT;
    private float levelTransitionFontSize = MainConstants.INITIAL_LEVEL_TRANSITION_FONT_SIZE;

    private boolean menu = false;

    MainPanel()
    {
        this.setBackground(Color.BLACK);
        ground = new SmartRectangle(0, MainConstants.WINDOW_HEIGHT - 80, MainConstants.WINDOW_WIDTH, 50, Color.GREEN, this);

        KeySpaceListener _space = new KeySpaceListener(this);
        KeyLeftBatteryListener _fireLeft = new KeyLeftBatteryListener(this);
        KeyRightBatteryListener _fireRight = new KeyRightBatteryListener(this);
        KeyCenterBatteryListener _fireCenter = new KeyCenterBatteryListener(this);
        KeyPListener _pauseGame = new KeyPListener(this);
        KeyQListener _showMenu = new KeyQListener(this);
        MyMouseListener myMouseListener = new MyMouseListener(this);

        refresh = new Refresher(1, this);
        this.addMouseListener(myMouseListener);
        refresh.start();

        buildCities();
        enemy = new Enemy(level, city);

        int cannonShift = MainConstants.WINDOW_HEIGHT - (80 + MainConstants.CANNON_HEIGHT);
        LeftCannon = new Cannon(380, cannonShift, false);
        CenterCannon = new Cannon(430, MainConstants.WINDOW_HEIGHT - (80 + MainConstants.CENTER_CANNON_HEIGHT), true);
        RightCannon = new Cannon(480, cannonShift, false);
    }

    @Override
    public void go()
    {
        repaint();
    }

    public void paintComponent(Graphics aBrush)
    {
        super.paintComponent(aBrush);
        Graphics2D aBetterBrush = (Graphics2D) aBrush;
        ground.draw(aBetterBrush);
        ground.fill(aBetterBrush);
        paintScore(aBrush);
        ArrayList<Explosion> toRemoveExplosion = new ArrayList<>();
        ArrayList<Missile> toRemoveMissile = new ArrayList<>();
        ArrayList<Cities> toRemoveCities = new ArrayList<>();

//        city.clear();

        if (paused)
        {
            paintPaused(aBrush);
        }

        // Cannon handler
        LeftCannon.draw(aBetterBrush);
        CenterCannon.draw(aBetterBrush);
        RightCannon.draw(aBetterBrush);
        // end cannon handler


        // explosion handler
        for (Explosion explosion: explosions)
        {
            explosion.fill(aBetterBrush);
            explosion.dissipate();
            if (explosion.hasDissipated())
            {
                toRemoveExplosion.add(explosion);
            }
        }

        for (Explosion explosion: toRemoveExplosion)
        {
            explosions.remove(explosion);
        }
        // end explosion handler

        // Checking missile collisions
        for (Missile missile: missiles)
        {
            Point mPos = missile.getPosition();
            missile.draw(aBetterBrush);
            if (!missile.move())
            {
                toRemoveMissile.add(missile);
            }

            for (Cities cities: city)
            {
                if (cities.isMissileColliding(mPos))
                {
                    cities.dissipate();
                    toRemoveMissile.add(missile);
                }
            }

            for (Explosion explosion: explosions)
            {
                if (explosion.isMissileColliding(mPos, missile.isSmart()))
                {
                    toRemoveMissile.add(missile);
                }
            }
        }

        for (Missile missile: toRemoveMissile)
        {
            explosions.add(missile.targetReached());
            missiles.remove(missile);
        }
        // End missile handler

        //cities??
        for (Cities c: city)
        {
            if (!c.getStatus())
            {
                c.draw(aBetterBrush);
            }
            else
            {
                toRemoveCities.add(c);
            }
        }

        for (Cities c: toRemoveCities)
        {
            city.remove(c);
        }

        // end cities handler

        // Enemy Handler
        if (!enemy.Tick())
        {
            if (enemy.allOut())
            {
                levelComplete = true;
            }
            else
            {
                missiles.add(enemy.Fire());
            }
        }
        // End enemy handler

        // Next round generator
        if (levelComplete && missiles.size() == 0)
        {
            levelComplete = false;
            level += 1;
            enemy.Reload();
            score += (LeftCannon.getAmmo() * MainConstants.REMAINING_MISSILE_SCORE);
            score += (CenterCannon.getAmmo() * MainConstants.REMAINING_MISSILE_SCORE);
            score += (RightCannon.getAmmo() * MainConstants.REMAINING_MISSILE_SCORE);
            LeftCannon.Reload();
            CenterCannon.Reload();
            RightCannon.Reload();
            score += (city.size() * MainConstants.REMAINING_CITY_SCORE);
            showLevelTransition = true;
        }
        // End next round generator

        // Game over check
        if (city.size() == 0)
        {
            paintGameOver(aBrush);
            refresh.stop();
        }
        // end game over check

        // Rebuild cities check
        if (score - (8000 * timesRebuild) > 8000)
        {
            buildCities();
            timesRebuild += 1;
        }
        // end rebuild cities check

        // Paint level transitions (checks are self contained)
        paintLevelTransition(aBrush);

        if (menu)
        {
            paintMenu(aBrush);
        }

        enemy.updateTargets(city);

        toRemoveExplosion.clear();
        toRemoveMissile.clear();
        toRemoveCities.clear();
    }

    private void paintScore(Graphics aBrush)
    {
        aBrush.setColor(Color.BLACK);
        aBrush.drawString("Score: " + score, 20, MainConstants.WINDOW_HEIGHT - 45);
        aBrush.drawString("Level: " + level, 21, MainConstants.WINDOW_HEIGHT - 60);

        aBrush.drawString("Press 'Q' for Menu", MainConstants.WINDOW_WIDTH - 150, MainConstants.WINDOW_HEIGHT - 50);
    }

    private void paintPaused(Graphics aBrush)
    {
        aBrush.setColor(Color.ORANGE);
        Font initialFont = aBrush.getFont();
        Font newFont = initialFont.deriveFont(initialFont.getSize() * 5F);
        aBrush.setFont(newFont);
        aBrush.drawString("PAUSED", 300, 180);
    }

    private void paintGameOver(Graphics aBrush)
    {
        aBrush.setColor(Color.RED);
        Font initialFont = aBrush.getFont();
        Font newFont = initialFont.deriveFont(initialFont.getSize() * 10F);
        aBrush.setFont(newFont);
        aBrush.drawString("THE END", 180, 150);
        newFont = initialFont.deriveFont(initialFont.getSize() * 5F);
        aBrush.setFont(newFont);
        aBrush.drawString("Score: " + score, 320, 210);
    }

    private void paintLevelTransition(Graphics aBrush)
    {
        if (showLevelTransition)
        {
            float sizeMod = (levelTransitionTime < 500) ? MainConstants.LEVEL_TRANSITION_FONT_SIZE_INCREASE / -500
                    : MainConstants.LEVEL_TRANSITION_FONT_SIZE_INCREASE / 500;
            aBrush.setColor(Color.YELLOW);
            Font initialFont = aBrush.getFont();
            Font newFont = initialFont.deriveFont(initialFont.getSize() * levelTransitionFontSize);
            aBrush.setFont(newFont);
            aBrush.drawString("INCOMING!!!", 200, 150);
            aBrush.drawString("Level: " + level, 300, 250);

            levelTransitionFontSize += sizeMod;
            levelTransitionTime -= 1;
            if (levelTransitionTime == 0)
            {
                levelTransitionTime = MainConstants.ENEMY_ROUND_WAIT;
                showLevelTransition = false;
            }
        }
    }

    private void paintMenu(Graphics aBrush)
    {
        SmartRectangle newBackground = new SmartRectangle(0, 0, MainConstants.WINDOW_WIDTH, MainConstants.WINDOW_HEIGHT, Color.DARK_GRAY, this);
        newBackground.draw((Graphics2D) aBrush);
        newBackground.fill((Graphics2D) aBrush);

        var newline = System.lineSeparator();

        aBrush.setColor(Color.BLUE);
        Font initialFont = aBrush.getFont();
        Font newFont = initialFont.deriveFont(60F);
        aBrush.setFont(newFont);
        aBrush.drawString("Controls", 20, 100);
        aBrush.setColor(Color.RED);
        aBrush.drawString("Rules", 370, 100);
        aBrush.setColor(Color.BLUE);

        newFont = initialFont.deriveFont(30F);
        aBrush.setFont(newFont);
        aBrush.drawString("Fire Cannons:", 60, 140);
        aBrush.drawString("1 - Left Cannon", 60, 180);
        aBrush.drawString("2 - Center Cannon", 60, 220);
        aBrush.drawString("3 - Right Cannon", 60, 260);
        aBrush.drawString("P - Pause Game", 60, 340);

        aBrush.setColor(Color.RED);
        aBrush.drawString("Remaining Missiles - 5 points", 420, 140);
        aBrush.drawString("Remaining Cities   - 50 points", 420, 180);
        aBrush.drawString("All Cities Rebuilt every 8000 Points", 400, 340);

        aBrush.setColor(Color.ORANGE);
        aBrush.drawString("Game ends when all", 460, 230);
        aBrush.drawString("cities are destroyed", 460, 270);


    }

    private class KeySpaceListener extends KeyInteractor
    {

        KeySpaceListener(JPanel p)
        {
            super(p, KeyEvent.VK_SPACE);
        }

        @Override
        public void actionPerformed(ActionEvent e)
        {
            ground.setColor(Color.RED);
        }
    }

    //  Fire the left battery using the 1 key
    private class KeyLeftBatteryListener extends KeyInteractor
    {

            KeyLeftBatteryListener(JPanel p)
            {
                super(p, KeyEvent.VK_1);
            }

            @Override
            public void actionPerformed(ActionEvent e)
            {
                // Shoot left
                Point mPnt = MouseInfo.getPointerInfo().getLocation();
                if (!LeftCannon.allOut() && !paused)
                {
                    missiles.add(LeftCannon.fire(mPnt));
                }
            }
    }

    //  Fire the right battery using the 3 key
    private class KeyRightBatteryListener extends KeyInteractor
    {

            KeyRightBatteryListener(JPanel p)
            {
                super(p, KeyEvent.VK_3);
            }

            @Override
            public void actionPerformed(ActionEvent e)
            {
                Point mPnt = MouseInfo.getPointerInfo().getLocation();
                if (!RightCannon.allOut() && !paused)
                {
                    missiles.add(RightCannon.fire(mPnt));
                }
            }
    }

//    Fire the center battery using the 2 key
    private class KeyCenterBatteryListener extends KeyInteractor
    {

        KeyCenterBatteryListener(JPanel p)
        {
            super(p, KeyEvent.VK_2);
        }

        @Override
        public void actionPerformed(ActionEvent e)
        {
            Point mPnt = MouseInfo.getPointerInfo().getLocation();
            if (!CenterCannon.allOut() && !paused)
            {
                missiles.add(CenterCannon.fire(mPnt));
            }
        }
    }

    // Pause the game
    private class KeyPListener extends KeyInteractor
    {
        KeyPListener(JPanel p) { super(p, KeyEvent.VK_P); }

        @Override
        public void actionPerformed(ActionEvent e)
        {
            if (paused)
            {
                refresh.restart();
                paused = false;
            }
            else
            {
                refresh.stop();
                paused = true;
                repaint();
            }
        }
    }

    private class KeyQListener extends KeyInteractor
    {
        KeyQListener(JPanel p) { super(p, KeyEvent.VK_Q); }

        @Override
        public void actionPerformed(ActionEvent e)
        {
            if (menu)
            {
                refresh.restart();
                menu = false;
            }
            else
            {
                refresh.stop();
                menu = true;
                repaint();
            }
        }
    }

    //  Mouse click event
    void mouseClicked(java.awt.event.MouseEvent e)
    {
    }
        
    private void buildCities()
    {
        city.clear();
        int cityShift = MainConstants.WINDOW_HEIGHT - (80 + MainConstants.CITY_HEIGHT);
        city.add(new Cities(20, cityShift));
        city.add(new Cities(150, cityShift));
        city.add(new Cities(280, cityShift));
        city.add(new Cities(520, cityShift));
        city.add(new Cities(650, cityShift));
        city.add(new Cities(780, cityShift));
    }
}
