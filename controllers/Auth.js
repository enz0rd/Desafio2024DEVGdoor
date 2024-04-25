const db = require("../models");

async function checkCookies(req, res) {
  try {
    const sessionId = req.cookies.sessionId;
    const maxAge = req.cookies.expirationTime;
    if (sessionId == null || maxAge == null) {
      // `Não autorizado`
      return false;
    } else {
      var result = await db.USUARIOS.findOne({
        where: { nome: atob(sessionId), ativo: 1 },
      });
      try {
        if (result) {
          if (maxAge < Date.now()) {
            // `Não autorizado`
            return false;
          } else {
            // `${sessionId} Autorizado`
            return true;
          }
        } else {
          // `Não autorizado`
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
