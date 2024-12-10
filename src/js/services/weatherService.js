import axios from 'axios';

const API_KEY = 'a3931b5210cc445c82393bfca94b8456';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherData(city, units = 'metric') {
  try {
    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: city, appid: API_KEY, units }
    });

    return {
      forecast: forecastResponse.data.list
        .filter((item, index) => index % 8 === 0)
        .map((item) => ({
          name: city,
          date: item.dt_txt,
          main: item.main,
          weather: item.weather,
          wind: item.wind
        }))
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}
