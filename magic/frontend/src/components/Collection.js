import React, { useState, useEffect } from 'react';
import collectionService from '../services/collectionService';
import Button from 'react-bootstrap/Button';
import Card from './Card'
import Sets from './Sets';

const Collection = () => {

    const [items, setItems] = useState([]);
    const [selectedSet, setSelectedSet] = useState('KHM');
    const [itemsCount, setItemsCount] = useState(0);
    const [showCardsFrom, setShowCardsFrom] = useState('collection');

    const [page, setPage] = useState(1);

    const loggedIn = JSON.parse(window.localStorage.getItem('loggedUser'));

    const getItems = () => {
        collectionService.setToken(loggedIn.token);
        collectionService.getPaginatedCollection(page, selectedSet, loggedIn.userId)
        .then((response) => {
            const newItems = response.data.map(card => ({...card, imageurl: `https://bucket-of-magic.s3.eu-north-1.amazonaws.com/${selectedSet}/${card.nname.replace(/\s/g, '+')}.full.jpg`}));
            setItems(newItems);
            setItemsCount(response.totalCount);
            console.log(response);
            console.log(response.totalCount);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const nextPage = () => {
        setPage(page + 1);
    }

    const previousPage = () => {
        if(page > 1){
            setPage(page - 1)
        }
    }

    useEffect(() => {
        if(loggedIn){
            getItems();
        }
    },[page, selectedSet])
    
    return(
        <div className="container">
            <Sets setSelectedSet={setSelectedSet} selectedSet={selectedSet} setPage={setPage}/>
            <h1 onClick={() => console.log(loggedIn.token)}>My Collection</h1>
            {items.length === 0 ?
            <div className="lds-dual-ring"></div>:
            <div className="card-container row justify-content-center">
            {items.map(card => (<Card card={card} showCardsFrom={showCardsFrom}/>))}
            </div> }
            <div className="d-flex justify-content-between mt-3">
                <Button onClick={() => previousPage()}>Previous</Button>
                <span className="">{page}</span>
                <Button onClick={() => nextPage()}>Next</Button>
            </div>
        </div>
    );
}

export default Collection;