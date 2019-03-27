//CLASP!

var arr = [];
var productos = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos");
var prodMat = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos-Materiales");
var materiales = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Materiales");

function logCosto(){
  var data = productos.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    logMaterialesProducto(i);
    var costoTotal = 0;
  }
  
  var pro = 0;
  var unitcost=[];
  for (var a = 0; a < arr.length ; a++) {
    if(pro==arr[a].idProducto){
      unitcost[unitcost.length-1]+=arr[a].costoUnitario;
    }
    else{
      pro=arr[a].idProducto;
      unitcost.push(arr[a].costoUnitario);
    }
    Logger.log(unitcost);
  }
  
  var cuantosID = unitcost.length
  Logger.log(unitcost);
  Logger.log(cuantosID);
  

  //var app = SpreadsheetApp;
  //var activeSheet = app.getActiveSpreadsheet().getActiveSheet();
  //var targetSheet = app.getActiveSpreadsheet().getSheetByName("Productos");
    for(k = 0; k <= cuantosID-1; k++){
    productos.getRange(k+2, 4).setValue(unitcost[k]);
  //targetSheet.getRange(2, 4).setValue(unitcost[1]);
  //targetSheet.getRange(3, 4).setValue(unitcost[3]);
  //targetSheet.getRange(4, 4).setValue(unitcost[5]);
  //targetSheet.getRange(5, 4).setValue(unitcost[7]);
  //targetSheet.getRange(6, 4).setValue(unitcost[9]);
  }  
  
  //Para que al terminar deje "Productos" como spreadsheet activa
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setActiveSheet(ss.getSheets()[0]);  

}

function logMaterialesProducto(id) {
  //var sheet = SpreadsheetApp.getActiveSpreadsheet();
  //SpreadsheetApp.setActiveSheet(sheet.getSheetByName('Productos-Materiales'))
  var data = prodMat.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if(data[i][0] === id){
      logMateriales(data[i][0], data[i][1], data[i][2], i);
    }
  }
}

function logMateriales(id ,idM, cant) {
  //var sheet = SpreadsheetApp.getActiveSpreadsheet();
  //SpreadsheetApp.setActiveSheet(sheet.getSheetByName('Materiales'))
  var data = materiales.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    var costo = {};
    if(data[i][0] === idM ){  //si el id del material coincide
    var costoM = data[i][2]*(cant);  //cantidad * costo unitario
      costo.idProducto = id;
      costo.costoUnitario = costoM;
      arr.push(costo);
    }
  }
}



