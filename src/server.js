const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const initalizeSocket = require("./sockets");
const path = require("path");
const { Server } = require("http");

const initalizeServer = () => {
  const app = express();
  const server = Server(app);
  const staticPath = path.join(__dirname, "../public");
  app.use(express.static(staticPath, { extensions: ["html"] }));
  app.use(express.json());
  app.use(compression());
  app.use(cors());
  app.use(helmet());
  app.use(morgan("combined"));

  initalizeSocket(server);

  return server;
};

module.exports = initalizeServer;
