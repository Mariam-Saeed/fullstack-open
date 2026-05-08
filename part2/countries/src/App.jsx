import { useEffect, useState } from "react";
import countiresService from "./services/countries";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [countriesData, setCountriesData] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
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
        }
      : null;

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
          <h3 key={crypto.randomUUID()}>{country.name.common}</h3>
        ))}
      {country && <CountryDetails country={country} />}
    </>
  );
};

export default App;
