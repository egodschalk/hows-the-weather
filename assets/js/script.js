const searchBtn = document.querySelector(".search-btn");
const formInput = document.querySelector("#search-field");

const currentContainer = document.querySelector(".current-container");
const currentWeatherCard = document.querySelector("#current-weather");
const forecastContainer = document.querySelector(".forecast-container");
const forecastWeatherCard = document.querySelector("#forecast-weather-card");


const baseWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast`;
const baseGeocodeUrl = `http://api.openweathermap.org/geo/1.0/direct`;
const apiKey = "9d1a9d813981e0da34fda142fb0b3d26";


searchBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const q = formInput.value;
    // currently need to a input city to get the lat & lon
    const geocodeApiUrl = `${baseGeocodeUrl}?q=${q}&limit=1&appid=${apiKey}`

    fetch(geocodeApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            const lat = data[0].lat;
            const lon = data[0].lon;


            const weatherApiUrl = `${baseWeatherUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`;


            fetch(weatherApiUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data2) {
                    console.log(data2);
                })
            // })
            // })

            // for (let i = 0; i < data[i].length; i++) {

            //     const forecastIconEl = document.createElement("img");
            //     forecastIconEl.setAttribute("id", "forecast-icon");
            //     forecastIconEl.src = data[i].;

            //     const forecastDateEl = document.createElement("p");
            //     forecastDateEl.setAttribute("id", "forecast-date");
            //     forecastDateEl.innerHTML = data[i].;




            //     forecastWeatherCard.append(forecastIconEl);
            //     forecastWeatherCard.append(forecastDateEl);

            //     formInput.value = '';

            // };

        });
});
// });