const Router = require("express");
const cookieParser = require("cookie-parser");
const PdvController = require("../controllers/PdvController");
const router = Router();

router.use(cookieParser());

router.get("/pdv/pesquisar", PdvController.getPesquisa);
router.post("/pdv/realizar-venda", PdvController.postRealizarVenda);
router.get("/vendas", PdvController.getVendas);
router.post("/venda/cancelar/:id", PdvController.cancelarVenda);
router.get("/venda/:id", PdvController.listSelectedVenda);

module.exports = router;
