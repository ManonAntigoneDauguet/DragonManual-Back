const { connexion } = require('../database/connection');
const client = connexion.client;


/**
 * Create a token of authentication
 * @param { Object } token 
 */
module.exports.createToken = async (token) => {
    const query =
        `
            INSERT INTO authenticationtoken(value, user_id, created_at, expiry)
            VALUES (($1), ($2), ($3), ($4));
        `;
    const values = [token.value, token.userId, token.createdAt, token.expiry];
    await client.query(query, values);
}


/**
 * Return the informations of the token with the entered userId
 * @param { String } tokenValue
 * @returns { Promise }
 */
module.exports.checkTokenAlreadyExists = async (tokenValue) => {
    const query =
        `
            SELECT * 
            FROM authenticationtoken 
            WHERE value = ($1);
        `;
    const values = [tokenValue];
    const data = await client.query(query, values);
    return data;
}


/**
 * Delete a token of authentication
 * @param { String } tokenValue
 */
module.exports.deleteToken = async (tokenValue) => {
    const query =
        `
            DELETE FROM authenticationtoken
            WHERE value = ($1);
        `;
    const values = [tokenValue];
    await client.query(query, values);
}