const button = document.querySelector('button');

button.addEventListener("click",()=>{
    if(navigator.geolocation){ // If bowser support geolocation APi
        // geolocation.getCurrentPosition method is used to get current position of device
        // It takes three parameter success, error, options.
        // If everything is right then succes callback function will call ,  else error callback function will run ,    we don't need third paramter for this project.
        button.innerText = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else{
        button.innerText=" Your browser not support";
    }
});

function onSuccess(position){
    button.innerText = "Detecting your location .....";
    apiKey = '4959c056d69342009765612bc80c0e81'
    let {latitude, longitude} = position.coords;
    
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`)
    .then(response => response.json()).then(result =>{
        console.log(result)
        let allDetails = result.results[0].components; // paasing componnts obj to allDeatils variable
        let {city, postcode, country} = allDetails; // getting country, postcode, value
        button.innerText = `${city} ${postcode}, ${country}`;
    }).catch(()=>{
        button.innerText = "Please check your connection";
    })
    
}
function onError(error){
    if(error.code == 1){ // if user do not accept request
        button.innerText=" You denied the request";
    }
    else if(error.code == 2){ // if location is not found
        button.innerText=" Location not available";
    }
    else{ // if any error occur
        button.innerText="Please check your network connection ";
    }
    button.setAttribute("disabled", "true"); // if user denied the request then button will be disabled
}