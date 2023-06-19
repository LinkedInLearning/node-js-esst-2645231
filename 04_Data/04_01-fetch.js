import http from "node:http";

const graz = {
  lat: 47.076668,
  long: 15.421371,
};

const weatherServer = http.createServer((request, response) => {
  let weatherString = "Ich habe keine Wetter-Infos";
  const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${graz.lat}&longitude=${graz.long}&current_weather=true`;

  fetch(weatherApiUrl)
    .then((r) => {
      return r.json();
    })
    .then((weatherObj) => {
      console.log(weatherObj.current_weather.temperature);
      weatherString =
        "Temperatur in Graz: " + weatherObj.current_weather.temperature;

      response.write(weatherString);
      response.end();
    });
});

weatherServer.listen(4000);
