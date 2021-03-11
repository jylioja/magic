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
    const res = await axios.post(baseUrl, user);
    return res;
}

export default { getUsers, addUser }