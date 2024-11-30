import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY


const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    return axios.get(baseUrl).then(response=>response.data)
}

const getWeather = (city) => {
    const endpoint=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    return axios.get(endpoint).then(response=>response.data)
}

export {getAll, getWeather}