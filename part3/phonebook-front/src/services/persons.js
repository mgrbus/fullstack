import axios from 'axios'

const baseURL = '/api/persons'

const getAll = () => {
    return axios.get(baseURL).then(response=>response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response => response.data)
    .catch(error=>console.log(error.response.data.error))
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const update = (id,changedPerson) => {
    const request = axios.put(`${baseURL}/${id}`, changedPerson)
    return request
    .then(response => response.data)
    .catch(error=>console.log(error.message))
}



export { create, remove, update, getAll }