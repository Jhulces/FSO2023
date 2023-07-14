import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countries = ({country, selector}) => <li>{country.name.common}<button onClick={selector}>Show</button></li>

const Weather = ({weather}) => {
  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <p>temperature {(weather.main.temp - 273).toFixed(2)} Celsius</p>
      <p>{weather.description}</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt={weather.weather[0].description}/>
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const InfoCountry = ({country}) => {

  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}`)
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del clima:', error);
        setError("No weather data found");
      });
  }, [country.capital]);

  return (
  <div>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital}</p>
    <p>Area: {country.area} km2</p>
    <h3>languages</h3>
    <ul>
      {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.flags.alt}/>
    {weather && <Weather weather={weather}/>}
    {error && <p><em>{error}</em></p>}
  </div>
  )
}

const Content = ({obj, handle}) => {

  if(obj.length > 10) {

    return <p>Too many matches, specify another filter.</p>

  } else if (obj.length === 1) {

    return <InfoCountry country={obj[0]} />

  } else {
    
    return (
      <ul>
        {obj.map(country => <Countries key={country.name.common} country={country} selector={()=>handle(country.name.common)}/>)}
      </ul>
    )

  }
}

function App() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchText.toLowerCase())
  );

  const selectCountry = (name) => setSearchText(name);

  return (
    <div>
      <h1>List of Countries</h1>
      <input
        type="text"
        value={searchText}
        onChange={event => setSearchText(event.target.value)}
        placeholder="Search countries"
      />
      <Content obj={filteredCountries} handle={selectCountry}/>
    </div>
  );
}

export default App;
