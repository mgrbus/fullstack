import FoundCountry from "./FoundCountry.jsx"

const Searching = ({ weather,getWeatherData,setCapital, countries, search, found, setFound }) => {

    const searchFunction = () => {
        let searchedCountries = countries.filter(country =>
            country.name.common.toLowerCase().includes(search.toLowerCase()))
        return searchedCountries
    }

    const handleClick = (country) => {
        setFound(country)
    }


    return (
        <div><div> {searchFunction().length > 10
            ? <p>Too many matches, specify another filter</p>
            : searchFunction().length === 1
                ? searchFunction().map(country =>
                <FoundCountry found={found} getWeatherData={getWeatherData} weather={weather} 
                key={country.name.common} country={country} />)
                : <ul>
                    {countries.map(country =>
                        country.name.common.toLowerCase().includes(search.toLowerCase())
                            ? <li key={country["name"]["common"]}>
                                {country.name.common}<button onClick={() => handleClick(country)}>show</button>
                            </li>
                            : null)}
                </ul>
        }</div>
            {found !== '' ? <FoundCountry found={found} getWeatherData={getWeatherData} weather={weather} country={found} /> : null}
        </div>
    )
}

export default Searching