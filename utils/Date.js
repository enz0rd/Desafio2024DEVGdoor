function calcularData() {
  var date = new Date();
  var datalocal = date.toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
  var horariolocal = date.toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  // Obtendo componentes individuais de data e hora
  var dia = date.getDate();
  var mes = date.getMonth() + 1; // Mês começa do zero, então adicionamos 1
  var ano = date.getFullYear();
  var hora = date.getHours();
  var minutos = date.getMinutes();
  var segundos = date.getSeconds();

  // Formatando os componentes para garantir que tenham dois dígitos
  dia = dia < 10 ? "0" + dia : dia;
  mes = mes < 10 ? "0" + mes : mes;
  hora = hora < 10 ? "0" + hora : hora;
  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;

  // Combinando data e hora em uma única string no formato ISO 8601
  var dataHoraIso = `${ano}-${mes}-${dia}T${hora}:${minutos}:${segundos}`;

  return dataHoraIso;
}

module.exports = calcularData;