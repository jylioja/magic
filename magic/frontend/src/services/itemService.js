import axios from 'axios';

const baseUrl = '/items';

const getPaginatedItems = (page, set) => {
    const params = {
        page: page,
        set: set,
    };
    const request = axios.get(`${baseUrl}/paginated/${params.set}/${params.page}`);
    return request
    .then(response => {
        return response.data
    });
}

const getPaginatedCollection = (page, set, userId) => {
    const params = {
        page: page,
        set: set,
        user_id: userId
    };
    const request = axios.get(`${baseUrl}/paginated/${params.set}/${params.page}/${params.user_id}`);
    return request
    .then(response => {
        return response.data
    });
}
export default { getPaginatedItems, getPaginatedCollection }