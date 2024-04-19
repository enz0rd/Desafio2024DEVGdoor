document
  .getElementById("login-form")
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

    var form = document.getElementById("login-form");
    var camposPreenchidos = verificarCamposPreenchidos(form);

    if (camposPreenchidos) {
      var form = event.target;
      var user = form.querySelector("input[type='text']").value;
      var password = form.querySelector("input[type='password']").value;

      var data = {
        user: `${user}`,
        password: `${password}`,
      };

      var xhr = new XMLHttpRequest();
      xhr.open("POST", form.action, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // Verificar o tipo de resposta
            var contentType = xhr.getResponseHeader("Content-Type");
            if (contentType && contentType.includes("application/json")) {
              // A resposta é JSON válido
              var jsonResponse = JSON.parse(xhr.responseText);
              if (jsonResponse.message) {
                // Exibir mensagem de erro
                openMsgModal("Alerta:", jsonResponse.message);
              }
            } else {
              window.location.href = "/home";
              // A resposta não é um JSON válido, exibir mensagem genérica
            }
          } else {
            // Exibir mensagem de erro genérica
            openMsgModal("Ocorreu um erro", "Ocorreu um erro ao fazer login. Tente novamente.");
          }
        }
      };
      xhr.send(JSON.stringify(data));
    } else {
      var user = form.querySelector("input[type='text']").value;
      var password = form.querySelector("input[type='password']").value;
      openMsgModal("Preencha os campos", "Preencha os campos de login!");
    }
  });

  function openMsgModal(title, msg) {
    $("#msgModalLabel").text(title);
    $("#msgRetorno").text(msg);
    $('#msgModal').css('z-index', 9999);
    $("#msgModal").modal("show");
  }
  