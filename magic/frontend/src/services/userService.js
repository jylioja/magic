import axios from 'axios';

const baseUrl = '/users';

const getUsers = () => {
    const request = axios.get(baseUrl);
    return request
    .then(response => {
        return response.data
    });
}

const addUser = async user => {
    const request = await axios.post(baseUrl, user);
    return request;
}

export default { getUsers, addUser }