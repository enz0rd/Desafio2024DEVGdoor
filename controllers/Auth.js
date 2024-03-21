const db = require("../models");

async function checkCookies(req, res) {
  try {
    const sessionId = req.cookies.sessionId;
    const maxAge = req.cookies.expirationTime;
    if (sessionId == null || maxAge == null) {
      console.log(`Não autorizado`);
      return false;
    } else {
      var result = await db.USUARIOS.findOne({
        where: { nome: atob(sessionId) },
      });
      try {
        if (result) {
          if (maxAge < Date.now()) {
            console.log(`Não autorizado`);
            return false;
          } else {
            console.log(`${sessionId} Autorizado`);
            return true;
          }
        } else {
          console.log(`Não autorizado`);
          return false;
        }
      } catch (error) {
        console.log(`Erro ao listar: ${error.message}`);
        return false;
      }
    }
  } catch (error) {
    console.log(`Erro ao listar: ${error.message}`);
    return false;
  }
}

module.exports = checkCookies;
