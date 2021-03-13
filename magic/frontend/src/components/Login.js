import React, { useState } from 'react';
import loginService from '../services/loginService';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const Login = () => {

const loggedIn = JSON.parse(window.localStorage.getItem('loggedUser'));

const [newLogin, setNewLogin] = useState(
    {
        username: "",
        password: ""
    }
);

const [error, setError] = useState('');

const history = useHistory();

const setLoginField = (fieldname, value) => {
    const tempLogin = {...newLogin};
    tempLogin[fieldname] = value;
    setNewLogin(tempLogin);
}

const submitHandler = (e) => {
    e.preventDefault();
     loginService.login(newLogin)
        .then((loginData) => {
             window.localStorage.setItem(
                 'loggedUser', JSON.stringify(loginData)
             );
            console.log('Token', loginData.token);
            history.push("/")
            window.location.reload(false);
         })
         .catch((err) => {
             setError(err.response.data.error);
             console.log(error);
         })
}

const logOut = () => {
    window.localStorage.removeItem('loggedUser');
    console.log('Logged out')
}
    return(
        <div>
            {loggedIn ? <Button onClick={logOut()}>Log out</Button> :
            <Form className="justify-content-center d-flex" onSubmit={e => submitHandler(e, newLogin)}>
                <Col sm={3}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={e => setLoginField("username", e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => setLoginField("password", e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Log in</Button>
                    <div className="error">{error}</div>
                </Col>
            </Form>}
        </div>
    )
}

export default Login;