import http from "node:http";
import querystring from "node:querystring";

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
  response.setHeader("Content-Type", "text/html; charset=utf-8");

  if (request.url === "/bestellung") {
    // Bestellseite

    let formData = "";

    request.on("data", function (data) {
      formData += data;
    });

    request.on("end", function () {
      const bestellung = querystring.decode(formData);
      response.write("<h1>Bestellseite</h1>");
      response.write(`Danke für die Bestellung (${bestellung.bestellung})`);
      response.end();
    });
  } else {
    // Keine Bestellseite
    response.write("<h1>Willkommen auf unserer Pizzeria-Seite</h1>");

    response.write("Aktuelle Angebote: <br />-----<br />");

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

    response.end();
  }
});

server.listen(3500);
