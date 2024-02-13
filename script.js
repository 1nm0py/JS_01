const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {

    const APIKey = '067f6308dfe5d7cc70df92649d7b1bec';
    const city = document.querySelector('.search-box input').value;

    if (city == ' ')
        return 0;

    fetch('https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}').then(response => response.json()).then(json => {

        if (json.cod == '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.remove('active');
            error404.classList.add('active');
            return;
        }

        const image = document('.weather-box img');
        const temperature = document('.weather-box .temperature');
        const description = document('.weather-box .description');
        const humidity = document('.weather-details .humidity span');
        const wind = document('.weather-detailes .wind span');

        if (cityHide.textContent == city) {
            return; 
        }
        else {
            cityHide.textContent = city;

            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Mist':
                    image.src = 'images/mist.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = 'images/cloud.png';

            }

            temperature.innerHTML = '${parseInt(json.main.temp)}<span>°C</span>';
            description.innerHTML = '${json.weather[0].description}';
            humidity.innerHTML = '${json.main.humidity}%';
            wind.innerHTML = '${parseInt(json.wind.speed)}Km/h';

            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneinfoHumidity = infoHumidity.cloneNode(true);
            const elCloneinfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');

            elCloneinfoHumidity.id = 'clone-info-humidity';
            elCloneinfoHumidity.classList.add('active-clone');

            elCloneinfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.add('active-clone');

            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend",elCloneInfoWeather)
                infoHumidity.insertAdjacentElement("afterend",elCloneinfoHumidity)
                infoWind.insertAdjacentElement("afterend",elCloneInfoWind)
            }, 2200);

            const CloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
            const totalCloneInfoWeather = CloneInfoWeather.length;
            const CloneInfoWeatherFirts = CloneInfoWeather[0];

            const CloneinfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
            const CloneInfoHumidityFirts = cloneInfoHumidity[0];

            const CloneinfoWind = document.querySelectorAll('.info-Wind.active-clone');
            const CloneInfoWindFirts = cloneInfoWind[0];

            if(totalCloneInfoWeather > 0) {
                CloneInfoWeatherFirts.classList.remove('active-clone');
                CloneInfoHumidityFirts.classList.remove('active-clone');
                CloneInfoWindFirts.classList.remove('active-clone');

                setTimeout(() => {
                    CloneInfoWeatherFirts.remove();
                    CloneInfoHumidityFirts.remove();
                    CloneInfoWindFirts.remove();
                },2200)
            }
        }


    });

});