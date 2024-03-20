const Router = require("express");
const cookieParser = require("cookie-parser");
const HomeController = require("../controllers/HomeController");
const router = Router();

router.use(cookieParser());

router.get("/", HomeController.getLanding);
router.post("/entrar", HomeController.tryLogin);
router.get("/pdv", HomeController.getPDV);

module.exports = router;
