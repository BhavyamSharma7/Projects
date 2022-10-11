import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;

public class Frames implements ActionListener{

    JFrame frame = new JFrame();
    JLabel label = new JLabel();
    ImageIcon image = new ImageIcon("author-pic.png");
    JButton Playbtn = new JButton("Play!!");

    Frames(){

        //button
        Playbtn.setBackground(Color.green);
        Playbtn.setBounds(193, 290, 100, 30);
        Playbtn.setFocusable(false);
        Playbtn.addActionListener(this);

        //label
        label.setText("Welcome to TicTacToe Game");
        label.setIcon(image);
        label.setHorizontalAlignment(JLabel.CENTER);
        label.setHorizontalTextPosition(JLabel.CENTER);
        label.setVerticalTextPosition(JLabel.TOP);
        label.setFont(new Font(null, Font.BOLD,20));
        label.add(Playbtn);

        //frames
        frame.setTitle("TicTacToe");
        frame.setVisible(true);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setBounds(500,185,500,500);
        frame.add(label);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        
        if(e.getSource() == Playbtn){
            frame.dispose();
            GScreen screen = new GScreen();
        }
    }
}