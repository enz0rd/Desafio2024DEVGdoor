function delayRedirect() {
  setTimeout(function () {history.go(-1);}, 3000); // 5000 milissegundos = 5 segundos
}

// Chame a função para iniciar o atraso de redirecionamento
delayRedirect();
