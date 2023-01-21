'useStrict'
// api key from {openweather}
const API_KEY = '0ae51c0c4657598adb4bbcc70b46f4a9';

// selecting parent element
const input = document.querySelector('.input');
const submitBtn = document.querySelector('.submit-btn');
const displayWeather = document.querySelector('.weather-display');

const getWeather = async(city) => {

    displayWeather.innerHTML = `<p class="wrong-data">Loading...</p>`;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    
    const data = await response.json();
    return dataDisplay(data);
}

// displaying the weather data:
const dataDisplay = (data) => {
    if(data.cod == '404'){
        displayWeather.innerHTML = `<p class="wrong-data">Incorrect city name</p>`
    }

    // converting unix time to real time
    let sunrise =new Date(data.sys.sunrise * 1000).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    let sunset=new Date(data.sys.sunset * 1000).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

    let temp = Math.trunc(data.main.temp)


    displayWeather.innerHTML = `
        <div class="icon-center">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" class="image">
            <p class="weather-text-prime">${data.weather[0].main}</p>
            <p class="weather-text-sub">${data.weather[0].description}</p>
        </div>

        <div class="weather-desc">
            <div class="weather-desc-details">
                <p class="wind"><img src="imgs/wind-speed.png" alt="" class="wind-icon"> ${data.wind.speed} km/hr</p>
                <p class="wind"><img src="imgs/humidity.png" alt="" class="wind-icon"> ${data.main.humidity}%</p>
                <p class="wind"><img src="imgs/sunrise.png" alt="" class="wind-icon"> ${sunrise}</p>
                <p class="wind"><img src="imgs/sunset.png" alt="" class="wind-icon"> ${sunset}</p>
            </div>
            <div class="weather-desc-celsius"><span class="temp">${temp}° </span> <span class="celsius">c</span></div>
        </div>
    `
}


submitBtn.addEventListener('click', ()=> {
    getWeather(input.value);
})


