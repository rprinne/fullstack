import { useEffect, useState } from 'react'
import countryService from '../services'

const ShowCountries = ({countries, handleClick}) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (countries.length === 1) {
      countryService.getWeather(countries[0].capitalInfo.latlng)
        .then(data => {
          if (data.cod === 200) {setWeather(data)}
        })
    }
  }, [countries])

  if (countries.length > 10) {
    return (
      <div className="tooMany">
        <p>Too many mathces, please specify another filter</p>
      </div>
    )
  }
  
  else if (countries.length > 1) {
    return (
      <div className="countryList">
        <ul>
          {countries.map(c => c.name.common)
            .sort()
            .map(name => (
              <li key={name}>
                {name} <button onClick={() => handleClick(name)}>show</button>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
  
  else if (countries.length > 0) {
    const c = countries[0]
    return (
      <div>
        <div className="countryInfo">
          <h1>{c.name.common}</h1>
          <p>capital: {Object.values(c.capital).join(', ')}</p>
          <p>area: {c.area}</p>
        </div>
        <div className="countryLanguages">
          <h2>languages:</h2>
          <ul>
            {Object.values(c.languages).map(l =>
              <li key={l}>{l}</li>
            )}
          </ul>
        </div>
        <div className="countryFlag">
          <img src={c.flags.png} alt={c.flags.alt}/>
        </div>
        <div className="countryWeather">
          <h2>Weather in {c.capital[0]}</h2>
          {(weather == null) && <p>Cannot display weather data right now...</p>}
          {weather && <p>temperature: {(weather.main.temp - 275.15).toFixed(1)} °C</p>}
          {weather && <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />}
          {weather && <p>wind: {weather.wind.speed} m/s </p>}
        </div>
      </div>
    )

  } else {
    return (
      <div className="notFound"><p>No countries found</p></div>
    )
  }
}

export default ShowCountries