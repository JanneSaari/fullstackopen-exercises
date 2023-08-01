import axios from "axios";

const url = 'https://studies.cs.helsinki.fi/restcountries/';

const getAll = () => {
    const request = axios.get(`${url}/api/all`)
    return request.then(response => response.data)
}

const getCountry = (name) => {
    const request = axios.get(`${url}api/name/${name}`)
    return request.then(response => response.data)
}

export default { getAll, getCountry }