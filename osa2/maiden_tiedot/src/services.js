import axios from 'axios'
const dbURL = 'https://studies.cs.helsinki.fi/restcountries/api'
const apiKey = process.env.REACT_APP_API_KEY

const getAll = () => {
  const request = axios.get(`${dbURL}/all`)
  return request.then(res => res.data)
}

const getWeather = (latlng) => {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&APPID=${apiKey}`
  const request = fetch(apiURL)
  return request.then(res => res.json()).then(data => data)
}

const countryService = { getAll, getWeather }
export default countryService