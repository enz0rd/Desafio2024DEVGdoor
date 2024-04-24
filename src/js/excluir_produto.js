if (document.getElementById("active").checked === false) {
  document.getElementById("excluir").disabled = true;
} else {
  document.getElementById("excluir").disabled = false;
}

function Redirecionar() {
  window.location.href = "/produtos";
}

function ExcluirProduto() {
  var form = document.getElementById("cadastro-produto");
  var ativo = form.querySelector("#active").checked ? 1 : 0;
  var data = {
    id: id,
    ativo: ativo,
    updated: `${new Date()}`,
  };
  fetch("/produtos/excluir", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        openMsgModal("Produto excluído", "Produto excluído com sucesso!");
        setTimeout(function () {window.location.href = "/produtos";}, 2000);
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      openMsgModal("Ocorreu um erro:", "Ocorreu um erro ao excluir o produto.");
    });
}

function showPopupExcluir() {
  $("#choiceModal").modal("show");
  $("#confirmar").click(function () {
    ExcluirProduto();
  });
}

function openMsgModal(title, msg) {
  $("#msgModalLabel").text(title);
  $("#msgRetorno").text(msg);
  $("#msgModal").css("z-index", 9999);
  $("#msgModal").modal("show");
}
