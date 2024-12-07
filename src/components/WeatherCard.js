export default function renderWeatherCard(container, data) {
    const card = document.createElement("div");
    card.className = "card";
  
    card.innerHTML = `
      <h2>${data.name}</h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" />
      <p>${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
  
    container.appendChild(card);
  }
  