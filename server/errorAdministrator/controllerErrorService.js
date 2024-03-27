const { ValidationError } = require('./validationErrorClasse');


/**
 * Manage the errors in the controllers functions
 * And configure the response to the user
 * @param { Object } res 
 * @param { Object } error 
 * @param { String } fileName as the file of the controller function
 */
module.exports.controllerErrorService = (res, error, fileName = "file") => {
    console.error(`Error in ${fileName}`, error);
    if (error instanceof ValidationError) {
        res.writeHead(error.code);
        res.write(error.message);
        res.end("\n");
    } else {
        res.writeHead(500);
        res.write('Internal server error');
        res.end("\n");
    }
}