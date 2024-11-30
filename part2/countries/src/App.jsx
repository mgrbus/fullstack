import { useState, useEffect } from 'react'
import { getAll, getWeather } from './services/countries'
import Searching from './components/Searching'


const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [found, setFound] = useState('')
  const [weather, setWeather] = useState('')

  useEffect(() => {
    getAll()
      .then(returned => setCountries(returned))
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
  const getWeatherData = (country) => {
    getWeather(country.capital).then(response => {
      setWeather(response)})

  }


  return (
    <div>
      <form>
        <p>find countries</p>
        <input type="text" value={search} onChange={handleSearchChange} />
      </form>
      {search !== '' ? <Searching getWeatherData={getWeatherData} weather={weather} found={found} setFound={setFound} search={search} countries={countries} /> : null}
    </div>
  )
}

export default App
