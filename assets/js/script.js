const searchBtn = document.querySelector(".search-btn");
const formInput = document.querySelector("#search-field");
const weatherData = document.querySelector(".weather-data");

const baseForecastUrl = `https://api.openweathermap.org/data/2.5/forecast`;
const baseCurrentUrl = `https://api.openweathermap.org/data/2.5/weather`;
const apiKey = "9d1a9d813981e0da34fda142fb0b3d26";

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();

    weatherData.innerHTML = '';

    const q = formInput.value;

    const currentWeatherApiUrl = `${baseCurrentUrl}?q=${q}&appid=${apiKey}`;
    const forecastWeatherApiUrl = `${baseForecastUrl}?q=${q}&appid=${apiKey}`;

    fetch(currentWeatherApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            const location = document.createElement("h3");
            location.textContent = 'Location: \n' + q;
            location.setAttribute("id", "location");
            weatherData.append(location);

            const currentContainer = document.createElement("section");
            currentContainer.setAttribute("class", "current-container");

            weatherData.append(currentContainer);

            const currentHeader = document.createElement("h4");
            currentHeader.setAttribute("id", "current-header");
            currentHeader.textContent = 'Current Weather';

            currentContainer.append(currentHeader);
            
            const currentWeatherCard = document.createElement("div")
            currentWeatherCard.setAttribute("id", "current-weather-card");

            currentContainer.append(currentWeatherCard);

            const currentDateEl = document.createElement("p");
            currentDateEl.setAttribute("id", "current-date");
            currentDateEl.innerHTML = dayjs.unix(data.dt).format("ddd MM/DD");

            const currentIconEl = document.createElement("img");
            currentIconEl.setAttribute("id", "current-icon");
            currentIconEl.innerHTML = data.weather[0].icon;
            currentIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            console.log(data.weather[0].icon);

            const currentTempEl = document.createElement("p");
            currentTempEl.setAttribute("id", "current-temp");
            currentTempEl.innerHTML = Math.round((data.main.temp - 273.15) * 1.8 + 32) + '\u00B0' + 'F';
            console.log(currentTempEl);

            const currentHumidityEl = document.createElement("p");
            currentHumidityEl.setAttribute("id", "current-humidity");
            currentHumidityEl.innerHTML = 'Humidity: ' + data.main.humidity + '%';

            const currentWindEl = document.createElement("p");
            currentWindEl.setAttribute("id", "current-wind");
            currentWindEl.innerHTML = 'Wind: ' + Math.round(data.wind.speed * 2.237) + ' mph';
            console.log(currentWindEl);

            currentWeatherCard.append(currentDateEl);
            currentWeatherCard.append(currentIconEl);
            currentWeatherCard.append(currentTempEl);
            currentWeatherCard.append(currentHumidityEl);
            currentWeatherCard.append(currentWindEl);

            formInput.value = '';

        });

    fetch(forecastWeatherApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            const forecastContainer = document.createElement("section");
            forecastContainer.setAttribute("class", "forecast-container");

            weatherData.append(forecastContainer);

            const forecastHeader = document.createElement("h4");
            forecastHeader.setAttribute("id", "forecast-header");
            forecastHeader.textContent = '5-Day Forecast';
            forecastContainer.append(forecastHeader);

            for (let i = 3; i < data.list.length; i = i + 8) {

                console.log(dayjs.unix(data.list[i].dt).format("ddd MM/DD"))

                const forecastWeatherCard = document.createElement("div");
                forecastWeatherCard.setAttribute("id", "forecast-weather-card");

                forecastContainer.append(forecastWeatherCard);

                const forecastDateEl = document.createElement("p");
                forecastDateEl.setAttribute("id", "forecast-date");
                forecastDateEl.innerHTML = dayjs.unix(data.list[i].dt).format("ddd MM/DD");
                forecastWeatherCard.append(forecastDateEl);

                const forecastIconEl = document.createElement("img");
                forecastIconEl.setAttribute("id", "forecast-icon");
                forecastIconEl.innerHTML = data.list[i].weather[0].icon;
                forecastIconEl.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
                console.log(data.list[i].weather[0].icon);
                forecastWeatherCard.append(forecastIconEl);

                const forecastTempEl = document.createElement("p");
                forecastTempEl.setAttribute("id", "forecast-temp");
                forecastTempEl.innerHTML = Math.round((data.list[i].main.temp - 273.15) * 1.8 + 32) + '\u00B0' + 'F';
                console.log(forecastTempEl);
                forecastWeatherCard.append(forecastTempEl);

                const forecastHumidityEl = document.createElement("p");
                forecastHumidityEl.setAttribute("id", "forecast-humidity");
                forecastHumidityEl.innerHTML = 'Humidity: ' + data.list[i].main.humidity + '%';
                forecastWeatherCard.append(forecastHumidityEl);

                const forecastWindEl = document.createElement("p");
                forecastWindEl.setAttribute("id", "forecast-wind");
                forecastWindEl.innerHTML = 'Wind: ' + Math.round(data.list[i].wind.speed * 2.237) + ' mph';
                console.log(forecastWindEl);
                forecastWeatherCard.append(forecastWindEl);

                formInput.value = '';

            };

        });
});
