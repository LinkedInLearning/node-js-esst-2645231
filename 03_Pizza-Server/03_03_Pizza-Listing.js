import http from "node:http";

const pizzaOffers = [
  {
    name: "Ananas Dave",
    costs: 12,
  },
  {
    name: "Orang Utan",
    costs: 9,
  },
];

const server = http.createServer(function (request, response) {
  response.write("Willkommen auf unserer Pizzeria-Seite \n\n");

  response.write("Aktuelle Angebote: \n-----\n");

  pizzaOffers.forEach((pizza) => {
    response.write(`${pizza.name}, ${pizza.costs} EUR \n`);
  });

  response.end();
});

server.listen(3500);
