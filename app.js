const express = require("express");
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");

const app = express();

routes(app);

app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.listen(port, () => {
  console.log(`Server rodando em:
    http://localhost:${port}/`);
  app.use(express.static(__dirname));
  app.use(favicon(__dirname + '/src/assets/favicon.ico'))
  app.use(function (req, res, next) {
    res.status(404);

    if (req.accepts("html")) {
      var error = [
        {
          title: "404 not found",
          message: "Essa página não existe, retornando ao login",
        },
      ];
      res.render("../src/views/not_auth", { data: error });
    }
  });
  app.use(cookieParser("c2VjcmV0ZW1haWxrZXl0b2Vuc3VyZXNlY3VyaXR5"));
});

module.exports = app;
