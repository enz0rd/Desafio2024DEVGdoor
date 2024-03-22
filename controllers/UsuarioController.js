const db = require("../models");
const path = require("path");
const checkCookies = require("./Auth.js");

class UsuarioController {
  static async listUsers(req, res) {
    var check = await checkCookies(req, res);
    if (check) {
      var fetch = await db.USUARIOS.findAll();
      const jsonString = JSON.stringify(fetch);
      const jsonParse = JSON.parse(jsonString);
      if (jsonParse.length == 0) {
        jsonParse.push({
          id: null,
          nome: "Nenhum usuário cadastrado",
        });
      }
      res.render("../src/views/usuarios", { data: jsonParse });
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

  static async listSelectedUser(req, res) {
    var check = await checkCookies(req, res);
    if (check) {
      console.log(req.params);
      var fetch = await db.USUARIOS.findOne({
        where: {
          id: req.params.id,
        },
      });
      const jsonString = JSON.stringify(fetch);
      const jsonParse = JSON.parse(jsonString);
      if (jsonParse.length == 0 || jsonParse == null) {
        var error = [
          {
            title: "Erro",
            message: "Usuário não disponível, retornando ao login",
          },
        ];
        res.render("../src/views/not_auth", { data: error });
      }
      res.render("../src/views/usuarios", { data: jsonParse });
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

module.exports = UsuarioController;
