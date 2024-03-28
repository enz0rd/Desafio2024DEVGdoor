$(document).ready(function() {
    var table = $('#tab_produtos').DataTable({
        "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "Mostrar _MENU_ registros por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar:",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        }
    });

    produtos.forEach(function(produto) {
        var valorVenda = produto.valor_venda ? 'R$' + produto.valor_venda.toFixed(2) : '';
        var valorCusto = produto.valor_custo ? 'R$' + produto.valor_custo.toFixed(2) : '';

        var rowNode = table.row.add([
            produto.id,
            produto.barras || '',
            produto.descricao || '-',
            produto.qtd || '',
            valorVenda,
            valorCusto // Adicionando valor de custo à linha da tabela
        ]).draw().node();

        if (!produto.ativo) {
            $(rowNode).addClass('inativo'); // Adiciona a classe 'inativo' se o produto não estiver ativo
        }

        $(rowNode).on('click', function() {
            var idProduto = produto.id;
            window.location.href = '/produtos/' + idProduto;
        });
    });
});
