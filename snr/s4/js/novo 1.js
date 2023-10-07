// Função para abrir o navegador web
function abrirNavegador() {
  var navegador;
  // Verificar qual o navegador web é o padrão do sistema
  if (navigator.appName == "Netscape") {
    navegador = "Netscape";
  } else if (navigator.appName == "Microsoft Internet Explorer") {
    navegador = "Internet Explorer";
  } else if (navigator.appName == "Firefox") {
    navegador = "Firefox";
  } else if (navigator.appName == "Chrome") {
    navegador = "Chrome";
  } else {
    navegador = "Desconhecido";
  }
  
  // Executar o navegador web com a URL padrão
  window.open("http://www.google.com", "Google", "width=800, height=600");
  
  // Função para fechar o navegador web
  function fecharNavegador() {
    window.close();
  }
}

// Iniciar o navegador web
abrirNavegador();