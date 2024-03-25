const db = require("../models");
const path = require("path");
const checkCookies = require("./Auth.js");

class HomeController {
  static async getLanding(req, res) {
    try {
      res.sendFile(path.join(__dirname, "../src/views", "login.html"));
    } catch (error) {
      const error_message = [];
      error_message.push({
        title: "Error",
        message: error.message + " Returning to login",
      });
      res.render("../src/views/not_auth", { data: error_message });
    }
  }

  static async tryLogin(req, res) {
    try {
      const resp = await db.USUARIOS.findOne({
        where: {
          nome: req.body.user,
          password: req.body.password,
          ativo: 1
        },
      });
      if (resp != null) {
        try {
          const sessionId = btoa(req.body.user);
          const maxAge = 3600000; // 1 hour in milliseconds
          const expirationTime = Date.now() + maxAge;
          res.cookie("sessionId", sessionId, { value: true, maxAge: 3600000 });
          res.cookie("expirationTime", expirationTime, { maxAge });
          console.log(`Redirecting`);
          res.redirect("/home");
        } catch (error) {
          console.log(`Erro ao listar: ${error.message}`);
          const error_message = [];
          error_message.push({
            title: "Error",
            message: error.message,
          });
          res.render("../src/views/not_auth", { data: error_message });
        }
      } else {
        res.send({ message: "As credenciais estão inválidas ou o usuário foi inativado" });
      }
    } catch (error) {
      console.log(`Erro ao listar: ${error.message}`);
      const error_message = [];
      error_message.push({
        title: "Error",
        message: error.message,
      });
      res.render("../src/views/not_auth", { data: error_message });
    }
  }

  static async getHome(req, res) {
    var check = await checkCookies(req, res);
    if (check === true) {
      res.sendFile(path.join(__dirname, "../src/views", "home.html"));
    } else {
      var error = [
        {
          title: "Não autorizado",
          message: "Retornando ao login",
        },
      ];
      res.render("../src/views/not_auth", { data: error });
    }
  }

  static async getPDV(req, res) {
    var check = await checkCookies(req, res);
    if (check === true) {
      res.sendFile(path.join(__dirname, "../src/views", "PDV.html"));
    } else {
      var error = [
        {
          title: "Não autorizado",
          message: "Retornando ao login",
        },
      ];
      res.render("../src/views/not_auth", { data: error });
    }
  }
}

module.exports = HomeController;
