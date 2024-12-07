import axios from "axios";

const API_KEY = "a3931b5210cc445c82393bfca94b8456";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getWeatherData(city) {
  try {
    const currentResponse = await axios.get(`${BASE_URL}/weather`, {
      params: { q: city, appid: API_KEY, units: "metric" },
    });

    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: city, appid: API_KEY, units: "metric" },
    });

    return {
      current: currentResponse.data,
      forecast: forecastResponse.data.list.slice(0, 5).map((item) => ({
        date: item.dt_txt,
        temp: item.main.temp,
      })),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}
