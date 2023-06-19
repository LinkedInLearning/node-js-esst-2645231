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
  response.write("Willkommen auf unserer Pizzeria-Seite <br /><br />");

  response.write("Aktuelle Angebote: <br />-----<br />");

  pizzaOffers.forEach((pizza) => {
    response.write(`${pizza.name}, ${pizza.costs} EUR <br />`);
  });

  response.write(`
  <form style="margin-top: 20px; padding: 1em; border: 1px solid black">
    <input placeholder="Bestellung..." type="text" name="bestellung" />
    <input placeholder="Adresse..." type="text" name="adresse" />
    <button type="submit">Absenden</button>
  </form>
  `);

  response.end();
});

server.listen(3500);
