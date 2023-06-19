import http from "node:http";
import querystring from "node:querystring";
import fs from "node:fs";
import pug from "pug";

const pizzaOffers = [
  {
    name: "Pizza Surprise",
    costs: 11,
  },
  {
    name: "Big American Partypizza",
    costs: 40,
  },
];

const bestellseitePugFn = pug.compileFile("./pug-templates/Bestellseite.pug");
const bestellungenPugFn = pug.compileFile("./pug-templates/Bestellungen.pug");

const server = http.createServer(function (request, response) {
  response.setHeader("Content-Type", "text/html; charset=utf-8");

  if (request.url === "/") {
    response.write(
      bestellseitePugFn({
        pizzaOffers,
      })
    );
    response.end();
  } else if (request.url === "/bestellungen") {
    let existierendeBestellungen = [];
    if (fs.existsSync("./bestellungen.json")) {
      // existierendeBestellungen
      const jsonInhalt = fs.readFileSync("./bestellungen.json").toString();
      existierendeBestellungen = JSON.parse(jsonInhalt);
    }

    response.write(
      bestellungenPugFn({
        orders: existierendeBestellungen,
      })
    );
    response.end();
  } else if (request.url === "/bestellung") {
    // Bestellseite
    let formData = "";

    request.on("data", function (data) {
      formData += data;
    });

    request.on("end", function () {
      const bestellung = querystring.decode(formData);
      response.write("<h1>Bestellseite</h1>");

      const pizza = bestellung.bestellung;
      const adresse = bestellung.adresse;
      const datum = new Date().toLocaleDateString();

      let existierendeBestellungen = [];
      if (fs.existsSync("./bestellungen.json")) {
        // existierendeBestellungen
        const jsonInhalt = fs.readFileSync("./bestellungen.json").toString();
        existierendeBestellungen = JSON.parse(jsonInhalt);
      }

      const jsonString = JSON.stringify([
        ...existierendeBestellungen,
        {
          bestellung: pizza,
          adresse,
          datum,
        },
      ]);

      fs.writeFileSync("./bestellungen.json", jsonString);

      response.write(`Danke für die Bestellung (${bestellung.bestellung})`);
      response.end();
    });
  } else {
    response.statusCode = 404;
    response.write("Diese Seite existiert nicht");
    response.end();
  }
});

server.listen(3500);
