$(document).ready(function () {
  let typingTimer; // Timer para controlar o tempo após a digitação
  const doneTypingInterval = 500; // Intervalo de tempo após parar de digitar (em milissegundos)

  $("#searchTerm").keyup(function () {
    clearTimeout(typingTimer); // Limpa o timer se estiver em execução
    if ($("#searchTerm").val() == "") {
      $("#searchDropdown").removeClass("d-show").addClass("d-none");
      $("#searchDropdown").empty();
    } else {
      typingTimer = setTimeout(performSearch, doneTypingInterval); // Configura o timer novamente
    }
  });

  $("#searchTerm").keypress(function (event) {
    if (event.which === 13) {
      const numResultados = $("#searchDropdown").children().length;
      if (numResultados > 0) {
        const termo = $(this).val().trim();

        // Verifique primeiro o padrão: quantidade*descrição
        const regexDescricao = /^(\d+)\*(.+)$/; // Para quantidade*descrição
        const matchDescricao = termo.match(regexDescricao);

        if (matchDescricao) {
          const qtd = parseInt(matchDescricao[1]);
          const descricao = matchDescricao[2];

          const produto = $("#searchDropdown .l-produto:first-child");
          const id = parseInt(
            produto
              .attr("onclick")
              .split(",")[0]
              .replace("openModal(", "")
              .trim()
          );
          const desc = produto
            .find(".l-produto-g1 p:nth-child(2)")
            .text()
            .replace("Nome: ", "")
            .trim();
          const preco = parseFloat(
            produto
              .find(".l-produto-g2 p:first-child")
              .text()
              .replace("R$", "")
              .trim()
          );
          const qtdDisponivel = parseInt(
            produto
              .find(".l-produto-g2 p:last-child")
              .text()
              .replace("Qtd: ", "")
              .trim()
          );

          openModal(id, desc, preco, qtdDisponivel);
          $("#quantidade").val(qtd);
        } else {
          // Verifique o padrão: quantidade*codigodoproduto
          const regex = /^(\d+)\*(\w+)$/; // Para quantidade*codigodoproduto
          const match = termo.match(regex);

          if (match) {
            console.log("testando codigo");
            const qtd = parseInt(match[1]);
            const codigo = match[2];

            // Obtenha as informações do primeiro resultado
            const produto = $("#searchDropdown .l-produto:first-child");
            const id = parseInt(
              produto
                .attr("onclick")
                .split(",")[0]
                .replace("openModal(", "")
                .trim()
            );
            const descricao = produto
              .find(".l-produto-g1 p:nth-child(2)")
              .text()
              .replace("Nome: ", "")
              .trim();
            const preco = parseFloat(
              produto
                .find(".l-produto-g2 p:first-child")
                .text()
                .replace("R$", "")
                .trim()
            );
            const qtdDisponivel = parseInt(
              produto
                .find(".l-produto-g2 p:last-child")
                .text()
                .replace("Qtd: ", "")
                .trim()
            );

            // Verifique se o código do produto corresponde ao código informado
            if (descricao.includes(codigo) || id == codigo || codigo == preco) {
              // Abra o modal com as informações do produto e a quantidade informada
              openModal(id, descricao, preco, qtdDisponivel);
              $("#quantidade").val(qtd);
            }
          } else {
            // Se o termo não seguir nenhum dos padrões especificados, faça a pesquisa normalmente
            const id = parseInt(
              $("#searchDropdown .l-produto:first-child")
                .attr("onclick")
                .split(",")[0]
                .replace("openModal(", "")
                .trim()
            );
            const descricao = $(
              "#searchDropdown .l-produto:first-child .l-produto-g1 p:nth-child(2)"
            )
              .text()
              .replace("Nome: ", "")
              .trim();
            const preco = parseFloat(
              $(
                "#searchDropdown .l-produto:first-child .l-produto-g2 p:first-child"
              )
                .text()
                .replace("R$", "")
                .trim()
            );
            const qtd = parseInt(
              $(
                "#searchDropdown .l-produto:first-child .l-produto-g2 p:last-child"
              )
                .text()
                .replace("Qtd: ", "")
                .trim()
            );

            openModal(id, descricao, preco, qtd);
          }
        }
      }
    }
  });

  function performSearch() {
    let searchTerm = $("#searchTerm").val().trim();

    const regex = /^(\d+)\*(\w+)$/; // Para quantidade*codigodoproduto
    const match = searchTerm.match(regex);
    const regexDescricao = /^(\d+)\*(.+)$/; // Para quantidade*descrição
    const matchDescricao = searchTerm.match(regexDescricao);

    if (match) {
      searchTerm = match[2]; // Remover a quantidade do termo de pesquisa
    } else if (matchDescricao) {
      searchTerm = matchDescricao[2]; // Remover a quantidade do termo de pesquisa
    }

    $.ajax({
      url: "/pdv/pesquisar",
      type: "GET",
      data: { q: searchTerm },
      success: function (data) {
        $("#searchDropdown").removeClass("d-none").addClass("d-show");
        $("#searchDropdown").empty();
        if (data.length === 0) {
          $("#searchDropdown").append("<p>Nenhum resultado encontrado</p>");
        } else {
          data.forEach(function (produto) {
            $("#searchDropdown").append(
              `<div class='l-produto' onclick='openModal(${produto.id},"${produto.descricao}", ${produto.valor_venda}, ${produto.qtd})'>
                <div class='l-produto-g1'>
                    <p>#${produto.id}</p>
                    <p>Nome: ${produto.descricao}</p>
                </div>
                <div class='l-produto-g2'>
                    <p>R$${produto.valor_venda}</p>
                    <p>Qtd: ${produto.qtd}</p>
                </div>
            </div>`
            );
          });
        }
      },
      error: function (xhr, status, error) {
        console.error(error);
        $(".listagem-produtos").html("Erro ao pesquisar produtos");
      },
    });
  }
});

function openModal(codigo, descricao, preco, qtd) {
  $("#modalCodigo").text(codigo);
  $("#modalDescricao").text(descricao);
  $("#modalPreco").text(`Preço: R$${preco}`);
  $("#modalQtd").text(`Quantidade disponível: ${qtd}`);
  $("#quantidade").val(1);
  $("#produtoModal").modal("show");
}

totalVenda = 0;

function lançar() {
  if (
    parseInt($("#quantidade").val()) >
      parseInt($("#modalQtd").text().replace("Quantidade disponível: ", "")) ||
    parseInt($("#quantidade").val()) <= 0
  ) {
    alert(
      "Quantidade indisponível, informe um valor menor ou igual ao disponível."
    );
  } else if (isNaN(parseInt($("#quantidade").val()))) {
    alert("Informe um valor válido na quantidade do produto");
  } else {
    $("#searchTerm").val("");
    $("#searchDropdown").removeClass("d-show").addClass("d-none");
    $("#searchDropdown").empty();
    const codigo = $("#modalCodigo").text();
    const descricao = $("#modalDescricao").text();
    const preco = parseFloat(
      $("#modalPreco").text().replace("Preço: R$", "").replace(",", ".")
    );
    const quantidade = parseInt($("#quantidade").val());

    // Calcular o total deste produto
    const totalProduto = preco * quantidade;

    // Adicionar o registro à tabela de vendas
    if (verificarProdutoExistente(codigo)) {
      alert("Este produto já foi lançado na venda.");
    } else {
      // Adicionar o produto na tabela
      $("#vendaTable").append(`
        <tr>
          <td>${codigo}</td>
          <td>${descricao}</td>
          <td>R$ ${preco.toFixed(2)}</td>
          <td>${quantidade}</td>
          <td>R$ ${totalProduto.toFixed(2)}</td>
          <td><button class="btn btn-danger btn-sm" onclick="removerItem(this)">Remover</button></td>
        </tr>
      `);
      totalVenda += totalProduto;
      $("#total").text(totalVenda.toFixed(2));
    }

    // Atualizar o total da venda

    // Fechar o modal
    $("#produtoModal").modal("hide");
  }
}

function verificarProdutoExistente(codigo) {
  let produtoExistente = false;
  $("#vendaTable tr").each(function () {
    const codigoExistente = $(this).find("td:first").text();
    if (codigoExistente === codigo) {
      produtoExistente = true;
      return false; // Sai do loop quando encontrar o produto
    }
  });
  return produtoExistente;
}

function removerItem(btn) {
  const row = $(btn).closest("tr");
  const totalProduto = parseFloat(
    row.find("td:nth-child(5)").text().replace("R$ ", "")
  );
  totalVenda -= totalProduto;
  $("#total").text(totalVenda.toFixed(2));
  row.remove();
}

// pagamentos

function openPagamentos() {
  var valor_total = parseFloat($("#total").text());
  if (valor_total == 0) {
    alert("Nenhum produto foi adicionado a venda.");
  } else {
    $("#modalTotal").text(valor_total.toFixed(2));
    $("#pagamentosModal").modal("show");
  }
}

var totalPagamentos = {
  dinheiro: 0,
  cartaodebito: 0,
  cartaocredito: 0,
  pix: 0,
  troco: 0,
};

var faltaPagar = 0;
var troco = 0;

$(".pagamento").on("focus keyup", function (event) {
  telaPagamentos($(this));
});

function telaPagamentos(element) {
  const val = element;
  // Calcula o valor total da venda
  const totalVenda = parseFloat($("#modalTotal").text());
  if (isNaN(val.val())) {
    valorPag = 0;
  } else {
    valorPag = parseFloat(val.val());
  }

  switch(val.attr("id")) {
    case "dinheiro":
      totalPagamentos.dinheiro = isNaN(valorPag) ? 0 : valorPag;
      break;
    case "cartaodebito":
      totalPagamentos.cartaodebito = isNaN(valorPag) ? 0 : valorPag;
      break;
    case "cartaocredito":
      totalPagamentos.cartaocredito = isNaN(valorPag) ? 0 : valorPag;
      break;
    case "pix":
      totalPagamentos.pix = isNaN(valorPag) ? 0 : valorPag;
      break;
  }

  // Calcula o valor total dos pagamentos
  const pagamentos = totalPagamentos.dinheiro + totalPagamentos.cartaodebito + totalPagamentos.cartaocredito + totalPagamentos.pix;

  if (pagamentos > totalVenda) {
    faltaPagar = 0;
    totalPagamentos.troco = pagamentos - totalVenda;
  } else {
    faltaPagar = totalVenda - pagamentos;
    totalPagamentos.troco = 0;
  }

  $("#faltaPagar").text("R$" + faltaPagar.toFixed(2));
  $("#troco").text("R$" + totalPagamentos.troco.toFixed(2));
}

function finalizar() {
  if(faltaPagar > 0) {
    alert("Falta pagar o valor total da venda.");
    return;
  }

  console.log("Finalizando venda...");
  const produtos = [];
  $("#vendaTable tr").each(function () {
    const codigo = parseInt($(this).find("td:first").text());
    const valor = parseFloat($(this).find("td:nth-child(3)").text().replace("R$ ", ""));
    const quantidade = parseInt($(this).find("td:nth-child(4)").text());
    const totalProduto = parseFloat($(this).find("td:nth-child(5)").text().replace("R$ ", ""));
    produtos.push({ codigo, valor, quantidade, totalProduto });
  });

  const pagamentos = {
    dinheiro: totalPagamentos.dinheiro,
    cartaodebito: totalPagamentos.cartaodebito,
    cartaocredito: totalPagamentos.cartaocredito,
    pix: totalPagamentos.pix,
  };

  const valores = {
    total: parseFloat($("#modalTotal").text()),
    troco: totalPagamentos.troco,
  }

  const infoVenda = {
    produtos,
    pagamentos,
    valores,
  };

  console.log(infoVenda);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/pdv/realizar-venda", true);
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
          } else if(jsonResponse.codigo == 200) {
            alert("Venda realizada com sucesso!");
            window.location.href = "/pdv";
          }
        } else {
          window.location.href = "/pdv";
          // A resposta não é um JSON válido, exibir mensagem genérica
        }
      } else {
        // Exibir mensagem de erro genérica
        alert("Ocorreu um erro.");
      }
    }
  };
  xhr.send(JSON.stringify(infoVenda));
}