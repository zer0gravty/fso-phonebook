import axios from "axios";

const BASE_URL = '/api/persons';

const getNumbers = () => {
    return axios.get(BASE_URL).then(res => res.data);
}

const addPerson = (personObject) => {
    return axios.post(BASE_URL, personObject).then(res => res.data);
}

const deletePerson = (id) => {
    return axios.delete(`${BASE_URL}/${id}`).then(res => res.data);
}

const updatePerson = (id, updatedPerson) => {
    return axios.put(`${BASE_URL}/${id}`, updatedPerson).then(res => res.data);
}

const phoneService = {
    getNumbers,
    deletePerson,
    addPerson,
    updatePerson,
};

export default phoneService;
