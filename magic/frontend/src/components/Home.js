import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import itemService from '../services/itemService';
import Button from 'react-bootstrap/Button';


const Home = () => {

    const [users, setUsers] = useState([]);
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

    const submitHandler = (e) => {
        e.preventDefault();
        userService.getUsers()
        .then((res) => {
            setUsers(res);
            console.log(res);
        });
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
            <div className="container d-flex justify-content-center">
            {items.map(card => (<img className="cardImg" src={card.imageurl}/>))}
            </div>
            <div className="d-flex justify-content-center">
            <Button onClick={() => previousPage()}>Previous</Button>
            <div>{page}</div>
            <Button onClick={() => nextPage()}>Next</Button>
            </div>
        </div>
    );
}

export default Home;