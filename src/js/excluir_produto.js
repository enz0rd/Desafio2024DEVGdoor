if (document.getElementById("active").checked === false) {
  document.getElementById("excluir").disabled = true;
} else {
  document.getElementById("excluir").disabled = false;
}

function Redirecionar() {
  window.location.href = "/produtos";
}

function ExcluirProduto() {
  const choice = confirm("Tem certeza que deseja excluir esse produto?");
  if (choice === true) {
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
          alert("Produto excluído!");
          window.location.href = "/produtos";
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao excluir o produto.");
      });
  } else {
    alert("Operação cancelada.");
  }
}
