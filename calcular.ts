//Inicializar objeto Productos
export class Productos {
    id: number;
    nombre: string;
    idCat: number;
    costo: number;
}
var prod: Productos = new Productos();

let prods = [];
let costoU = [];
let costoUnitario:number;
let cantidadPorductos:number;

//Funcion para calcular el costo de todos los productos
function calcular(){
    //Agarrar las hojas y asignarles una varibale
    let productos = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos");
    let productosMateriales = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos-Materiales");
    let materiales = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Materiales");
    //Cargar los datos de la hoja productos en variable
    let dataP = productos.getDataRange().getValues();
    //Variable para guardar cuantos productos hay en total (-1 pq la fila con string no cuenta)
    cantidadPorductos = dataP.length-1;
    //Crear un array de objetos con la data de productos
    for (var i = 1; i < dataP.length; i++) {
        let newProduct = {
            id: dataP[i][0],
            nombre: dataP[i][1],
            categoria: dataP[i][2],
            costo: dataP[i][3]
        }
        prods.push(newProduct);
    }

    //Agarrar valores de "Materiales" y "ProductosMateriales" para comparar sus ids y relacionar 
    //cantidad con precio para poder calcular el costo unitario
    let dataPM = productosMateriales.getDataRange().getValues();
    let dataM = materiales.getDataRange().getValues();
    for(var i = 1; i < dataPM.length ; i++){
        for(var j = 1; j < dataM.length ; j++){
            //si el id de "ProductosMateriales" es igual a el id de "Materiales"
            if(dataPM[i][1] === dataM[j][0]){
                let idProducto = dataPM [i][0];
                let cantidad = dataPM[i][2];
                let costoMaterial = dataM[j][2];
                costoUnitario = cantidad * costoMaterial;
                let newCosto = {
                    idProducto: idProducto,
                    costo: costoUnitario
                }
            costoU.push(newCosto);
            }
        }
    }

    //Calcular el costo de cada producto 
    let costo = costoU.reduce((c, {idProducto,costo}) => {
        c[idProducto] = c[idProducto] || 0;
        c[idProducto] += costo;
        return c;
    }, {});

    //Agregar el costo al objeto productos
    for (var i = 0; i < cantidadPorductos; i++) {
        prods[i].costo = costo[i+1]  
    }

    //Recorrer la hoja productos agregando el costo 
    for(i = 0 ; i <= cantidadPorductos-1 ; i++){
    productos.getRange(i+2, 4).setValue(prods[i].costo); 
   } 
}


  