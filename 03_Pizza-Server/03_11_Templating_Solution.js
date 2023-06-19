import http from "node:http";
import querystring from "node:querystring";
import fs from "node:fs";
import pug from "pug";

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
  } else if (request.url === "/") {
    // Startseite
    const compiledFunction = pug.compileFile("./Startseite.pug");

    response.write(
      compiledFunction({
        pizzaOffers,
      })
    );
    // const datei = fs.readFileSync("./Startseite.html").toString();

    // let pizzaString = "";
    // pizzaOffers.forEach((pizza) => {
    //   pizzaString += `${pizza.name}, ${pizza.costs} EUR <br />`;
    // });

    // response.write(datei.replace("PIZZA AUFLISTUNG HIER", pizzaString));

    response.end();
  } else {
    response.statusCode = 404;
    response.write("Diese Seite existiert nicht");
    response.end();
  }
});

server.listen(3500);
