import http from "http";
import { config } from "dotenv";
config();

const serverPort = process.env.MYPORT;
const name = process.env.MYNAME;

const server = http.createServer((request, response) => {
  response.write(`Hi ${name}, ich laufe auf Port ` + serverPort);
  response.end();
});
server.listen(serverPort);
