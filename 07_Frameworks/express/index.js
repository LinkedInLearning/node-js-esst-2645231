import express from "express";
const server = express();

server.set("view engine", "pug");
server.set("views", "./views");

server.get("/pizza", (request, response) => {
  response.render("pizza", {
    title: "Pizza",
    message: "Tolle Pizzas!",
  });
});

server.get("/hallo/:name", (request, response) => {
  response.send(`Hallo ${request.params.name}!`);
});

server.listen(3500);
