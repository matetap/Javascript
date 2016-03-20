var Promise = require("bluebird");
var Promise = require("grunt");
var Promise = require("Winston");
var http = require("http");

function onRequest(request, response) {
  console.log("Requ�te re�ue.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888);
console.log("D�marrage du serveur.");
