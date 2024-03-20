const db = require("../models");
const sequelize = require("sequelize");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const { resourceLimits } = require("worker_threads");
const { json } = require("express");
const moment = require("moment");
const path = require("path");

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
          res.redirect("/pdv");
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
        res.send({ message: "Credenciais inválidas" });
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

async function checkCookies(req, res) {
  try {
    const sessionId = req.cookies.sessionId;
    const maxAge = req.cookies.expirationTime;
    if (sessionId == null || maxAge == null) {
      console.log(`Não autorizado`);
      return false;
    } else {
      var result = await db.USUARIOS.findOne({
        where: { nome: atob(sessionId) },
      });
      try {
        if (result) {
          if (maxAge < Date.now()) {
            console.log(`Não autorizado`);
            return false;
          } else {
            console.log(`${sessionId} Autorizado`);
            return true;
          }
        } else {
          console.log(`Não autorizado`);
          return false;
        }
      } catch (error) {
        console.log(`Erro ao listar: ${error.message}`);
        return false;
      }
    }
  } catch (error) {
    console.log(`Erro ao listar: ${error.message}`);
    return false;
  }
}

module.exports = HomeController;
