import { useCallback } from "react"


const FoundCountry = ({ found,getWeatherData,country, weather }) => {
    const asja = useCallback(
        () => getWeatherData(country)
        ,[country])
    asja()
        
    
        
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h4>languages:</h4>
            <ul>
            {Object.values(country.languages).map(lang=><li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png} />
            <h3>Weather in {country.capital}</h3>
            {weather!=='' 
            ? <div><p>temperature {weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <p>wind {weather.wind.speed} m/s</p></div>
            : null}
        </div>
    )
}

export default FoundCountry