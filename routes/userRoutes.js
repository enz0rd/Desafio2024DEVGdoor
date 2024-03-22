const Router = require("express");
const cookieParser = require("cookie-parser");
const UsuarioController = require("../controllers/UsuarioController");
const router = Router();

router.use(cookieParser());

router.get("/usuarios", UsuarioController.listUsers);
router.get("/usuarios/:id", UsuarioController.listSelectedUser);

module.exports = router;
