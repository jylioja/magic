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

    const res = await axios.post(`${baseUrl}/${userId}`, cardId, config);
    return res;
}

export default { addToCollection, setToken }