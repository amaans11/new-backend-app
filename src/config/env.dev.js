const dotenv = require("dotenv");
const mariadb = require('mariadb');

dotenv.config();

const audience = process.env.AUTH0_AUDIENCE;
const domain = process.env.AUTH0_DOMAIN;
const serverPort = process.env.SERVER_PORT;
const clientOriginUrl = process.env.CLIENT_ORIGIN_URL;
const mysqlPassword = process.env.MYSQL_PASSWORD;
const mysqlUser = process.env.MYSQL_USER;
const mysqlUri = process.env.MYSQL_URI;

if (!audience) {
  throw new Error(
    ".env is missing the definition of an AUTH0_AUDIENCE environmental variable",
  );
}

if (!domain) {
  throw new Error(
    ".env is missing the definition of an AUTH0_DOMAIN environmental variable",
  );
}

if (!serverPort) {
  throw new Error(
    ".env is missing the definition of a API_PORT environmental variable",
  );
}

if (!clientOriginUrl) {
  throw new Error(
    ".env is missing the definition of a APP_ORIGIN environmental variable",
  );
}

const clientOrigins = [clientOriginUrl, 'https://myapp.example:3006'];

const mysqlPool = mariadb.createPool({
  host: mysqlUri, 
  user: mysqlUser, 
  password: mysqlPassword,
  connectionLimit: 5
});


module.exports = {
  audience,
  domain,
  serverPort,
  clientOriginUrl,
  clientOrigins,
  mysqlPool
};
