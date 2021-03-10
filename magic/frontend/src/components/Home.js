import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import itemService from '../services/itemService';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


const Home = () => {

    const [users, setUsers] = useState([]);
    const [items, setItems] = useState([]);

    const [page, setPage] = useState(0);

    const getItems = (page) => {
        itemService.getItems()
        .then((items) => {
            setItems(items);
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
        if(page > 0){
            setPage(page - 1)
        }
    }

    useEffect(getItems, []);

    return(
        <div>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
            <div className="d-flex">
            <Button onClick={() => previousPage()}>Previous</Button>
            <div>{page}</div>
            <Button onClick={() => nextPage()}>Next</Button>
            </div>
            <form onSubmit={e => submitHandler(e)}>
                <button type="submit">Console log users</button>
            </form>
            <div>
            {items.map(card => (<img src={card.imageurl}/>))}
            </div>
        </div>
    );
}

export default Home;