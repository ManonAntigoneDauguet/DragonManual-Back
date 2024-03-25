const { User } = require('../database/models/userModel');
const { ValidationError } = require('../utils/validationErrorClasse');
require('dotenv').config();
const bcrypt = require('bcrypt');
const userDao = require ("../dao/userDao");
const tokenService = require("./tokenService");


/**
 * Return all users since the offset value to the limit value
 * @param { Number } limit
 * @param { Number } offset 
 * @returns { Promise }
 */
module.exports.getUsers = async (limit, offset) => {
    try {
        const data = await userDao.getUsers(limit, offset);
        return data;
    } catch (error) {
        console.error('Error in userService.js', error);
        throw new ValidationError(error, 500);
    }
}


/**
 * Create a new user
 * @param { Object } request 
 * @param { String } request.email
 * @param { String } request.password
 * @param { String } [request.firstName]
 * @param { String } [request.lastName]
 * @returns
 */
module.exports.createUser = async (request) => {
    const email = request.email;
    try {
        const data = await userDao.checkEmailAlreadyExists(email);
        if (data.rowCount !== 0) {
            throw new ValidationError('Email already exists', 400);
        }
        const hashPassword = await bcrypt.hash(request.password, 10);
        const user = new User(email, hashPassword, request.firstName, request.lastName);
        await userDao.createUser(user);
    } catch (error) {
        console.error('Error in userService.js', error);
        throw error;
    }
}


/**
 * Return a authentication token if email and password are valid
 * @param { Object } request 
 * @param { String } request.email
 * @param { String } request.password
 * @returns { String } as authentication token
 */
module.exports.loginUser = async (request) => {
    const email = request.email;
    const password = request.password;
    try {
        const data = await userDao.checkEmailAlreadyExists(email);
        if (data.rowCount === 0) {
            throw new ValidationError('User not found', 404)
        }
        const userPassword = data.rows[0].password;
        const isValid = await bcrypt.compare(password, userPassword);
        if (!isValid) {
            throw new ValidationError('Password is invalid', 400);
        }
        const token = await tokenService.createToken(data.rows[0].userid);
        return token.value;
    } catch (error) {
        console.error('Error in userService.js', error);
        throw error;
    }
}


/**
 * Return the user's information with a valid token
 * @param { String } tokenValue
 * @returns { Promise }
 */
module.exports.getUserProfile = async (tokenValue) => {
    try {
        const data = await userDao.getUserProfile(tokenValue);
        return data;
    } catch (error) {
        console.error('Error in userService.js', error);
        throw error;
    }
}
