const { connexion } = require('../database/connection');
const client = connexion.client;


/**
 * Return all users since the offset value to the limit value
 * @param { Number } limit
 * @param { Number } offset 
 * @returns { Promise }
 */
module.exports.getUsers = async (limit, offset) => {
    const query =
        `
            SELECT first_name, last_name 
            FROM users 
            LIMIT ($1) 
            OFFSET ($2);
        `;
    const values = [limit, offset];
    const data = await client.query(query, values);
    return data;
}


/**
 * Create a new user
 * @param { Object } request 
 * @param { String } request.email
 * @param { String } request.hashPassword
 * @param { String } [request.firstName]
 * @param { String } [request.lastName]
 */
module.exports.createUser = async (request) => {
    const query =
        `
            INSERT INTO users(first_name, last_name, email, password, permission_level)
            VALUES (($1), ($2), ($3), ($4), 'public');
        `;
    const values = [request.firstName, request.lastName, request.email, request.hashPassword];
    await client.query(query, values);
}


/**
 * Return the informations of the user with the entered email
 * @param { String } email
 * @returns { Promise }
 */
module.exports.checkEmailAlreadyExists = async (email) => {
    const query =
        `
            SELECT * 
            FROM users 
            WHERE email = ($1);
        `;
    const values = [email];
    const data = await client.query(query, values);
    return data;
}


/**
 * Return the user's information with a valid token
 * @param { String } tokenValue
 * @returns { Promise }
 */
module.exports.getUserProfile = async (tokenValue) => {
    const query =
        `
            SELECT first_name, last_name, email, password 
            FROM users 
            RIGHT OUTER JOIN authenticationtoken 
            ON users.user_id = authenticationtoken.user_id
            WHERE authenticationtoken.value = ($1);
        `;
    const values = [tokenValue];
    const data = await client.query(query, values);
    return data;
}