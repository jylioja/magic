import React from 'react';
import Button from 'react-bootstrap/Button';
import collectionService from '../services/collectionService';


const cardInfo = ({card}) => {

const loggedIn = JSON.parse(window.localStorage.getItem('loggedUser'));

const addToCollection = (cardId) => {
    collectionService.setToken(loggedIn.token);
    collectionService.addToCollection(cardId, loggedIn.userId)
    .then(() => {
        console.log('Card added');
    })
    .catch((err) => {
        console.log(err.response.data.error);
    })
}

    
    return(
        <div className="card-info min-vw-100 min-vh-100">
            <div className="card-info-text card bg-dark text-center text-white">
                <h5 className="card-title">Name: {card.nname}</h5>
                <p className="card-text">Set: {card.nset}</p>
                <p className="card-text">Type: {card.ntype}</p>
                <p className="card-text">Abilty: {card.nability}</p>
                {loggedIn &&
                    <div>
                        <Button onClick={() => addToCollection(card.nid)} className="mx-2">Add to collection</Button>
                    </div>
                }
            </div>

        </div>
    )
}

export default cardInfo;