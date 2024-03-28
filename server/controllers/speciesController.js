const { controllerErrorService } = require('../errorAdministrator/controllerErrorService');
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
        controllerErrorService(res, error, "speciesController.js");
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
        controllerErrorService(res, error, "speciesController.js");
    }
}