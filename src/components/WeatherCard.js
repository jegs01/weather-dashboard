export default function renderWeatherCard(container, data, isCelsius) {
  const card = document.createElement("div");
  card.className = "card";

  const tempUnit = isCelsius ? "°C" : "°F";

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const todayDateString = today.toDateString();
  const tomorrowDateString = tomorrow.toDateString();

  const dataDate = new Date(data.date);
  const formattedDate = dataDate.toDateString();
  const formattedTime = dataDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  let displayDate;

  if (formattedDate === todayDateString) {
    displayDate = "Today";
  } else if (formattedDate === tomorrowDateString) {
    displayDate = "Tomorrow";
  } else {
    displayDate = formattedDate;
  }

  card.innerHTML = `
    <h2>${data.name}</h2>
    <h4><em>${formattedTime}</em> - ${displayDate}</h4>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" />
    <p>${
      data.weather[0].description
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    }</p>
    <p>Temperature: ${data.main.temp}${tempUnit}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;

  container.appendChild(card);
}
