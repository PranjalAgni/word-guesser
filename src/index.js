const config = require("./config/");
const initalizeServer = require("./server");
const logger = require("./logger");

const startServer = () => {
  const server = initalizeServer();

  server.listen(config.port, () => {
    logger.info(`Server running on http://localhost:${config.port}`);
  });
};

startServer();
