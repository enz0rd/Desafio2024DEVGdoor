const Router = require("express");
const cookieParser = require("cookie-parser");
const UsuarioController = require("../controllers/UsuarioController");
const router = Router();

router.use(cookieParser());

router.get("/usuarios", UsuarioController.listUsers);
router.get("/usuario/:id", UsuarioController.listSelectedUser);
router.get("/usuarios/cadastrar", UsuarioController.getCadastrarUser);
router.post("/usuarios/editar", UsuarioController.postEditarUser);
router.post("/usuarios/cadastrar", UsuarioController.postCadastrarUser);
router.delete("/usuario/excluir", UsuarioController.deleteExcluirUser);
router.get('/logout', UsuarioController.getLogout);

module.exports = router;
