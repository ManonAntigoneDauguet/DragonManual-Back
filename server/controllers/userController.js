const { ValidationError } = require('../utils/validationErrorClasse');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');


/**
 * Configure the response to the user to return a list of users
 * @param { Object } request 
 * @param { Number } request.limit
 * @param { Number } request.offset
 * @param { Object } res 
 */
module.exports.getUsers = async (request, res) => {
    try {
        const data = await userService.getUsers(request.limit, request.offset);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200, 'Users retrieved successully');
        res.write(JSON.stringify({ data: data.rows }));
        res.end("\n");
    } catch (error) {
        console.error('Error in userController.js', error);
        if (error instanceof ValidationError) {
            res.writeHead(error.code);
            res.write(error.message);
            res.end("\n");
        } else {
            res.writeHead(500);
            res.write('Internal error');
            res.end("\n");
        }
    }
}


/**
 * Create a new user
 * @param { Object } request 
 * @param { String } request.email
 * @param { String } request.password
 * @param { String } request.firstName
 * @param { String } request.lastName
 */
module.exports.createUser = async (request, res) => {
    try {
        await userService.createUser(request);
        res.writeHead(200, 'User successfully created');
        res.write('User successfully created');
        res.end("\n");
    } catch (error) {
        console.error('Error in userController.js', error);
        if (error instanceof ValidationError) {
            res.writeHead(error.code);
            res.write(error.message);
            res.end("\n");
        } else {
            res.writeHead(500);
            res.write('Internal error');
            res.end("\n");
        }
    }
}


/**
 * Configure the response to the user to return a authentication token
 * @param { Object } request 
 * @param { String } request.body.email
 * @param { String } request.body.password
 * @param { Object } res
 */
module.exports.loginUser = async (request, res) => {
    try {
        const token = await userService.loginUser(request);
        res.writeHead(200, 'User successfully logged in');
        res.write(JSON.stringify(token));
        res.end("\n");
    } catch (error) {
        console.error('Error in userController.js', error);
        if (error instanceof ValidationError) {
            res.writeHead(error.code);
            res.write(error.message);
            res.end("\n");
        } else {
            res.writeHead(500);
            res.write('Internal Server Error');
            res.end("\n");
        }
    }
}


/**
 * Configure the response to the user to return a list of users
 * @param { Object } request 
 * @param { Number } request.token
 * @param { Object } res 
 */
module.exports.getUserProfile = async (request, res) => {
    try {
        await tokenService.validateToken(request.token);
        const data = await userService.getUserProfile(request.token);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200, 'User retrieved successully');
        res.write(JSON.stringify({ data: data.rows }));
        res.end("\n");
    } catch (error) {
        console.error('Error in userController.js', error);
        if (error instanceof ValidationError) {
            res.writeHead(error.code);
            res.write(error.message);
            res.end("\n");
        } else {
            res.writeHead(500);
            res.write('Internal error');
            res.end("\n");
        }
    }
}