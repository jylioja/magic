import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import itemService from '../services/itemService';
import Button from 'react-bootstrap/Button';
import Card from './Card'


const Home = () => {

    const [items, setItems] = useState([]);
    const [selectedSet, setSelectedSet] = useState('KHM')

    const [page, setPage] = useState(1);

    const getItems = () => {
        itemService.getPaginatedItems(page, selectedSet)
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

    useEffect(getItems, [page]);

    return(
        <div className="container">
            {items.length === 0 ?
            <div className="lds-dual-ring"></div>:
            <div className="card-container row justify-content-between">
            {items.map(card => (<Card card={card}/>))}
            </div> }
            <div className="d-flex justify-content-between mt-3">
                    <Button onClick={() => previousPage()}>Previous</Button>
                    <span className="">{page}</span>
                    <Button onClick={() => nextPage()}>Next</Button>
            </div>
        </div>
    );
}

export default Home;