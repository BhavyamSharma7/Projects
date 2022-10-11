var screen = document.querySelector('.disply');
var body = document.querySelector('.container');
var buttons = document.querySelectorAll('button');

var fn = 0;
var sn = null;
var operator = null;


function isOperator(value) {
    return value == "+" || value == "%" || value == "-" || value == "*" || value == "/";
}

function isNumber(value){
    return (value >= 0 && value <= 9);
}

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {

        var value = this.getAttribute('data-value');
        calculate(value);
    });
}

document.addEventListener("keypress", function(event){
    var keyval = event.key;
    console.log(event.key);
    calculate(keyval);
});


function calculate(value){
    var text = screen.innerHTML;
    if (isOperator(value)) {
        operator = value;
        fn = parseFloat(text);
        screen.innerHTML = "";
    } else if (value == "ac" || value == "c") {
        screen.innerHTML = "";
    } else if (value == "sign" || value == "s") {
        fn = parseFloat(text);
        fn = -1 * fn;
        screen.innerHTML = fn;
    } else if (value == ".") {
        if (text.length && !text.includes('.')) {
            screen.innerHTML = text + '.';
        }
    } else if (value == "=") {
        sn = parseFloat(text);
        var result = eval(fn + ' ' + operator + ' ' + sn);
        if (result || result<=0) {
            screen.innerHTML = result;
            fn = result;
            sn = null;
            operator = null;
        }
    } else if(isNumber(value)){
        screen.innerHTML += value;
    }
}