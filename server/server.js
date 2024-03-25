const http = require("http");
const url = require("url");
const { createConnection } = require('./database/connection');
const { findRoute } = require("./routes/route");
const { StringDecoder } = require("string_decoder");


createConnection();

const server = http.createServer(function (req, res) {
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname;
  // standarize the requested url by removing any '/' at the start or end
  path = path.replace(/^\/+|\/+$/g, "");
  console.log(path);

  let decoder = new StringDecoder('utf-8');
  let buffer = "";

  req.on("data", (chunk) => {
    console.log("got some data");
    buffer += decoder.write(chunk);
    console.log(buffer)
  });

  req.on("end", () => {
    console.log("send a response");
    buffer += decoder.end();
    buffer = buffer === "" ? buffer : JSON.parse(buffer)
    let route = findRoute(path);
    console.log(route);
    let data = {
      path: path,
      queryString: parsedURL.query,
      headers: req.headers,
      method: req.method.toLowerCase(),
      parameters: route.parameters,
      body: buffer
    };
    route.handler(data, res);
  });
});

server.listen(3001, function () {
  console.log("Server listening on http://localhost:3001");
})



