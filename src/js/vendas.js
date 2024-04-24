$(document).ready(function () {
  var table = $("#tab_vendas").DataTable({
    language: {
      sEmptyTable: "Nenhum registro encontrado",
      sInfo: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
      sInfoEmpty: "Mostrando 0 até 0 de 0 registros",
      sInfoFiltered: "(Filtrados de _MAX_ registros)",
      sInfoPostFix: "",
      sInfoThousands: ".",
      sLengthMenu: "Mostrar _MENU_ registros por página",
      sLoadingRecords: "Carregando...",
      sProcessing: "Processando...",
      sZeroRecords: "Nenhum registro encontrado",
      sSearch: "Pesquisar:",
      oPaginate: {
        sNext: "Próximo",
        sPrevious: "Anterior",
        sFirst: "Primeiro",
        sLast: "Último",
      },
      oAria: {
        sSortAscending: ": Ordenar colunas de forma ascendente",
        sSortDescending: ": Ordenar colunas de forma descendente",
      },
    },
    order: [[0, "desc"]],
  });

  vendas.forEach(function (venda) {
    var valorVenda = venda.valor_tot ? "R$" + venda.valor_tot.toFixed(2) : "";

    var botaoCancelar = `<button class="btn btn-outline-danger justify-center btn-sm" title="Cancelar Venda" onclick=showPopupCancelar(${venda.NUMERO})>❌</button>`;
    var botaoVisualizar = `<button class="btn btn-outline-primary justify-center btn-sm" title="Visualizar Venda" onclick=window.location.href='/venda/${venda.NUMERO}'>🔍</button>`;

    if (venda.cancelada) {
      var rowNode = table.row
        .add([
          venda.NUMERO,
          moment(venda.DATA_EMISSAO).format("DD/MM/YYYY HH:mm:ss") || "",
          venda.STATUS || "-",
          valorVenda,
          venda.nomeOperador,
          botaoVisualizar,
        ])
        .draw()
        .node();
      $(rowNode).find("td:last-child").addClass("funcoes");
      $(rowNode).addClass("cancelada"); // Adiciona a classe 'inativo' se o venda não estiver ativo
    } else {
      var rowNode = table.row
        .add([
          venda.NUMERO,
          moment(venda.DATA_EMISSAO).format("DD/MM/YYYY HH:mm:ss") || "",
          venda.STATUS || "-",
          valorVenda,
          venda.nomeOperador,
          botaoVisualizar + botaoCancelar,
        ])
        .draw()
        .node();
      $(rowNode).find("td:last-child").addClass("funcoes");
    }
  });
});

function showPopupCancelar(id) {
  $("#choiceModal").modal("show");
  $("#confirmar").click(function () {
    CancelarVenda(id);
  });
}

function CancelarVenda(id) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", `/venda/cancelar/${id}`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // Verificar o tipo de resposta
        var contentType = xhr.getResponseHeader("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          // A resposta é JSON válido
          var jsonResponse = JSON.parse(xhr.responseText);
          openMsgModal("Ocorreu um erro:", jsonResponse.message);
          setTimeout(function () {window.location.reload()}, 2000);
        } else {
          openMsgModal("Venda cancelada", "Venda cancelada com sucesso!");
          setTimeout(function () {window.location.reload()}, 2000);
          // A resposta não é um JSON válido, exibir mensagem genérica
        }
      } else {
        // Exibir mensagem de erro genérica
        openMsgModal("Ocorreu um erro:", "Ocorreu um erro ao cancelar a venda");
      }
    }
  };
  xhr.send();
}

function openMsgModal(title, msg) {
  $("#msgModalLabel").text(title);
  $("#msgRetorno").text(msg);
  $("#msgModal").modal("show");
}
