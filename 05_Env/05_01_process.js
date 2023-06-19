import http from "http";
const serverPort = 3500;

const server = http.createServer((request, response) => {
  response.write("Hi, ich laufe auf Port " + serverPort);
  response.end();

  setTimeout(() => {
    throw new Error("Ganz schlimmer Fehler");
  }, 1000);
});
server.listen(3500);

process.on("uncaughtException", (error) => {
  console.log("Schlimm!", error);
  process.exit();
});

console.log(process.cwd());
console.log(process.version);
