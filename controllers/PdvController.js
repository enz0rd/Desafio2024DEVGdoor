const db = require("../models");
const path = require("path");
const checkCookies = require("./Auth.js");
const { where } = require("sequelize");
const calcularData = require("../utils/Date.js");
const moment = require("moment");

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

  static async postRealizarVenda(req, res) {
    var check = await checkCookies(req, res);
    if(check) {
      try {
        var sessionId = req.cookies.sessionId;
        var userId = await db.USUARIOS.findOne({
          attributes: ['id'],
          where: { 
            nome: atob(sessionId), ativo: 1 
          },
        });
        
        // criar venda
        var ultimonumero = await db.VENDAS.max('NUMERO');

        var mov_venda = await db.VENDAS.create({
          NUMERO: ultimonumero + 1,
          DATA_EMISSAO: moment(),
          STATUS: 'Venda concluída',
          valor_tot: req.body.valores.total,
          id_operador: userId.dataValues.id,
          cancelada: 0,
        })

        // criar itens da venda
        for (var i = 0; i < req.body.produtos.length; i++) {
          var mov_itevenda = await db.ITEVENDAS.create({
            codigo_venda: mov_venda.dataValues.id,
            codigo_produto: req.body.produtos[i].codigo,
            valor_un: req.body.produtos[i].valor,
            qtd: req.body.produtos[i].quantidade,
            valor_tot: req.body.produtos[i].totalProduto,
          });
          // tirar qtd do estoque
          var produto = await db.PRODUTOS.findOne({
            where: { id: req.body.produtos[i].codigo }
          });
          await produto.set({
            qtd: produto.dataValues.qtd - req.body.produtos[i].quantidade
          });
          await produto.save();
        }
        // criar os pagamentos da venda
        if(req.body.pagamentos.dinheiro > 0) {
          var mov_pagamento_dinheiro = await db.PAGVENDAS.create({
            codigo_venda: mov_venda.dataValues.id,
            especie: "Dinheiro",
            valor: req.body.pagamentos.dinheiro,
          });
        }
        if(req.body.pagamentos.cartaodebito > 0) {
          var mov_pagamento_debito = await db.PAGVENDAS.create({
            codigo_venda: mov_venda.dataValues.id,
            especie: "Débito",
            valor: req.body.pagamentos.cartaodebito,
          });
        }
        if(req.body.pagamentos.cartaocredito > 0) {
          var mov_pagamento_credito = await db.PAGVENDAS.create({
            codigo_venda: mov_venda.dataValues.id,
            especie: "Crédito",
            valor: req.body.pagamentos.cartaocredito,
          });
        }
        if(req.body.pagamentos.pix > 0) {
          var mov_pagamento_pix = await db.PAGVENDAS.create({
            codigo_venda: mov_venda.dataValues.id,
            especie: "PIX",
            valor: req.body.pagamentos.pix,
          });
        }
        if(req.body.valores.troco > 0) {
          var mov_pagamento_troco = await db.PAGVENDAS.create({
            codigo_venda: mov_venda.dataValues.id,
            especie: "Troco",
            valor: req.body.valores.troco,
          });
        }
        res.json({codigo: 200, message: "Venda realizada com sucesso!"});
      } catch(err) {
        res.send({codigo: 400, message: `Ocorreu um erro: ${err.message}`});
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

  static async getVendas(req, res) {
    var check = await checkCookies(req, res);
    if(check) {
      try {
        var resp = await db.VENDAS.findAll(
          {
            attributes: ['NUMERO', 'DATA_EMISSAO', 'STATUS', 'valor_tot', 'id_operador', 'cancelada']
          }
        );
        const jsonString = JSON.stringify(resp);
        const jsonParse = JSON.parse(jsonString);

        for(let i=0; i < jsonParse.length; i++) {
          var nomeOperador = await db.USUARIOS.findOne({
            where: { id: jsonParse[i].id_operador },
          })
          jsonParse[i].nomeOperador = nomeOperador.dataValues.nome;
        }
        res.render("../src/views/vendas", {data: jsonParse});
      } catch(err) {
        res.send({codigo: 400, message: `Ocorreu um erro: ${err.message}`});
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

  static async cancelarVenda(req, res) {
    var check = await checkCookies(req, res);
    if(check) {
      try {
        // DEFINE VENDA COMO CANCELADA
        var id = req.params.id;
        var venda = await db.VENDAS.findOne({
          where: { id: id }
        });
        
        if(venda.dataValues.cancelada == 1) {
          res.status(400).json({message: "Venda já cancelada!"});
          return;
        }

        await venda.set({
          STATUS: "Venda cancelada",
          cancelada: 1
        });
        await venda.save();

        // DEVOLVE QTD AO ESTOQUE
        var itens = await db.ITEVENDAS.findAll({
          where: { codigo_venda: id }
        });
        for(let i=0; i < itens.length; i++) {
          var produto = await db.PRODUTOS.findOne({
            where: { id: itens[i].codigo_produto }
          });
          await produto.set({
            qtd: produto.dataValues.qtd + itens[i].qtd
          });
          await produto.save();
        }

        res.status(200).json({message: "Venda cancelada com sucesso!"});
      } catch(err) {
        res.status(400).json({message: `Ocorreu um erro: ${err.message}`});
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

  static async listSelectedVenda(req, res) {
    var check = await checkCookies(req, res);
    if(check) {
      try {
        var id = req.params.id;
        var venda = await db.VENDAS.findOne({
          where: { id: id }
        });
        var itens = await db.ITEVENDAS.findAll({
          where: { codigo_venda: id },
          include: [{
            model: db.PRODUTOS, // Supondo que o modelo de produtos seja "produtos"
            as: 'produto', // Usando o alias 'produto' especificado na associação
            attributes: ['descricao'], // Selecionando apenas o campo "descricao"
            required: true // Se a relação é obrigatória, use true, caso contrário, use false
          }]
        });
        
        var pagamentos = await db.PAGVENDAS.findAll({
          where: { codigo_venda: id }
        });
        var nomeOperador = await db.USUARIOS.findOne({
          where: { id: venda.dataValues.id_operador }
        });
        var data = {
          venda: venda.dataValues,
          itens: itens,
          pagamentos: pagamentos,
          nomeOperador: nomeOperador.dataValues.nome
        }
        const jsonString = JSON.stringify(data);
        const jsonParse = JSON.parse(jsonString);
        console.log(jsonParse)
        res.render('../src/views/visualizar_venda', {data: data});
      } catch(err) {
        res.status(400).json({message: `Ocorreu um erro: ${err.message}`});
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

module.exports = PdvController;
