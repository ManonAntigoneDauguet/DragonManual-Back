const userController = require("../controllers/userController");
const { isCorrectNumber, checkFieldValid } = require("../utils/validationFunctions");

const fields = [
    {
        "key": "email",
        "regexp": /^[\w\.\-]+@([\w-]+\.)+[\w-]{2,4}$/,
        "errorMessage": "must to be a correct email"
    },
    {
        "key": "password",
        "regexp": /^.{5,}$/,
        "errorMessage": "the password to have 5 characters at least"
    },
    {
        "key": "firstName",
        "regexp": /^[^{}[\]\|.;:!?<>]*$/,
        "errorMessage": "firstName"
    },
    {
        "key": "lastName",
        "regexp": /^[^{}[\]\|.;:!?<>]*$/,
        "errorMessage": "lastName"
    }
]

/**
 * Configure the response to the user to return a list of users
 * @param { Object } request 
 * @param { Number } [request.headers.limit] 
 * @param { Number } [request.headers.offset]
 * @param { Object } res
 */
module.exports.getUsers = async (request, res) => {
    request.headers.limit = request.headers.limit ? request.headers.limit : 10;
    request.headers.offset = request.headers.offset ? request.headers.offset : 0;
    if (isCorrectNumber(request.headers.limit) && isCorrectNumber(request.headers.offset)) {
        userController.getUsers(request.headers, res);
    } else {
        console.error('Error in speciesMiddleware.js : limit and offset must be valid numbers');
        res.writeHead(400);
        res.write('Invalid Fields : limit and offset must be valid numbers');
        res.end("\n");
    }
}


/**
 * Create a new user after controls and security features
 * @param { Object } request 
 * @param { String } request.body.email
 * @param { String } request.body.password
 * @param { String } [request.body.firstName]
 * @param { String } [request.body.lastName]
 */
module.exports.createUser = async (request, res) => {
    try {
        request.body.firstName = request.body.firstName ? request.body.firstName : "to define";
        request.body.lastName = request.body.lastName ? request.body.lastName : "to define";
        for (let field of fields) {
            checkFieldValid(field.errorMessage, request.body[field.key], field.regexp);
        }
        userController.createUser(request.body, res);
    } catch (error) {
        console.error('Error when the post of data', error);
        res.writeHead(400);
        res.write(error.message);
        res.end("\n");
    }
}


/**
 * Return a authentication token if email and password are valid
 * @param { Object } request 
 * @param { String } request.body.email
 * @param { String } request.body.password
 * @param { Object } res
 */
module.exports.loginUser = async (request, res) => {
    const fields = [
        {
            "key": "email",
            "regexp": /^[\w\.\-]+@([\w-]+\.)+[\w-]{2,4}$/,
            "errorMessage": "must to be a correct email"
        },
        {
            "key": "password",
            "regexp": /^.{5,}$/,
            "errorMessage": "the password to have 5 characters at least"
        }
    ]
    try {
        checkFieldValid(fields[0].errorMessage, request.body[fields[0].key], fields[0].regexp);
        checkFieldValid(fields[1].errorMessage, request.body[fields[1].key], fields[1].regexp);
        userController.loginUser(request.body, res);
    } catch (error) {
        console.error('Error when the post of data', error);
        res.writeHead(400);
        res.write(error.message);
        res.end("\n");
    }
}


/**
 * Configure the response to the user to return the user'inforamtions
 * @param { Object } request 
 * @param { Number } [request.headers.authorization] 
 * @param { Object } res
 */
module.exports.getUserProfile = async (request, res) => {
    try {
        checkFieldValid('Access token is missing or invalid', request.headers.authorization, /^Bearer (\d+)$/);
        request.headers.token = request.headers.authorization.substring(7);
        userController.getUserProfile(request.headers, res);
    } catch (error) {
        console.error('Error in speciesMiddleware.js : access token is missing or invalid');
        res.writeHead(401);
        res.write('Access token is missing or invalid');
        res.end("\n");
    }
}