
var promptEmail = () =>{
  //Prompt para pedir mail
  let email =  SpreadsheetApp.getUi().prompt("Ingresar email").getResponseText();
  //Pasar el mail a la funcion para enviarlo a esa casilla
  enviarListado(email);
}
 
var enviarListado = (email) =>{
  //Guardar los datos de las hojas en variables
  let listado = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos").getRange(2, 2, 5, 3).getValues();
  let categorias = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Categorias").getRange(2, 1, 2, 2).getValues();
  //Recorrer el listado de productos para asignarle la categoria correspondiente
  for(var i=0 ; i<listado.length ; i++){
    for(var j=0 ; j<categorias.length ; j++){
      if(listado[i][1] === categorias[j][0]){
        listado[i][1] = categorias[j][1];
      }
    }
  }

  //El cuerpo HTML que contendra el mail
  let messageHTML = makeTableHTML(listado);
  //Tabla HTML para el mail
  function makeTableHTML(myArray){
    let result = '<table style="background-color:lightblue;border-collapse:collapse;" border = 1 cellpadding = 5><th>Nombre</th><th>Categoria</th><th>COSTO</th><tr>';
    for(var i=0; i<myArray.length; i++) {
      result += "<tr>";
      for(var j=0; j<myArray[i].length; j++){
        result += "<td>"+myArray[i][j]+"</td>";
      }
      result += "</tr>";
    }
    result += "</table>";
    
    return result;
  }
  MailApp.sendEmail(email,'Lista Productos','Listado', {'htmlBody':messageHTML});
}