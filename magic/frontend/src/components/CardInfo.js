import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import collectionService from '../services/collectionService';
import deckService from '../services/deckService';


const CardInfo = ({card, showCardsFrom}) => {

const [showSelectDeck, setShowSelectDeck] = useState(false);
const [showCreateNewDeck, setShowCreateNewDeck] = useState(false);
const [decks, setDecks] = useState([]);
const [newDeckName, setNewDeckName] = useState("")

const loggedIn = JSON.parse(window.localStorage.getItem('loggedUser'));

const addToCollection = (cardId) => {
    collectionService.setToken(loggedIn.token);
    collectionService.addToCollection(cardId, loggedIn.userId)
    .then(() => {
        console.log('Card added to collection');
    })
    .catch((err) => {
        console.log(err);
    })
}

const getDecks = () => {
    deckService.setToken(loggedIn.token);
    deckService.getDecks(loggedIn.userId)
    .then((items) => {
        setDecks(items);
    })
    .catch((err) => {
        console.log(err);
    });
}

const addToDeck = (cardId, deckName) => {
    deckService.setToken(loggedIn.token);
    deckService.addToDeck(cardId, deckName, loggedIn.userId)
    .then(() => {
        console.log('Card added to deck');
    })
    .catch((err) => {
        console.log(err);
    })
}

const createNewDeck = (cardId) => {
    deckService.setToken(loggedIn.token);
    deckService.createNewDeck(cardId, newDeckName, loggedIn.userId)
    .then(() => {
        console.log('Created new deck');
    })
    .catch((err) => {
        console.log(err);
    });
}


useEffect(() => {
    if(showCardsFrom === 'collection'){
        getDecks();
    }
},[])

    return(
        <div className="card-info min-vw-100 min-vh-100">
            {showSelectDeck ? 
                <div className="card-info-text card bg-dark text-center text-white">
                    <h1>Select deck</h1>
                    {decks.map(deck => (
                    <Button onClick={() => addToDeck(card.nid, deck.name)} className="m-2">{deck.name}</Button>))}
                    <div>
                        <Button onClick={() => {setShowSelectDeck(false); setShowCreateNewDeck(true);}} className="m-2">Create new deck</Button>
                    </div>
                </div> 
                :
                showCreateNewDeck ? 
                <div className="card-info-text card bg-dark text-center text-white">
                    <h1>Create new deck</h1>
                    <div>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter deck name" onChange={e => setNewDeckName(e.target.value)} />
                    </Form.Group>
                        <Button type="submit" onClick={() => createNewDeck(card.nid)} className="m-2">Create deck</Button>
                    </div>
                </div> 
                :
                <div className="card-info-text card bg-dark text-center text-white">
                    <h5 className="card-title">Name: {card.nname}</h5>
                    <p className="card-text">Set: {card.nset}</p>
                    <p className="card-text">Type: {card.ntype}</p>
                    <p className="card-text">Abilty: {card.nability}</p>
                    {loggedIn &&
                        <div>
                            {showCardsFrom === 'collection' ? 
                                <Button onClick={() => setShowSelectDeck(true)} className="mx-2">Add to Deck</Button> :
                                <Button onClick={() => addToCollection(card.nid)} className="mx-2">Add to collection</Button>
                            }
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default CardInfo;