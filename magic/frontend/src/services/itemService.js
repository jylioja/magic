import axios from 'axios';

const baseUrl = '/items/paginated';

const getItems = (page) => {
    const params = {
        page: page
    };
    const request = axios.get(`${baseUrl}/${params.page}`);
    return request
    .then(response => {
        return response.data
    });
}

export default { getItems }