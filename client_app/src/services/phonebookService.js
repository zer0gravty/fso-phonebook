import axios from "axios";

const BASE_URL = '/api/persons';

const getPeople = () => axios.get(BASE_URL).then(res => res.data)
const addPerson = (personObject) => axios.post(BASE_URL, personObject).then(res => res.data);
const deletePerson = (id) => axios.delete(`${BASE_URL}/${id}`).then(res => res.data);
const updatePerson = (id, updatedPerson) => axios.put(`${BASE_URL}/${id}`, updatedPerson).then(res => res.data);

const phoneService = {
    getPeople,
    deletePerson,
    addPerson,
    updatePerson,
};

export default phoneService;
