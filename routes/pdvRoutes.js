const Router = require("express");
const cookieParser = require("cookie-parser");
const PdvController = require("../controllers/PdvController");
const router = Router();

router.use(cookieParser());

router.get("/pdv/pesquisar", PdvController.getPesquisa);

module.exports = router;
