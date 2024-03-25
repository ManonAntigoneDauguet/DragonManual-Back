const { ValidationError } = require('../utils/validationErrorClasse');
const speciesService = require("../services/speciesService");


/**
 * Configure the response to the user to return a list of species
 * @param { Object } request 
 * @param { Number } request.limit
 * @param { Number } request.offset
 * @param { Object } res 
 */
module.exports.getSpecies = async (request, res) => {
    try {
        const data = await speciesService.getSpecies(request.limit, request.offset);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200, 'Species retrieved successully');
        res.write(JSON.stringify({ data: data.rows }));
        res.end("\n");
    } catch (error) {
        console.error('Error in speciesController.js', error);
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
 * Configure the response to the user to return the specie's data
 * @param { Number } specieId
 * @param { Object } res
 */
module.exports.getSpecie = async (specieId, res) => {
    try {
        const data = await speciesService.getSpecie(specieId);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200, 'Specie retrieved successully');
        res.write(JSON.stringify({ data: data.rows }));
        res.end("\n");
    } catch (error) {
        console.error('Error in speciesController.js', error);
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