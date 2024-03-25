const db = require("../models");
const path = require("path");
const checkCookies = require("./Auth.js");
const { where } = require("sequelize");

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

      const sessionId = req.cookies.sessionId;
      if(jsonParse.nome == atob(sessionId)) {
        jsonParse['currentUser'] = true;
      } else {
        jsonParse['currentUser'] = false;
      }
      console.log(jsonParse)
      res.render("../src/views/cad_usuario", { data: jsonParse });
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

  static async getCadastrarUser(req, res) {
    var check = await checkCookies(req, res);
    if (check) {
      res.sendFile(
        path.join(__dirname, "../src/views", "cadastro_usuario.html")
      );
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

  static async postEditarUser(req, res) {
    var check = await checkCookies(req, res);
    if (check) {
      try {
        const resp = await db.USUARIOS.findOne({
          where: {
            nome: req.body.nome,
          },
        });
        await resp.set({
          nome: req.body.nome,
          password: req.body.password,
          ativo: req.body.ativo,
          updatedAt: req.body.updated,
        });
        await resp.save();
        res.redirect("/usuarios");
      } catch (err) {
        res.send({ codigo: 400, message: `Ocorreu um erro: ${err.message}` });
      }
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

  static async deleteExcluirUser(req, res) {
    var check = await checkCookies(req, res);
    if (check) {
      try {
        const resp = await db.USUARIOS.findOne({
          where: {
            nome: req.body.nome,
          },
        });
        const vendas = await db.VENDAS.findAll({
          where: {
            id_operador: req.body.id,
          },
        });

        if (vendas) {
          await resp.set({
            ativo: false,
          });
          await resp.save();
          res.redirect("/usuarios");
        } else {
          await resp.destroy();
          res.redirect("/usuarios");
        }
      } catch (err) {
        res.send({ codigo: 400, message: `Ocorreu um erro: ${err.message}` });
      }
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

  static async postCadastrarUser(req, res) {
    var check = await checkCookies(req, res);
    if (check) {
      try {
        const resp = await db.USUARIOS.findOne({
          where: {
            nome: req.body.nome,
          },
        });
        if (resp) {
          res.send({ codigo: 400, message: "Esse usuário já foi cadastrado!" });
        } else {
          const add = await db.USUARIOS.create({
            nome: req.body.nome,
            password: req.body.password,
            createdAt: new Date(),
          });
          res.redirect("/usuarios");
        }
      } catch (err) {
        res.send({ codigo: 400, message: `Ocorreu um erro: ${err.message}` });
      }
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

  static async getLogout(req, res) {
    res.clearCookie("sessionId");
    res.clearCookie("expirationTime");
    var error = [
      {
        title: "Deslogando...",
        message: "Retornando ao login",
      },
    ];
    res.render("../src/views/not_auth", { data: error });
  }
}

module.exports = UsuarioController;
