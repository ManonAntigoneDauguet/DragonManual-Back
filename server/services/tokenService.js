const { ValidationError } = require('../errorAdministrator/validationErrorClasse');
const { Token } = require('../database/models/tokenModel');
const tokenDao = require("../dao/tokenDao");


/**
 * Create and return a token of authentication
 * @param { Integer } userId 
 */
module.exports.createToken = async (userId) => {
    const maxIterations = 10;
    let iteration = 0;

    while (iteration++ <= maxIterations) {
        const token = new Token(userId);
        try {
            await tokenDao.createToken(token);
            return token;
        } catch (error) {
            if (error.code === "23505") { // The token value already exist in the db
                iteration++;
            } else {
                console.error('Error in tokenService.js', error);
                throw error;
            }
        }
    }
    console.log("Error in tokenService.js : too many loops to create a new unique token.");
}


/**
 * Return an error if the token is expired or invalid
 * @param { Object } tokenValue
 * @param { Integer } userId 
 */
module.exports.validateToken = async (tokenValue) => {
    data = await tokenDao.checkTokenAlreadyExists(tokenValue);
    if (data.rowCount === 0) {
        throw new ValidationError('Invalid token', 401);
    }
    let date = new Date();
    let now = date.getTime();
    if (now >= data.rows[0].expiry) {
        await tokenDao.deleteToken(tokenValue);
        throw new ValidationError('Expired session, please login again', 401);
    }
}