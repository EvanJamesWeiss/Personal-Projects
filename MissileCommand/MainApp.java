import javax.swing.*;
import java.awt.*;

public class MainApp extends JFrame
{
    private MainApp(String title)
    {
        super(title);
        this.setResizable(false);
        this.setCursor(Cursor.getPredefinedCursor(Cursor.CROSSHAIR_CURSOR));
        this.setSize(MainConstants.WINDOW_WIDTH, MainConstants.WINDOW_HEIGHT);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        MainPanel mainPanel = new MainPanel();
        this.add(mainPanel, BorderLayout.CENTER);
        this.setVisible(true);
    }

    public static void main (String[] args)
    {
        MainApp app = new MainApp("Missile Command Game - CSE 2102");
    }
}
