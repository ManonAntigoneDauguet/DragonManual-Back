const speciesMiddleware = require("../middlewares/speciesMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");


const handlers = {
    "species": (data, res) => {
        if (data.method === "get") {
            speciesMiddleware.getSpecies(data, res);
        } else {
            res.writeHead(400);
            res.write("bad request");
            res.end("\n");
        }
    },
    "species/:specieId": (data, res) => {
        if (data.method === "get") {
            speciesMiddleware.getSpecie(data, res);
        } else {
            res.writeHead(400);
            res.write("bad request");
            res.end("\n");
        }
    },
    "users": (data, res) => {
        if (data.method === "get") {
            userMiddleware.getUsers(data, res)
        } else if (data.method === "post") {
            userMiddleware.createUser(data, res)
        } else {
            res.writeHead(400);
            res.write("bad request");
            res.end("\n");
        }
    },
    "users/user/login": (data, res) => {
        if (data.method === "post") {
            userMiddleware.loginUser(data, res)
        } else {
            res.writeHead(400);
            res.write("bad request");
            res.end("\n");
        }
    },
    "users/user/profile": (data, res) => {
        if (data.method === "post") {
            userMiddleware.getUserProfile(data, res)
        } else {
            res.writeHead(400);
            res.write("bad request");
            res.end("\n");
        }
    },
    "notFound": (data, res) => {
        res.writeHead(404);
        res.write("Unrecognized endpoint");
        res.end("\n");
    }
}

const routes = [
    {
        endpoint: /^api\/v1\/species\/(.+)$/,
        handler: handlers["species/:specieId"]
    },
    {
        endpoint: /^api\/v1\/species$/,
        handler: handlers["species"]
    },
    {
        endpoint: /^api\/v1\/users$/,
        handler: handlers["users"]
    },
    {
        endpoint: /^api\/v1\/users\/user\/login$/,
        handler: handlers["users/user/login"]
    },
    {
        endpoint: /^api\/v1\/users\/user\/profile$/,
        handler: handlers["users/user/profile"]
    },
];

module.exports.findRoute = (path) => {
    for (let route of routes) {
        let match = path.match(route.endpoint);
        if (match) {
            let parameters = match.slice(1);
            return { handler: route.handler, parameters: parameters };
        }
    }
    return { handler: handlers["notFound"], parameters: [] };
}