const { ValidationError } = require('../utils/validationErrorClasse');
const speciesDao = require("../dao/speciesDao");


/**
 * Configure the response to the user return a list of species
 * @param { Number } limit
 * @param { Number } offset 
 * @returns { Promise }
 */
module.exports.getSpecies = async (limit, offset) => {
    try {
        const data = await speciesDao.getSpecies(limit, offset);
        return data;
    } catch (error) {
        console.error('Error in speciesService.js', error);
        throw new ValidationError(error, 500);
    }
}


/**
 * Configure the response to the user return the specie's data
 * @param { Number } specieId
 * @returns { Promise }
 */
module.exports.getSpecie = async (specieId) => {
    try {
        const data = await speciesDao.getSpecie(specieId);
        if (data.rowCount !== 0) {
            return data;
        } else {
            throw new ValidationError('Specie not found', 404);
        }
    } catch (error) {
        console.error('Error in speciesService.js', error);
        throw error;
    }
}