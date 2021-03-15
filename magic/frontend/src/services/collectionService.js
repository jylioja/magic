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
    }

    const res = await axios.post(baseUrl, body, config);
    return res;
}

export default { addToCollection, setToken }