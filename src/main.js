import { getWeatherData } from "./services/weatherService.js";
import renderWeatherCard from "./components/WeatherCard.js";
import renderChart from "./components/ChartRenderer.js";

let isCelsius = true;

async function displayWeather(city) {
  if (!city) return alert("Please enter a city name!");

  const data = await getWeatherData(city, isCelsius ? "metric" : "imperial");
  if (data) {
    const weatherContainer = document.getElementById("weather-data");
    weatherContainer.innerHTML = "";

    data.forecast.forEach((forecast) => {
      renderWeatherCard(weatherContainer, forecast, isCelsius);
    });

    renderChart("chart-container", data.forecast);
  } else {
    alert("City not found!");
  }
}

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

function addFavorite(city) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(city)) {
    favorites.push(city);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
}

function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesList = document.getElementById("favorites-list");

  favoritesList.innerHTML = "";

  const toggleButton = document.createElement("button");
  toggleButton.innerHTML = "<h4>Favorites Cities</h4>";
  toggleButton.style.cursor = "pointer";
  toggleButton.onmouseover = () => {
    toggleButton.style.color = "brown";
  };
  toggleButton.onmouseout = () => {
    toggleButton.style.color = "";
  };
  toggleButton.style.display = "block";
  toggleButton.style.marginBottom = "10px";

const favoriteItemsContainer = document.createElement("ul");
favoriteItemsContainer.style.display = "none";
favoriteItemsContainer.style.listStyleType = "none";
favoriteItemsContainer.style.padding = "0";

favoriteItemsContainer.onmouseover = (event) => {
  if (event.target.tagName === "LI") {
    event.target.style.color = "white";
  }
};

favoriteItemsContainer.onmouseout = (event) => {
  if (event.target.tagName === "LI") {
    event.target.style.color = "";
  }
};

  toggleButton.addEventListener("click", () => {
    favoriteItemsContainer.style.display =
      favoriteItemsContainer.style.display === "none" ? "block" : "none";
  });

  favorites.forEach((city) => {
    const li = document.createElement("li");
    li.textContent = city;
    li.style.cursor = "pointer"; 
    li.style.padding = "5px 0";

    li.addEventListener("click", () => {
      displayWeather(city);
    });

    favoriteItemsContainer.appendChild(li);
  });

  favoritesList.appendChild(toggleButton);
  favoritesList.appendChild(favoriteItemsContainer);
}


document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(word => word)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  displayWeather(city);
  addFavorite(city);
});


document.getElementById("refresh-btn").addEventListener("click", () => {
  detectUserLocation();
  location.reload();
});

document.getElementById("unit-toggle").addEventListener("click", async () => {
  isCelsius = !isCelsius;
  document.getElementById("unit-toggle").textContent = isCelsius ? "Switch to °F" : "Switch to °C";

  const cityInput = document.getElementById("city-input").value
  .trim()
  .toLowerCase()
  .split(" ")
  .filter(word => word)
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
  const weatherContainer = document.getElementById("weather-data");
  const currentCity = weatherContainer.querySelector(".card h2")?.textContent || cityInput;

  if (currentCity) {
    await displayWeather(currentCity);
  } else {
    alert("Please search for a city first!");
  }
});


window.addEventListener("DOMContentLoaded", () => {
  detectUserLocation();
  renderFavorites();
});
