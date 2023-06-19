import http from "node:http";

const server = http.createServer(function (request, response) {
  response.write("Willkommen auf unserer Pizzeria-Seite");
  response.end();
});

server.listen(3500);
