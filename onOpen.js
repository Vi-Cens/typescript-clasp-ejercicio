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
  SpreadsheetApp.getUi() 
     .alert('CALCULANDO!');
  calcular();
}

function menuItem2() {
  promptEmail();
  SpreadsheetApp.getUi()
     .alert('Enviando listado!');
}