const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country?.name}</h1>
      <p>Capital {country?.capital}</p>
      <p>Area {country?.area}</p>
      <h2>Languages</h2>
      <ul>
        {country?.languages?.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country?.flagImg} alt={country?.name} />
    </div>
  );
};

export default CountryDetails;
