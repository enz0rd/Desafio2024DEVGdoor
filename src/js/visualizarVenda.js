$(document).ready(function () {
  var tableProd = $("#tab_produtos_venda").DataTable({
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
  });

  data.itens.forEach(function (itevenda) {
    var rowNode = tableProd.row
      .add([
        itevenda.codigo_produto,
        itevenda.produto.descricao || "",
        "R$"+itevenda.valor_un.toFixed(2) || "-",
        itevenda.qtd.toFixed(2),
        "R$"+itevenda.valor_tot.toFixed(2),
      ])
      .draw()
      .node();
  });
});
