const dotenv = require("dotenv-safe");

dotenv.config();

module.exports = {
  isDev: process.env.NODE_ENV === "development",
  port: process.env.PORT,
};
