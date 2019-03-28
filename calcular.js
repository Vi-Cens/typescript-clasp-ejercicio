"use strict";
exports.__esModule = true;
//Inicializar objeto Productos
var Productos = /** @class */ (function () {
    function Productos() {
    }
    return Productos;
}());
exports.Productos = Productos;
var prod = new Productos();
var prods = [];
var costoU = [];
var costoUnitario;
var cantidadPorductos;
//Funcion para calcular el costo de todos los productos
function calcular() {
    //Agarrar las hojas y asignarles una varibale
    var productos = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos");
    var productosMateriales = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos-Materiales");
    var materiales = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Materiales");
    //Cargar los datos de la hoja productos en variable
    var dataP = productos.getDataRange().getValues();
    //Variable para guardar cuantos productos hay en total (-1 pq la fila con string no cuenta)
    cantidadPorductos = dataP.length - 1;
    //Crear un array de objetos con la data de productos
    for (var i = 1; i < dataP.length; i++) {
        var newProduct = {
            id: dataP[i][0],
            nombre: dataP[i][1],
            categoria: dataP[i][2],
            costo: dataP[i][3]
        };
        prods.push(newProduct);
    }
    //Agarrar valores de "Materiales" y "ProductosMateriales" para comparar sus ids y relacionar 
    //cantidad con precio para poder calcular el costo unitario
    var dataPM = productosMateriales.getDataRange().getValues();
    var dataM = materiales.getDataRange().getValues();
    for (var i = 1; i < dataPM.length; i++) {
        for (var j = 1; j < dataM.length; j++) {
            //si el id de "ProductosMateriales" es igual a el id de "Materiales"
            if (dataPM[i][1] === dataM[j][0]) {
                var idProducto = dataPM[i][0];
                var cantidad = dataPM[i][2];
                var costoMaterial = dataM[j][2];
                costoUnitario = cantidad * costoMaterial;
                var newCosto = {
                    idProducto: idProducto,
                    costo: costoUnitario
                };
                costoU.push(newCosto);
            }
        }
    }
    //Calcular el costo de cada producto 
    var costo = costoU.reduce(function (c, _a) {
        var idProducto = _a.idProducto, costo = _a.costo;
        c[idProducto] = c[idProducto] || 0;
        c[idProducto] += costo;
        return c;
    }, {});
    //Agregar el costo al objeto productos
    for (var i = 0; i < cantidadPorductos; i++) {
        prods[i].costo = costo[i + 1];
    }
    //Recorrer la hoja productos agregando el costo 
    for (i = 0; i <= cantidadPorductos - 1; i++) {
        productos.getRange(i + 2, 4).setValue(prods[i].costo);
    }
}
