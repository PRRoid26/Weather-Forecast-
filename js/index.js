const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const cityInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


function card() {
  const APIKey = '538ac5b391e4654805a82f4a07fc3038';
  const city = cityInput.value.trim();

  if (city === '') {
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        
        return;
      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = '/weatherApp/images/clear.png';
          break;
        case 'Clouds':
          image.src = '/weatherApp/images/clouds.png';
          break;
        case 'Drizzle':
          image.src = '/weatherApp/images/drizzle.png';
          break;
        case 'Mist':
          image.src = '/weatherApp/images/mist.png';
          break;
        case 'Rain':
          image.src = '/weatherApp/images/rain.png';
          break;
        case 'Snow':
          image.src = '/weatherApp/images/snow.png';      
          break;
        case 'Haze':
          image.src = '/weatherApp/images/haze.png';
          break;
        case 'Smoke':
          image.src = '/weatherApp/images/haze.png';  
        default:
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px';
    });
}

searchButton.addEventListener('click', card);

cityInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    card();
  }
});

