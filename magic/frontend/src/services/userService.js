import axios from 'axios';

const baseUrl = '/users';

const getUsers = () => {
    const request = axios.get(baseUrl);
    return request
    .then(response => {
        return response.data
    });
}

export default { getUsers }