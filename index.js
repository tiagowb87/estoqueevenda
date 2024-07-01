document.getElementById('estoqueForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nomeProduto = document.getElementById('nomeProduto').value;
    const codigoProduto = document.getElementById('codigoProduto').value;
    const quantidadeEstoque = document.getElementById('quantidadeEstoque').value;
    const precoUnitario = document.getElementById('precoUnitario').value;
    const categoria = document.getElementById('categoria').value;
    const localizacao = document.getElementById('localizacao').value;
    const dataEntrada = document.getElementById('dataEntrada').value;

    const table = document.getElementById('estoqueTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    newRow.insertCell(0).appendChild(document.createTextNode(nomeProduto));
    newRow.insertCell(1).appendChild(document.createTextNode(codigoProduto));
    newRow.insertCell(2).appendChild(document.createTextNode(quantidadeEstoque));
    newRow.insertCell(3).appendChild(document.createTextNode(precoUnitario));
    newRow.insertCell(4).appendChild(document.createTextNode(categoria));
    newRow.insertCell(5).appendChild(document.createTextNode(localizacao));
    newRow.insertCell(6).appendChild(document.createTextNode(dataEntrada));

    document.getElementById('estoqueForm').reset();
});

document.getElementById('vendasForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const dataVenda = document.getElementById('dataVenda').value;
    const codigoProdutoVenda = document.getElementById('codigoProdutoVenda').value;
    const quantidadeVenda = document.getElementById('quantidadeVenda').value;
    const valorTotal = document.getElementById('valorTotal').value;
    const cliente = document.getElementById('cliente').value;
    const metodoPagamento = document.getElementById('metodoPagamento').value;

    const table = document.getElementById('vendasTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).appendChild(document.createTextNode(dataVenda));
    newRow.insertCell(1).appendChild(document.createTextNode(codigoProdutoVenda));
    newRow.insertCell(2).appendChild(document.createTextNode(''));
    newRow.insertCell(3).appendChild(document.createTextNode(quantidadeVenda));
    newRow.insertCell(4).appendChild(document.createTextNode(valorTotal));
    newRow.insertCell(5).appendChild(document.createTextNode(cliente));
    newRow.insertCell(6).appendChild(document.createTextNode(metodoPagamento));

    document.getElementById('vendasForm').reset();
});

document.getElementById('gerarRelatorioEstoque').addEventListener('click', function() {
    const table = document.getElementById('estoqueTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let report = '<h3>Relatório de Estoque</h3><table><tr><th>Nome do Produto</th><th>Código do Produto</th><th>Quantidade</th><th>Preço Unitário</th><th>Categoria</th><th>Localização</th><th>Data de Entrada</th></tr>';
    
    for (let i = 0; i < rows.length; i++) {
        const cols = rows[i].getElementsByTagName('td');
        report += '<tr>';
        for (let j = 0; j < cols.length; j++) {
            report += '<td>' + cols[j].innerText + '</td>';
        }
        report += '</tr>';
    }
    
    report += '</table>';
    document.getElementById('relatoriosContent').innerHTML = report;
});

document.getElementById('gerarRelatorioVendas').addEventListener('click', function() {
    const table = document.getElementById('vendasTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let report = '<h3>Relatório de Vendas</h3><table><tr><th>Data da Venda</th><th>Código do Produto</th><th>Nome do Produto</th><th>Quantidade Vendida</th><th>Valor Total</th><th>Cliente</th><th>Método de Pagamento</th></tr>';
    
    for (let i = 0; i < rows.length; i++) {
        const cols = rows[i].getElementsByTagName('td');
        report += '<tr>';
        for (let j = 0; j < cols.length; j++) {
            report += '<td>' + cols[j].innerText + '</td>';
        }
        report += '</tr>';
    }
    
    report += '</table>';
    document.getElementById('relatoriosContent').innerHTML = report;
});

document.getElementById('salvarRelatorioEstoque').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Relatório de Estoque', 10, 10);

    const table = document.getElementById('estoqueTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    const rowData = [['Nome do Produto', 'Código do Produto', 'Quantidade', 'Preço Unitário', 'Categoria', 'Localização', 'Data de Entrada']];

    for (let i = 0; i < rows.length; i++) {
        const cols = rows[i].getElementsByTagName('td');
        const row = [];
        for (let j = 0; j < cols.length; j++) {
            row.push(cols[j].innerText);
        }
        rowData.push(row);
    }
    
    doc.autoTable({
        head: [rowData[0]],
        body: rowData.slice(1),
    });

    doc.save('relatorio_estoque.pdf');
});

document.getElementById('salvarRelatorioVendas').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Relatório de Vendas', 10, 10);

    const table = document.getElementById('vendasTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    const rowData = [['Data da Venda', 'Código do Produto', 'Nome do Produto', 'Quantidade Vendida', 'Valor Total', 'Cliente', 'Método de Pagamento']];

    for (let i = 0; i < rows.length; i++) {
        const cols = rows[i].getElementsByTagName('td');
        const row = [];
        for (let j = 0; j < cols.length; j++) {
            row.push(cols[j].innerText);
        }
        rowData.push(row);
    }
    
    doc.autoTable({
        head: [rowData[0]],
        body: rowData.slice(1),
    });

    doc.save('relatorio_vendas.pdf');
});
