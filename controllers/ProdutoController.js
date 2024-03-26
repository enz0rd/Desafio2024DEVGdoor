const db = require("../models");
const path = require("path");
const checkCookies = require('./Auth.js');

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
}

module.exports = ProdutoController;