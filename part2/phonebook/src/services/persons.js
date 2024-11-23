import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURL).then(response=>response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const update = (id,changedPerson) => {
    const request = axios.put(`${baseURL}/${id}`, changedPerson)
    return request.then(response => response.data)
}



export { create, remove, update, getAll }