import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countries = ({country}) => <li>{country.name.common}</li>

const InfoCountry = ({country}) => {
  return (
  <div>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <h3>languages</h3>
    <ul>
      {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.flags.alt}/>
  </div>
  )
}

const Content = ({obj}) => {

  if(obj.length > 10) {

    return <p>Too many matches, specify another filter.</p>

  } else if (obj.length === 1) {

    return <InfoCountry country={obj[0]} />

  } else {
    
    return (
      <ul>
        {obj.map(country => <Countries key={country.name.common} country={country}/>)}
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

  return (
    <div>
      <h1>List of Countries</h1>
      <input
        type="text"
        value={searchText}
        onChange={event => setSearchText(event.target.value)}
        placeholder="Search countries"
      />
      <Content obj={filteredCountries}/>
    </div>
  );
}

export default App;
