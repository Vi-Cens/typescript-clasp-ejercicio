function promptEmail() {
    //Prompt para pedir mail
    var email = SpreadsheetApp.getUi().prompt("Ingresar email").getResponseText();
    // Guardar el email en la hoja
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("email").getRange("A1").setValue(email);
}
function enviarListado() {
    var currentEmail = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("email").getRange(1, 1).getValues();
    var listado = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos").getRange(2, 2, 5, 3).getValues();
    var categorias = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Categorias").getRange(2, 1, 2, 2).getValues();
    //Seleccionar la hoja email para sacar el destinatario de ahi 
    //var app = SpreadsheetApp;
    //var activeSheet = app.getActiveSpreadsheet().getActiveSheet();
    //var targetSheet = app.getActiveSpreadsheet().getSheetByName("email");
    //var currentEmail = activeSheet.getRange(1,1).getValue();
    for (var i = 0; i < listado.length; i++) {
        if (listado[i][1] === categorias[0][0]) {
            listado[i][1] = categorias[0][1];
        }
        else { //Al agregar otra categoria dejaria de funcionar!
            listado[i][1] = categorias[1][1];
        }
    }
    Logger.log(listado);
    var messageHTML = makeTableHTML(listado);
    Logger.log(messageHTML);
    function makeTableHTML(myArray) {
        var result = '<table style="background-color:lightblue;border-collapse:collapse;" border = 1 cellpadding = 5><th>Nombre</th><th>Categoria</th><th>COSTO</th><tr>';
        for (var i = 0; i < myArray.length; i++) {
            result += "<tr>";
            for (var j = 0; j < myArray[i].length; j++) {
                result += "<td>" + myArray[i][j] + "</td>";
            }
            result += "</tr>";
        }
        result += "</table>";
        return result;
    }
    MailApp.sendEmail(currentEmail, 'Lista Productos', 'test', { 'htmlBody': messageHTML });
    //Session.getEffectiveUser().getEmail()
}
