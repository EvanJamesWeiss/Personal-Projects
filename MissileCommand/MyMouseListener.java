import java.awt.event.*;
import javax.swing.event.*;
    public class MyMouseListener extends MouseAdapter
    {
        private MainPanel _myPanel;
        // constructor
        MyMouseListener(MainPanel p)
        {
            _myPanel = p;
        }
        public void mouseClicked(MouseEvent e)
        {
            _myPanel.mouseClicked(e);
        }
    }