const { connexion } = require('../database/connection');
const client = connexion.client;


/**
 * Return a list of species since the offset value to the limit value
 * @param { Number } limit
 * @param { Number } offset 
 * @returns { Promise }
 */
module.exports.getSpecies = async (limit, offset) => {
    const query =
        `
            SELECT * 
            FROM species 
            LIMIT ($1) 
            OFFSET ($2);
        `;
    const values = [limit, offset];
    const data = await client.query(query, values);
    return data;
}


/**
 * Return the specie's data
 * @param { Number } specieId
 * @returns { Promise }
 */
module.exports.getSpecie = async (specieId) => {
    const query =
        `
            SELECT * 
            FROM species 
            WHERE specieId = ($1);
        `;
    const values = [specieId];
    const data = await client.query(query, values);
    return data;
}