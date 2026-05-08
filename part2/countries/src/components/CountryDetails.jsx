const CountryDetails = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {country?.languages?.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flagImg} alt={country?.name} />
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {weather?.temp} Celsius</p>
      <p>Wind {weather?.wind} m/s</p>
    </div>
  );
};

export default CountryDetails;
