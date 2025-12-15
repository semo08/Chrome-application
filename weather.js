const API_KEY = CONFIG.API_KEY;

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const weather = document.querySelector("#weather span:first-child")
            const city = document.querySelector("#weather span:last-child")
            const icon = data.weather[0].icon;

            weather.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" style="width: 35px; height: 35px; vertical-align: middle; filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.9));"> ${data.weather[0].main} | ${data.main.temp}°C | `;
            city.innerText = data.name;
        });
}
function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
