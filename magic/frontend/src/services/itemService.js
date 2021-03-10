import axios from 'axios';

const baseUrl = '/items';

const getItems = (pageNumber) => {
    const request = axios.get(baseUrl, page);
    return request
    .then(response => {
        return response.data
    });
}

export default { getItems }