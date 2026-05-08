import axios from "axios";
const baseUrl = "https://api.open-meteo.com/v1/forecast?";

const getCaptialWeather = (lat, lng) => {
  return axios
    .get(
      `${baseUrl}latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,weather_code`,
    )
    .then((response) => response.data);
};

export default { getCaptialWeather };
