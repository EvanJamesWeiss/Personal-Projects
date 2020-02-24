class Refresher extends javax.swing.Timer {
    private Screen _screen; // peer object

    Refresher(int anInterval, Screen aMover) {
       // Instantiate the timer with a particular interval
       super(anInterval, null);
       // Save the peer object ****
       _screen = aMover;
       // Register a new MoveListener with the MoveTimer ***
       this.addActionListener(new RefreshListener());
   }

   private class RefreshListener implements java.awt.event.ActionListener {
        public void actionPerformed(java.awt.event.ActionEvent e){
            _screen.go();
        }
   }
}

