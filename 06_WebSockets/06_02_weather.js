import http from "node:http";
import pug from "pug";
import { WebSocketServer } from "ws";

const graz = {
  lat: 47.076668,
  long: 15.421371,
};
const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${graz.lat}&longitude=${graz.long}&current_weather=true`;

const dateString = () => {
  const date = new Date();
  const hours = `${date.getHours()}`.padStart(2, "0");
  const mins = `${date.getMinutes()}`.padStart(2, "0");
  const secs = `${date.getSeconds()}`.padStart(2, "0");

  return `${hours}:${mins}:${secs}`;
};

const wetterInGraz = () => {
  return fetch(weatherApiUrl)
    .then((r) => {
      return r.json();
    })
    .then((weatherObj) => {
      const time = dateString();
      return (
        `Temperatur in Graz (${time}): ` +
        weatherObj.current_weather.temperature +
        " Grad"
      );
    });
};

const weatherTemplateFn = pug.compileFile("./weather.pug");

// ---------- SERVER ----------------------
// ----------------------------------------

const wss = new WebSocketServer({
  port: 3600,
});

wss.on("connection", (socket) => {
  setInterval(() => {
    wetterInGraz().then((weatherText) => {
      socket.send(weatherText);
    });
  }, 5000);
});

const weatherServer = http.createServer((request, response) => {
  response.setHeader("Content-Type", "text/html; charset=utf-8");

  wetterInGraz().then((weatherText) => {
    response.write(
      weatherTemplateFn({
        weatherText,
      })
    );

    response.end();
  });
});

weatherServer.listen(3500);
