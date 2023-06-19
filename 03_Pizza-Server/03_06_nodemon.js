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
  response.setHeader("Content-Type", "text/html");

  if (request.url === "/bestellung") {
    // Bestellseite
    response.write("<h1>Bestellseite</h1>");
  } else {
    // Keine Bestellseite
    response.write("<h1>Willkommen auf unserer Pizzeria-Seite</h1>");

    response.write("Angebote: <br />-----<br />");

    pizzaOffers.forEach((pizza) => {
      response.write(`${pizza.name}, ${pizza.costs} EUR <br />`);
    });

    response.write(`
  <form action="/bestellung" method="post" style="margin-top: 20px; padding: 1em; border: 1px solid black">
    <input placeholder="Bestellung..." type="text" name="bestellung" />
    <input placeholder="Adresse..." type="text" name="adresse" />
    <button type="submit">Absenden</button>
  </form>
  `);
  }
  response.end();
});

server.listen(3500);
