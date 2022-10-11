var random1 = Math.floor(Math.random()*6) + 1;
var random2 = Math.floor(Math.random()*6) + 1;

document.getElementById("Player1").src = "Dicee Challenge - Starting Files/images/dice"+random1+".png";
document.getElementById("Player2").src = "Dicee Challenge - Starting Files/images/dice"+random2+".png";


    if(random1 > random2){
        document.getElementById("result").innerHTML = "Player 1  Wins";
    }else if(random2 > random1){
        document.getElementById("result").innerHTML =  "Player 2  Wins";
    }else{
        document.getElementById("result").innerHTML = "Draaw";
    }
