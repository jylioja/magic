import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import userService from '../services/userService';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const Register = () => {

const [newUser, setNewUser] = useState(
    {
        username: "",
        email: "",
        password: ""
    }
);

const [error, setError] = useState('');
const [added, setAdded] = useState('');

const setUserField = (fieldname, value) => {
    const tempUser = {...newUser};
    tempUser[fieldname] = value;
    setNewUser(tempUser);
}

const submitHandler = (e) => {
    e.preventDefault();
    newUser.username.length === 0 ? setError('no username') :
    newUser.email.length === 0 ? setError('no email') :
    newUser.password.length === 0 ? setError('no password') 
    : userService.addUser(newUser)
        .then(() => {
            console.log('User added');
            setAdded(`Created user ${newUser.username}`)
        })
        .catch((err) => {
            setError(err.response.data.error);
            console.log(error)
        })
}



    return(
        <div>
            {added ? 
            <div className="msg">{added}</div>:
            <Form className="justify-content-center d-flex" onSubmit={e => submitHandler(e, newUser)}>
                <Col sm={3}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={e => setUserField("username", e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" onChange={e => setUserField("email", e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => setUserField("password", e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Log in</Button>
                    <div className="error">{error}</div>
                    <div className="msg">{added}</div>
                </Col>
            </Form>
            }
        </div>
    )
}

export default Register;