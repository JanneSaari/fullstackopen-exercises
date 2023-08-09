import axios from "axios";

const url = '/api/persons';

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const getPerson = (id) => {
    const request = axios.get(`${url}/${id}`)
    return request.then(response => response.data)
}

const addPerson = (person) => {
    const request = axios.post(url, person)
    return request.then(response => response.data)
}

const removePerson = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
}

const updatePerson = (person) => {
    console.log(person)
    const request = axios.put(`${url}/${person.id}`, person)
    return request.then(response => response.data)
}

export default { getAll, getPerson, addPerson, removePerson, updatePerson}