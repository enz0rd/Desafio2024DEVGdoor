document
  .getElementById("cadastro-produto")
  .addEventListener("submit", function (event) {
    // Impede o envio do formulário padrão
    event.preventDefault();
    var form = event.target;
    var barras = form.querySelector("#barras").value;
    var descricao = form.querySelector("#descricao").value;
    var qtd = parseFloat(form.querySelector("#qtd").value);
    var valor_custo = parseFloat(form.querySelector("#valorcusto").value);
    var valor_venda = parseFloat(form.querySelector("#valorvenda").value);
    var observacoes = form.querySelector("#observacoes").value;

    function verificarCamposPreenchidos(form) {
      if (descricao.trim() === "" || isNaN(valor_custo) || isNaN(valor_venda) || isNaN(qtd)) {
        return false; // Impede o envio do formulário
    }

      return true; // Retorna verdadeiro se todos os campos estiverem preenchidos
    }

    var form = document.getElementById("cadastro-produto");
    var camposPreenchidos = verificarCamposPreenchidos(form);

    if (camposPreenchidos) {
      // Formata os dados em um objeto
      var data = {
        barras: barras,
        descricao: descricao,
        qtd: qtd,
        valor_custo: valor_custo,
        valor_venda: valor_venda,
        observacoes: observacoes,
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
              if (jsonResponse.codigo == 400) {
                // Exibir mensagem de erro
                openMsgModal("Ocorreu um erro:", jsonResponse.message);
              }
            } else {
              openMsgModal("Produto cadastrado", "Produto cadastrado com sucesso!");
              setTimeout(function () {window.location.href = "/produtos";}, 2000);
              // A resposta não é um JSON válido, exibir mensagem genérica
            }
          } else {
            // Exibir mensagem de erro genérica
            openMsgModal("Ocorreu um erro:", "Ocorreu um erro ao cadastrar o produto. Tente novamente.");
          }
        }
      };
      xhr.send(JSON.stringify(data));
    } else {
      openMsgModal("Preencha os campos obrigatórios:","Os campos descrição, valor de custo, valor de venda e quantidade não podem estar em branco!");
    }
  });

  function openMsgModal(title, msg) {
    $("#msgModalLabel").text(title);
    $("#msgRetorno").text(msg);
    $('#msgModal').css('z-index', 9999);
    $("#msgModal").modal("show");
  }