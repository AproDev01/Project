const container = document.querySelector(".container");
const searchButton = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weatherBox");
const weatherDetails = document.querySelector(".weatherDetails");
const error404 = document.querySelector(".not-found");
const body = document.body;

searchButton.addEventListener("click", () => {
  const APIKey = "d408afa72b53bc05a84b3b4846898503";
  const city = document.querySelector(".search-box input").value.trim();

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        showError();
        return;
      }

      hideError();
      updateWeather(json);
    })
    .catch(() => showError());
});

function showError() {
  error404.style.display = "block";
  weatherBox.classList.remove("show");
  weatherDetails.classList.remove("show");
  error404.classList.add("show");
  container.style.height = "400px";
}

function hideError() {
  error404.style.display = "none";
  error404.classList.remove("show");
}

function updateWeather(json) {
  const image = document.querySelector(".weatherBox img");
  const temperature = document.querySelector(".temperatur");
  const description = document.querySelector(".description");
  const humidity = document.querySelector(".humidity span");
  const wind = document.querySelector(".wind span");

  switch (json.weather[0].main) {
    case "Clear":
      image.src = "imgClear.jpg";
      body.style.background = "linear-gradient(135deg, #56ccf2, #2f80ed)";
      break;
    case "Rain":
      image.src = "imgRain.png";
      body.style.background = "linear-gradient(135deg, #314755, #26a0da)";
      break;
    case "Snow":
      image.src = "imgSnow.png";
      body.style.background = "linear-gradient(135deg, #83a4d4, #b6fbff)";
      break;
    case "Clouds":
      image.src = "imgCloud.jpg";
      body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
      break;
    case "Haze":
    case "Mist":
      image.src = "imgHaze.jpg";
      body.style.background = "linear-gradient(135deg, #606c88, #3f4c6b)";
      break;
    default:
      image.src = "default.png";
      body.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)";
  }

  temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
  description.textContent = json.weather[0].description;
  humidity.textContent = `${json.main.humidity}%`;
  wind.textContent = `${parseInt(json.wind.speed)} km/h`;

  weatherBox.classList.add("show");
  weatherDetails.classList.add("show");
  container.style.height = "700px";
}
