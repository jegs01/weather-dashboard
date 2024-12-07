import { getWeatherData } from "./services/weatherService.js";
import renderWeatherCard from "./components/WeatherCard.js";
import renderChart from "./components/ChartRenderer.js";

// Function to display weather data
async function displayWeather(city) {
  if (!city) return alert("Please enter a city name!");

  const data = await getWeatherData(city);
  console.log(data);
  if (data) {
    const weatherContainer = document.getElementById("weather-data");
    weatherContainer.innerHTML = "";

    renderWeatherCard(weatherContainer, data.current);
    renderChart("chart-container", data.forecast);
  } else {
    alert("City not found!");
  }
}

// Automatically detect and display weather for user's location
async function detectUserLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      const geocodingResponse = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const locationData = await geocodingResponse.json();

      const city = locationData.city || locationData.locality || "Unknown Location";
      displayWeather(city);
    },
    (error) => {
      console.error("Error fetching location:", error);
      alert("Could not retrieve location. Please search manually.");
    }
  );
}

document.getElementById("search-btn").addEventListener("click", async () => {
  const city = document.getElementById("city-input").value.trim();
  await displayWeather(city);
});

window.addEventListener("DOMContentLoaded", detectUserLocation);
