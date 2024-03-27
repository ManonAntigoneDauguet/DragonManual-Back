const speciesController = require("../controllers/speciesController");
const { isCorrectNumber } = require("../utils/validationFunctions");


/**
 * Configure the response to the user return a list of species
 * @param { Object } request 
 * @param { Number } [request.headers.limit] 
 * @param { Number } [request.headers.offset] 
 * @param { Object } res
 */
module.exports.getSpecies = async (request, res) => {
    request.headers.limit = request.headers.limit ? request.headers.limit : 10;
    request.headers.offset = request.headers.offset ? request.headers.offset : 0;
    if (isCorrectNumber(request.headers.limit) && isCorrectNumber(request.headers.offset)) {
        speciesController.getSpecies(request.headers, res);
    } else {
        console.error('Error in speciesMiddleware.js : limit and offset must be valid numbers');
        res.writeHead(400);
        res.write('Invalid Fields : limit and offset must be valid numbers');
        res.end("\n");
    }
}


/**
 * Configure the response to the user return the specie's data
 * @param { Object } request
 * @param { Array } request.parameters
 * @param { Object } res
 */
module.exports.getSpecie = async (request, res) => {
    const specieId = request.parameters[0];
    if (isCorrectNumber(specieId, 1)) {
        speciesController.getSpecie(specieId, res);
    } else {
        console.error('Error in speciesMiddleware.js : specieId must be a valid number');
        res.writeHead(400);
        res.write('Invalid Fields : specieId must be a valid number, positive and not null');
        res.end("\n");        
    }
}