function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Custom Menu')
      .addItem('Calcular Costos', 'menuItem1')
      .addSeparator()
      .addItem('Enviar Listado', 'menuItem2')
      .addToUi(); 
}

function menuItem1() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
     .alert('CALCULANDO!');
  logCosto();
}

function menuItem2() {
  promptEmail();
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
     .alert('Enviando listado!');
  enviarListado();
}