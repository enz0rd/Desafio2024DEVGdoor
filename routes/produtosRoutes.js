const Router = require("express");
const cookieParser = require("cookie-parser");
const ProdutoController = require("../controllers/ProdutoController");
const router = Router();

router.use(cookieParser());

router.get("/produtos", ProdutoController.listProdutos);
router.get("/produtos/cadastrar", ProdutoController.getCreateProduto);
router.post("/produtos/cadastrar", ProdutoController.postCreateProduto);

module.exports = router;