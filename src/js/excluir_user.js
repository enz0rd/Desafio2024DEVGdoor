if (
  document.getElementById("active").checked === false || currentUser === "true"
) {
  document.getElementById("excluir").disabled = true;
} else {
  document.getElementById("excluir").disabled = false;
}

function Redirecionar() {
  window.location.href = "/usuarios";
}

function ExcluirUser() {
  console.log(idUser);
  const choice = confirm("Tem certeza que deseja excluir esse usuário?");
  if (choice === true) {
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
          alert("Usuário excluído!");
          window.location.href = "/usuarios";
        } else {
          throw new Error("Ocorreu um erro ao excluir o usuário.");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao excluir o usuário.");
      });
  } else {
    alert("Operação cancelada.");
  }
}
