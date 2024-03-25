if (document.getElementById("active").checked === false && data[0].currentUser === false) {
  document.getElementById("excluir").disabled = true;
} else {
  document.getElementById("excluir").disabled = false;
}

function Redirecionar() {
  window.location.href = "/usuarios";
}

function ExcluirUser() {
  console.log(idUser)
  const choice = confirm("Tem certeza que deseja excluir esse usuário?");
  if (choice === true) {
    var form = document.getElementById("cadastro-user");

    var user = form.querySelector("input[type='text']").value;
    var checkAtivo = form.querySelector("input[type='checkbox']");

    if (checkAtivo.checked === true) {
      ativo = 1;
    } else {
      ativo = 0;
    }

    var data = {
      id: idUser,
      nome: `${user}`,
      ativo: ativo,
      updated: `${new Date()}`,
    };

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/usuario/excluir", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Verificar o tipo de resposta
          var contentType = xhr.getResponseHeader("Content-Type");
          if (contentType && contentType.includes("application/json")) {
            // A resposta é JSON válido
            var jsonResponse = JSON.parse(xhr.responseText);
            if (jsonResponse.codigo == 400) {
              // Exibir mensagem de erro
              alert(jsonResponse.message);
            }
          } else {
            alert("Usuário excluído!");
            window.location.href = "/usuarios";
            // A resposta não é um JSON válido, exibir mensagem genérica
          }
        } else {
          // Exibir mensagem de erro genérica
          alert("Ocorreu um erro.");
        }
      }
    };
    xhr.send(JSON.stringify(data));
  } else {
    var user = form.querySelector("input[type='text']").value;
    var password = form.querySelector("input[type='password']").value;
    alert("Nenhum campo pode ficar vazio!");
  }
}