const inputCity = document.getElementById("inputCity");
const ciytsearch = document.getElementById("ciytsearch");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const weatherEmoji = document.getElementById("weatherEmoji");
const condition = document.getElementById("condition");
const msgError = document.getElementById("msgError");




ciytsearch.addEventListener("click", async (event) => {
    event.preventDefault();
    const apiKey = "#";  //add your Api
    let city = inputCity.value.trim();
    if (city === "") {
    alert("Please enter a city name");
    return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("NO  response fetched from API");
        }
        const data = await response.json();

        
        cityName.innerText = `City: ${data.name}`;
        temp.innerText = `Temperature: ${Math.floor(data.main.temp)}°C`;

        const emoji = data.weather[0].id;

        if(emoji >= 200 && emoji < 300){
            weatherEmoji.innerText = "⛈️";
        }else if(emoji >= 300 && emoji < 550){
            weatherEmoji.innerText = "🌧️";
        }else if(emoji >= 550 && emoji < 701){
            weatherEmoji.innerText = "🌨️";
        }else if(emoji >= 701 && emoji < 800){
            weatherEmoji.innerText = "🍃";
        }else if(emoji == 800){
            weatherEmoji.innerText = "🌤️";
        }else{
            weatherEmoji.innerText = "☁️";
        }
        condition.innerText = `Description: ${data.weather[0].main}`;
        
    }catch(error){
        msgError.innerText = error;

    }
    inputCity.value = "";
});


