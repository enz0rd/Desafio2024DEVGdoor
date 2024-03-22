const bodyParser = require("body-parser");
const home = require("./homeRoutes.js");
// const produtos = require("./produtosRoutes.js");
// const vendas = require("./vendasRoutes.js");
const usuarios = require("./userRoutes.js");

const cookieParser = require("cookie-parser");
const sessions = require("express-session");

// , produtos, vendas, usuarios

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(home, usuarios);
  app.use(cookieParser());
  app.set("view engine", "ejs");
};
