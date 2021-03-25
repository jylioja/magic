import axios from 'axios';

const baseUrl = '/collections';

let token = "";

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
}

const addToCollection = async (cardId, userId) => {

    const config = {
        headers: {Authorization: token}
    };

    const body = {
        user_id: userId,
        item_id: cardId
    };

    const res = await axios.post(baseUrl, body, config);
    return res;
}

const getPaginatedCollection = (page, set, userId) => {

    const config = {
        headers: {Authorization: token}
    };

    const params = {
        page: page,
        set: set,
        user_id: userId
    };

    const request = axios.get(`${baseUrl}/paginated/${params.set}/${params.page}/${params.user_id}`, config);

    return request
    .then(response => {
        return response.data
    });
}

export default { 
    addToCollection, 
    setToken, 
    getPaginatedCollection, 
}