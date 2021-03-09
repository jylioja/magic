const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const getTokenFrom = request => {
    const authorization = request.get('authorization');
    console.log(authorization);
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7);
    }
    return null
}

const isAuthenticated = (request, response, next) => {
    const token = getTokenFrom(request);

    if(!token){
        return response.status(401).json(
            { error: 'token missing' }
        );

    const decodedToken = jwt.verify(token, config.SECRET);
    console.log('Decoded token:', decodedToken);

    if(!decodedToken || !decodedToken.id){
        return response.status(401).json(
            { error: 'token invalid' }
        );
    }

    response.locals.auth = { id: decodedToken.id, role: decodedToken.role }
    next();
    }
}

const isAdmin = (request, response, next) => {
    const rights = response.locals.auth.role;
    if(rights !== 'admin'){
        return response.status(401).json({
            error: 'not authorized'
        })
    }
    next();
}

module.exports = { isAdmin, isAuthenticated }