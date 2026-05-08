import { useEffect, useState } from "react";
import countiresService from "./services/countries";
import weatherService from "./services/weather";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const [weather, setWeather] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const handleShowClick = (countryName) => {
    setSearchText(countryName);
  };

  useEffect(() => {
    countiresService.getAll().then((result) => {
      setCountriesData(result);
    });
  }, []);

  const value = searchText.trim().toLowerCase();
  const filteredCountries = countriesData.filter((country) =>
    country.name.common.toLowerCase().includes(value),
  );
  const msg =
    filteredCountries.length > 10 && searchText
      ? "Too many matches, specify another filter"
      : "";

  const country =
    filteredCountries.length === 1
      ? {
          name: filteredCountries[0].name.common,
          capital: filteredCountries[0].capital[0],
          area: filteredCountries[0].area,
          flagImg: filteredCountries[0].flags.png,
          languages: Object.values(filteredCountries[0].languages),
          lat: filteredCountries[0].capitalInfo.latlng[0],
          lng: filteredCountries[0].capitalInfo.latlng[1],
        }
      : null;

  useEffect(() => {
    if (!country?.lat || !country?.lng) {
      return;
    }

    weatherService.getCaptialWeather(country.lat, country.lng).then((data) => {
      setWeather({
        temp: data.current.temperature_2m,
        wind: data.current.wind_speed_10m,
        code: data.current.weather_code,
      });
    });
  }, [country?.lat, country?.lng]);

  return (
    <>
      <form>
        <h2>Find countries</h2>
        <input type="text" value={searchText} onChange={handleInputChange} />
      </form>
      <p>{msg}</p>
      {filteredCountries.length > 1 &&
        filteredCountries.length <= 10 &&
        filteredCountries.map((country) => (
          <div key={country.cca3}>
            <span>{country.name.common}</span>
            <button onClick={() => handleShowClick(country.name.common)}>
              show
            </button>
          </div>
        ))}
      {country && <CountryDetails country={country} weather={weather} />}
    </>
  );
};

export default App;
