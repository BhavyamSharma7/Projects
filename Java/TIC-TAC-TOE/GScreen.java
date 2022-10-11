import java.awt.*;
import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;

import javax.swing.*;
import javax.swing.border.*;

public class GScreen implements ActionListener {

    Random random = new Random();
    JFrame frame = new JFrame();
    JLabel label = new JLabel();
    JPanel btn_panel = new JPanel();
    JButton[] Playbtn = new JButton[9];
    int cellsFilled = 0;
    Border border = BorderFactory.createLineBorder(Color.GREEN);
    boolean first_turn = false;

    GScreen() {

        // buttons_panel
        btn_panel.setLayout(new GridLayout(3, 3));
        btn_panel.setBackground(Color.LIGHT_GRAY);

        // label
        for (int i = 0; i < 9; i++) {
            Playbtn[i] = new JButton();
            btn_panel.add(Playbtn[i]);
            Playbtn[i].setFont(new Font("MV Boli", Font.BOLD, 120));
            Playbtn[i].setFocusable(false);
            Playbtn[i].addActionListener(this);
        }

        label.setBackground(new Color(25, 25, 25));
        label.setForeground(Color.green);
        label.setText("Tic-Tac-Toe");
        label.setOpaque(true);
        label.setBorder(border);
        label.setHorizontalAlignment(JLabel.CENTER);
        label.setFont(new Font("Ink Free", Font.BOLD, 68));

        // frames
        frame.setTitle("TicTacToe");
        frame.setVisible(true);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setBounds(500, 185, 500, 500);
        frame.setLayout(new BorderLayout());
        frame.add(label, BorderLayout.NORTH);
        frame.add(btn_panel);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        for (int j = 0; j < 9; j++) {
            if (e.getSource() == Playbtn[j]) {
                cellsFilled++;
                if (first_turn) {
                    if (Playbtn[j].getText() == "") {
                        Playbtn[j].setForeground(Color.blue);
                        Playbtn[j].setText("X");
                        first_turn = false;
                        label.setText("O turn");
                        check();
                    }
                } else {
                    if (Playbtn[j].getText() == "") {
                        Playbtn[j].setForeground(Color.red);
                        Playbtn[j].setText("O");
                        first_turn = true;
                        label.setText("X turn");
                        check();
                    }
                }
            }
        }
    }

    public void check() {
        if (cellsFilled == 9) {
            cellsFilled = 0;
            Draw();   
        }
        if ((Playbtn[0].getText() == "X") &&
                (Playbtn[1].getText() == "X") &&
                (Playbtn[2].getText() == "X")) {
            xWins(0, 1, 2);
        }
        if ((Playbtn[3].getText() == "X") &&
                (Playbtn[4].getText() == "X") &&
                (Playbtn[5].getText() == "X")) {
            xWins(3, 4, 5);
        }
        if ((Playbtn[6].getText() == "X") &&
                (Playbtn[7].getText() == "X") &&
                (Playbtn[8].getText() == "X")) {
            xWins(6, 7, 8);
        }
        if ((Playbtn[0].getText() == "X") &&
                (Playbtn[4].getText() == "X") &&
                (Playbtn[8].getText() == "X")) {
            xWins(0, 4, 8);
        }
        if ((Playbtn[2].getText() == "X") &&
                (Playbtn[4].getText() == "X") &&
                (Playbtn[6].getText() == "X")) {
            xWins(2, 4, 6);
        }
        if ((Playbtn[0].getText() == "X") &&
                (Playbtn[3].getText() == "X") &&
                (Playbtn[6].getText() == "X")) {
            xWins(0, 3, 6);
        }
        if ((Playbtn[1].getText() == "X") &&
                (Playbtn[4].getText() == "X") &&
                (Playbtn[7].getText() == "X")) {
            xWins(1, 4, 7);
        }
        if ((Playbtn[2].getText() == "X") &&
                (Playbtn[5].getText() == "X") &&
                (Playbtn[8].getText() == "X")) {
            xWins(2, 5, 8);
        }
        if ((Playbtn[0].getText() == "O") &&
                (Playbtn[1].getText() == "O") &&
                (Playbtn[2].getText() == "O")) {
            oWins(0, 1, 2);
        }
        if ((Playbtn[3].getText() == "O") &&
                (Playbtn[4].getText() == "O") &&
                (Playbtn[5].getText() == "O")) {
            oWins(3, 4, 5);
        }
        if ((Playbtn[6].getText() == "O") &&
                (Playbtn[7].getText() == "O") &&
                (Playbtn[8].getText() == "O")) {
            oWins(6, 7, 8);
        }
        if ((Playbtn[0].getText() == "O") &&
                (Playbtn[4].getText() == "O") &&
                (Playbtn[8].getText() == "O")) {
            oWins(0, 4, 8);
        }
        if ((Playbtn[2].getText() == "O") &&
                (Playbtn[4].getText() == "O") &&
                (Playbtn[6].getText() == "O")) {
            oWins(2, 4, 6);
        }
        if ((Playbtn[0].getText() == "O") &&
                (Playbtn[3].getText() == "O") &&
                (Playbtn[6].getText() == "O")) {
            oWins(0, 3, 6);
        }
        if ((Playbtn[1].getText() == "O") &&
                (Playbtn[4].getText() == "O") &&
                (Playbtn[7].getText() == "O")) {
            oWins(1, 4, 7);
        }
        if ((Playbtn[2].getText() == "O") &&
                (Playbtn[5].getText() == "O") &&
                (Playbtn[8].getText() == "O")) {
            oWins(2, 5, 8);
        }

    }

    public void firstTurn() {
        try {
            Thread.sleep(1500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        if (random.nextInt(2) == 0) {
            first_turn = true;
            label.setText("X turn");
        } else {
            first_turn = false;
            label.setText("O turn");
        }
    }

    public void xWins(int a, int b, int c) {
        Playbtn[a].setBackground(Color.GREEN);
        Playbtn[b].setBackground(Color.GREEN);
        Playbtn[c].setBackground(Color.GREEN);

        for (int i = 0; i < 9; i++) {
            Playbtn[i].setEnabled(false);
        }
        label.setText("X Wins");
    }

    public void oWins(int a, int b, int c) {
        Playbtn[a].setBackground(Color.GREEN);
        Playbtn[b].setBackground(Color.GREEN);
        Playbtn[c].setBackground(Color.GREEN);

        for (int i = 0; i < 9; i++) {
            Playbtn[i].setEnabled(false);
        }
        label.setText("O Wins");
    }
    public void Draw() {

        for (int i = 0; i < 9; i++) {
            Playbtn[i].setEnabled(false);
        }
        label.setText("Draw");
    }
}
