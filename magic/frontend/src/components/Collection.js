import React, { useState, useEffect } from 'react';
import collectionService from '../services/collectionService';
import Button from 'react-bootstrap/Button';
import Card from './Card'
import { useHistory } from 'react-router-dom';


const Home = () => {

    const [items, setItems] = useState([]);
    const [selectedSet, setSelectedSet] = useState('KHM')

    const [page, setPage] = useState(1);

    const loggedIn = JSON.parse(window.localStorage.getItem('loggedUser'));

    const getItems = () => {
        collectionService.setToken(loggedIn.token);
        collectionService.getPaginatedCollection(page, selectedSet, loggedIn.userId)
        .then((items) => {
            setItems(items);
            console.log(items);
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
    },[page])
    
    return(
        <div className="container">
            <h1 onClick={() => console.log(loggedIn.token)}>My Collection</h1>
            {items.length === 0 ?
            <div className="lds-dual-ring"></div>:
            <div className="card-container row justify-content-between">
            {items.map(card => (<Card card={card}/>))}
            </div> }
            {items.length < 1 ? 
                <div>
                    You have no cards in your collection.
                </div> : null}
            <div className="d-flex justify-content-between mt-3">
                    <Button onClick={() => previousPage()}>Previous</Button>
                    <span className="">{page}</span>
                    <Button onClick={() => nextPage()}>Next</Button>
            </div>
            </div>
    );
}

export default Home;