const db = require("../models");
const path = require("path");
const checkCookies = require("./Auth.js");

class ProdutoController {
  static async listProdutos(req, res) {
    var check = await checkCookies(req, res);
    if (check) {
      var fetch = await db.PRODUTOS.findAll();
      const jsonString = JSON.stringify(fetch);
      const jsonParse = JSON.parse(jsonString);
      res.render("../src/views/produtos", { data: jsonParse });
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

  static async getCreateProduto(req, res) {
    var check = await checkCookies(req, res);
    if (check) {
      res.sendFile(path.join(__dirname, "../src/views/cadastro_produto.html"));
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

  static async listSelectedProduto(req, res) {
    var check = await checkCookies(req, res);
    if (check) {
      var fetch = await db.PRODUTOS.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (fetch == null) {
        var error = [
          {
            title: "Erro ao listar produto",
            message: "Produto não disponível, tente listar um que esteja cadastrado!",
          },
        ];
        res.render("../src/views/errorpage", { data: error });
        return;
      }
      const jsonString = JSON.stringify(fetch);
      const jsonParse = JSON.parse(jsonString);
      res.render("../src/views/cad_produto", { data: jsonParse });
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

  static async postCreateProduto(req, res) {
    var check = await checkCookies(req, res);
    if (check) {
      try {
        var resp = await db.PRODUTOS.create({
          barras: req.body.barras || null,
          descricao: req.body.descricao,
          qtd: req.body.qtd,
          valor_custo: req.body.valor_custo,
          valor_venda: req.body.valor_venda,
          observacoes: req.body.observacoes || null,
        });
        res.redirect("/produtos");
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

  static async postEditarProduto(req, res) {
    var check = await checkCookies(req, res);
    if (check) {
      try {
        const resp = await db.PRODUTOS.findOne({
          where: {
            id: req.body.id,
          },
        });
        await resp.set({
          barras: req.body.barras || null,
          descricao: req.body.descricao,
          qtd: req.body.qtd,
          valor_custo: req.body.valor_custo,
          valor_venda: req.body.valor_venda,
          observacoes: req.body.observacoes || null,
          ativo: req.body.ativo,
          updatedAt: new Date(),
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

  static async deleteExcluirProduto(req, res) {
    var check = await checkCookies(req, res);
    if (check) {
      try {
        const resp = await db.PRODUTOS.findOne({
          where: {
            id: req.body.id,
          },
        });
        const itevendas = await db.ITEVENDAS.findAll({
          where: {
            codigo_produto: req.body.id,
          },
        });

        if (itevendas.length == 0) {
          await resp.destroy();
        } else {
          await resp.set({
            ativo: false,
          });
          await resp.save();
        }
        res.status(200).json({ message: `Produto excluído com sucesso.` });
      } catch (err) {
        res.status(400).json({ message: `Ocorreu um erro: ${err.message}` });
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
}

module.exports = ProdutoController;
