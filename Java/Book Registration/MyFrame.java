import java.awt.event.*;

import javax.swing.ButtonGroup;
import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JRadioButton;
import javax.swing.JTextField;

class MyFrame extends JFrame implements ActionListener{
    
    JTextField tf;
    JCheckBox c1, c2;
    JRadioButton r1, r2;
    
    MyFrame() {
        super("Demo");
        tf = new JTextField("Demo Text", 20);
        tf.setBounds(10, 20, 100, 80);
        c1 = new JCheckBox("Bold");
        c1.setMnemonic(KeyEvent.VK_B);

        c2 = new JCheckBox("Italics");
        c2.setMnemonic(KeyEvent.VK_I);

        r1 = new JRadioButton("lower");
        r2 = new JRadioButton("UPPER");

        r1.setActionCommand("lower");
        r2.setActionCommand("upper");

        ButtonGroup bg = new ButtonGroup();
        bg.add(r1);
        bg.add(r2);

        c1.addActionListener(this);
        c2.addActionListener(this);
        r1.addActionListener(this);
        r2.addActionListener(this);

    }
    @Override
    public void actionPerformed(ActionEvent ae) {
        switch (ae.getActionCommand()) {
            case "lower":
                tf.setText(tf.getText().toLowerCase());
                break;

            case "upper":
                tf.setText(tf.getText().toUpperCase());
                break;
        }
        
        int b = 0, i = 0;


        
    }
}
