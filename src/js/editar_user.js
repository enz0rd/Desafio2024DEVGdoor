document
  .getElementById("cadastro-user")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário padrão
    function verificarCamposPreenchidos(form) {
      var inputs = form.querySelectorAll("input");

      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === "") {
          return false; // Retorna falso se algum campo estiver vazio
        }
      }

      return true; // Retorna verdadeiro se todos os campos estiverem preenchidos
    }

    var form = document.getElementById("cadastro-user");
    var camposPreenchidos = verificarCamposPreenchidos(form);

    if (camposPreenchidos) {
      var form = event.target;
      var user = form.querySelector("input[type='text']").value;
      var password = form.querySelector("input[type='password']").value;
      var checkAtivo = form.querySelector("input[type='checkbox']");

      if (checkAtivo.checked === true) {
        ativo = true;
      } else {
        ativo = false;
      }

      var data = {
        nome: `${user}`,
        password: `${password}`,
        ativo: ativo,
        updated: `${new Date()}`,
      };

      var xhr = new XMLHttpRequest();
      xhr.open("post", form.action, true);
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
                openMsgModal("Ocorreu um erro:", jsonResponse.message);
              }
            } else {
              openMsgModal("Usuário atualizado", "Usuário atualizado com sucesso!");
              setTimeout(function () {window.location.href = "/usuarios";}, 2000);
              // A resposta não é um JSON válido, exibir mensagem genérica
            }
          } else {
            // Exibir mensagem de erro genérica
            openMsgModal("Ocorreu um erro", "Erro ao atualizar usuário, tente novamente mais tarde!");
          }
        }
      };
      xhr.send(JSON.stringify(data));
    } else {
      var user = form.querySelector("input[type='text']").value;
      var password = form.querySelector("input[type='password']").value;
      openMsgModal("Preencha todos os campos:", "Nenhum campo pode ficar vazio!");
    }
  });

  function openMsgModal(title, msg) {
    $("#msgModalLabel").text(title);
    $("#msgRetorno").text(msg);
    $('#msgModal').css('z-index', 9999);
    $("#msgModal").modal("show");
  }
