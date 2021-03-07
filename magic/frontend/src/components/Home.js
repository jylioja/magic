import React, { useState } from 'react';
import userService from '../services/userService';


const Home = () => {

    const [users, setUsers] = useState([]);

    const submitHandler = (e) => {
        e.preventDefault();
        userService.getUsers()
        .then((res) => {
            setUsers(res);
            console.log(res);
        });
    } 

    return(
        <div>
            <a href="/login">Login</a>
            <form onSubmit={e => submitHandler(e)}>
                <button type="submit">Console log users</button>
            </form>
        </div>
    );
}

export default Home;