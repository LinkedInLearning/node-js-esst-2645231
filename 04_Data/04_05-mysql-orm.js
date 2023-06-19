import http from "node:http";
import querystring from "node:querystring";
import fs from "node:fs";
import pug from "pug";
import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("pizzeria", "root", "", {
  host: "localhost",
  dialect: "mariadb",
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const Bestellung = sequelize.define("Bestellung", {
  adresse: DataTypes.STRING,
  datum: DataTypes.STRING,
  bestellung: DataTypes.STRING,
});

await sequelize.sync();

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
    Bestellung.findAll().then((existierendeBestellungen) => {
      response.write(
        bestellungenPugFn({
          orders: existierendeBestellungen,
        })
      );
      response.end();
    });
  } else if (request.url === "/bestellung") {
    // Bestellseite
    let formData = "";

    request.on("data", function (data) {
      formData += data;
    });

    request.on("end", function () {
      const bestellung = querystring.decode(formData);
      response.write("<h1>Bestellseite</h1>");

      Bestellung.create({
        adresse: bestellung.adresse,
        bestellung: bestellung.bestellung,
        datum: new Date().toLocaleDateString(),
      }).then(() => {
        response.write(`Danke für die Bestellung (${bestellung.bestellung})`);
        response.end();
      });
    });
  } else {
    response.statusCode = 404;
    response.write("Diese Seite existiert nicht");
    response.end();
  }
});

server.listen(3500);
