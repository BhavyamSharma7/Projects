console.log("Weather App");
let cty=document.getElementById("city");
console.log(cty.innerText);
document.getElementById('sr').setAttribute('placeholder',`${cty.innerText}`)

//--------------------------------------------------------------------------------------------------------------------------------
// this function grab the imput in nav and add a event listener on click and press of enter

let sr=document.getElementById('sr');
sr.addEventListener("keypress",(e)=>{
    //console.log(e);
    if(e.keyCode==13){
    console.log(e);
    find_weather();  
    }
  
    
});
let scico=document.getElementById('scico');
scico.addEventListener("click",()=>{
    find_weather();
    
});

//---------------------------------------------------------------------------------------------------------------------------------
// this function grab the temperature from api " open weather map"


function find_weather(){
    let cty=document.getElementById("sr");
    console.log(cty.value);
    let scity=cty.value;
    let city='delhi';
    
    
    const APIkey="20c9ff8e6495e630828fa28084ba7191";
            
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${scity}&appid=${APIkey}`;

    //window.location.href=url;

    getWeather();

    function getWeather()
    {
        fetch(url).then((response)=>{
        // console.log(response);
            return response.json();
        }).then((data)=>{
            console.log(data.cod);
            if(data.cod==200){
                show_data(data);
                create_audio();
            }
            else
            show_error();
        });
    }

}

//---------------------------------------------------------------------------------------------------------------------------------
// this function display the grabed temperature from api " open weather map"

function show_data(data){
    let num=data.main.temp-273;
    console.log(num.toFixed(2));
    console.log(data.weather[0].main);
    console.log(data.name);


    let city=document.getElementById('city');
    city.innerHTML=`${data.name}`;

    let condition=document.getElementById('condition');
    condition.innerHTML=`${data.weather[0].main}`;
    let img=img_return(data.weather[0].main);
    console.log(img);

    let temp=document.getElementById('temp');
    temp.innerHTML=`${num.toFixed(2)}`;

    let wicon=document.getElementById('wicon');
    wicon.setAttribute("src",`${img}`);
}

let reload=document.getElementById("home");
reload.addEventListener("click",()=>{
    window.location.reload();
    console.log("reload");
});


//---------------------------------------------------------------------------------------------------------------------------------
// this function display the error message by manipulating dom if api did not get any data 


function show_error(){
    let city=document.getElementById('city');
    let text=`City Not Found :( `;
    city.innerHTML=`${text}`;

    let condition=document.getElementById('condition');
    let txt_1=`Try Again!!!!`;
    condition.innerHTML=`${txt_1}`;

    let temp=document.getElementById('temp');
    let txt_2=`--.--`;
    temp.innerHTML=`${txt_2}`;

    let wicon=document.getElementById('wicon');
    wicon.setAttribute("src","src/error.png");

}



function img_return(da){
    let weath=["src/1 (1).webp",
    "src/1 (2).png",
    "src/1 (3).png",
    "src/1 (4).png",
    "src/1 (5).png",
    "src/1 (6).png",
    ];
    switch (da) {
        case 'Clouds':
            return weath[0];
            break;
        case 'Haze':
            return weath[1];
            break;
        case 'Rain':
            return weath[2];
            break;
        case 'Clear':
            return weath[3];
            break;    
        default:return 'nodata';
            break;
    }
}

//---------------------------------------------------------------------------------------------------------------------------------
// this function create hidden audio element using embed and push to the dom

function create_audio(){
    let aud=document.createElement("embed");
    aud.setAttribute('src','src/iphone_pay.mp3');
    aud.setAttribute('autostart','true');
    aud.setAttribute('loop','true');
    aud.setAttribute('width','0');
    aud.setAttribute('height','0');
    let audio=document.getElementById("audio");
    audio.appendChild(aud);
}



















//mdn code work

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';


window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';
  
    addBtn.addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = 'none';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    });
  });