import axios from 'axios';

const baseUrl = '/sets';

const getSets = (req, res) => {
    const request = axios.get(baseUrl);
    return request
    .then(response => {
        return response.data
    });
}

export default { getSets }