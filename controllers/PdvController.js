const db = require("../models");
const path = require("path");
const checkCookies = require("./Auth.js");
const { where } = require("sequelize");

class PdvController {
  static async getPesquisa(req, res) {
    try {
      var query = req.query.q;
      const regex = /^[0-9]+$/;
      if (query.length < 6 && regex.test(query)) {
        var pesquisa = await db.PRODUTOS.findAll({
          where: {
            id: {
              [db.Sequelize.Op.like]: `%${query}%`,
            },
            ativo: 1,
          },
          limit: 5,
        });
      } else if (query.length > 6 && regex.test(query)) {
        var pesquisa = await db.PRODUTOS.findAll({
          where: {
            barras: {
              [db.Sequelize.Op.like]: `%${query}%`,
            },
            ativo: 1,
          },
          limit: 5,
        });
      } else {
        var pesquisa = await db.PRODUTOS.findAll({
          where: {
            descricao: {
              [db.Sequelize.Op.like]: `%${query}%`,
            },
            ativo: 1,
          },
          limit: 5,
        });
      }
      res.json(pesquisa);
    } catch (error) {
      const error_message = [];
      error_message.push({
        title: "Erro",
        message: error.message + " Retornando ao login",
      });
      res.render("../src/views/not_auth", { data: error_message });
    }
  }
}

module.exports = PdvController;
