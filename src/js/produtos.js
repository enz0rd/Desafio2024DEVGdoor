$(document).ready(function () {
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
        },
        "lengthMenu": [10, 25, 50, 100] // Opções de quantidade de registros por página
    });

    // Adicionar linhas à DataTable
    produtos.forEach(function(produto) {
        var valorVenda = produto.valor_venda ? 'R$' + produto.valor_venda : '';
        var valorCusto = produto.valor_custo ? 'R$' + produto.valor_custo : '';

        table.row.add([
            produto.id,
            produto.barras || '',
            produto.descricao || '-',
            produto.estoque || '',
            valorVenda,
            valorCusto
        ]).draw();

         // Adicionar ID do produto como classe à linha
         $(rowNode).addClass('produto-id-' + produto.id);

         // Adicionar evento de clique à linha para redirecionar para a página do produto
         $(rowNode).on('click', function() {
             var idProduto = $(this).attr('class').match(/produto-id-(\d+)/)[1];
             window.location.href = '/produto/' + idProduto;
         });
    });

});