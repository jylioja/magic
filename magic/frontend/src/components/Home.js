import React, { useState, useEffect } from 'react';
import itemService from '../services/itemService';
import Button from 'react-bootstrap/Button';
import Card from './Card';
import Sets from './Sets';


const Home = () => {

    const [items, setItems] = useState([]);
    const [selectedSet, setSelectedSet] = useState('KHM')

    const [page, setPage] = useState(1);

    const getItems = () => {
        itemService.getPaginatedItems(page, selectedSet)
        .then((items) => {
            const newItems = items.data.map(card => ({...card, imageurl: `https://bucket-of-magic.s3.eu-north-1.amazonaws.com/${selectedSet}/${card.nname.replace(/\s/g, '+')}.full.jpg`}));
            setItems(newItems);
            console.log(newItems);
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

    useEffect(getItems, [page, selectedSet]);

    return(
        <div className="container">
            <Sets setSelectedSet={setSelectedSet} selectedSet={selectedSet} setPage={setPage}/>
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