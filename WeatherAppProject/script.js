const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weatherBox');
const weatherDetails = document.querySelector('.weatherDetails');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = 'd408afa72b53bc05a84b3b4846898503';
    const city = document.querySelector('.search-box input').value;

       if (city === '') return;

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
           .then(response => {
            if (!response.ok) throw new Error('City not found');
            return response.json();
            })
           .then(json => {
            // If city not found
            if (json.cod === '404') {
                displayError();
                return;
            }

            // Clear previous error state
            hideError();

            // Update weather data
            updateWeatherData(json);
        })



        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayError();
        });

});


function displayError() {
    container.style.height = '400px';
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    error404.style.display = 'block';
    error404.classList.add('fadeIn');
}

function hideError() {
    error404.style.display = 'none';
    error404.classList.remove('fadeIn');
}

function updateWeatherData(json) {
    const image = document.querySelector('.weatherBox img');
    const temperature = document.querySelector('.weatherBox .temperatur');
    const description = document.querySelector('.weatherBox .description');
    const humidity = document.querySelector('.weatherDetails .humidity span');
    const wind = document.querySelector('.weatherDetails .wind span');

      // Update image based on weather condition
      switch (json.weather[0].main) {
        case 'Clear':
            image.src = 'imgClear.jpg';
            break;

        case 'Rain':
            image.src = 'imgRain.png';
            break;

        case 'Snow':
            image.src = 'imgSnow.png';
            break;

        case 'Clouds':
            image.src = 'imgCloud.jpg';
            break;

        case 'Haze':
            image.src = 'images/mist.jpg';
            break;

        default:
            image.src = '';
    }
    // Update weather details
    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;


     // Display weather information
    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '690px';
}
