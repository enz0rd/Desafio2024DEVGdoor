if (
  document.getElementById("active").checked === false ||
  currentUser === "true"
) {
  document.getElementById("excluir").disabled = true;
} else {
  document.getElementById("excluir").disabled = false;
}

function Redirecionar() {
  window.location.href = "/usuarios";
}

function ExcluirUser() {
  var form = document.getElementById("cadastro-user");
  var user = form.querySelector("input[type='text']").value;
  var checkAtivo = form.querySelector("input[type='checkbox']");
  var ativo = checkAtivo.checked ? 1 : 0;
  var data = {
    id_user: idUser,
    nome: `${user}`,
    ativo: ativo,
    updated: `${new Date()}`,
  };
  fetch("/usuario/excluir", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        openMsgModal("Usuário excluído", "Usuário excluído com sucesso!");
        setTimeout(function () {window.location.href = "/usuarios";}, 2000);
      } else {
        throw new Error("Ocorreu um erro ao excluir o usuário.");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      openMsgModal("Ocorreu um erro:","Ocorreu um erro ao excluir o usuário.");
    });
}

function showPopupExcluir() {
  $("#choiceModal").modal("show");
  $("#confirmar").click(function () {
    ExcluirUser();
  });
}

function openMsgModal(title, msg) {
  $("#msgModalLabel").text(title);
  $("#msgRetorno").text(msg);
  $("#msgModal").css("z-index", 9999);
  $("#msgModal").modal("show");
}
