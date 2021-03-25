import axios from 'axios';

const baseUrl = '/decks';

let token = "";

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
}

const getDecks = (userId) => {

    const config = {
        headers: {Authorization: token}
    };

    const req = axios.get(`${baseUrl}/${userId}`, config);

    return req
    .then(res => {
        return res.data
    });
}

const addToDeck = async (cardId, deckName, userId) => {

    const config = {
        headers: {Authorization: token}
    };

    const body = {
        item_id: cardId,
        deck_name: deckName,
        user_id: userId
    };

    const res = axios.post(`${baseUrl}/deck/${body.deck_name}`, body, config)
    return res;
}

const createNewDeck = (cardId, deckName, userId) => {
    const config = {
        headers: {Authorization: token}
    };

    const body = {
        item_id: cardId,
        deck_name: deckName,
        user_id: userId
    };

    const res = axios.post(`${baseUrl}/newDeck/${body.deck_name}`, body, config)
    return res;
}

export default {
    setToken,
    getDecks,
    createNewDeck,
    addToDeck
}