//Inicializar objeto Productos
export class Productos {
    id: number;
    nombre: string;
    idCat: number;
    costo: number;
}
var prod: Productos = new Productos();

let prods = [];
let prodMats = [];
let costoU = [];
let costoUnitario:number;

//Funcion para calcular el costo de todos los productos
function calcularCostos(){
    //Agarrar las hojas y asignarles una varibale
    let productos = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos");
    let productosMateriales = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos-Materiales");
    let materiales = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Materiales");
    //Cargar los datos de la hoja productos en variable
    let dataP = productos.getDataRange().getValues();
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

    let dataPM = productosMateriales.getDataRange().getValues();
    let dataM = materiales.getDataRange().getValues();
    for(var i = 1; i < dataPM.length ; i++){
        for(var j = 1; j < dataM.length ; j++){
            if(dataPM[i][1] === dataM[j][0]){
                let idProducto = dataPM [i][0];
                let cantidad = dataPM[i][2];
                let costoMaterial = dataM[j][2];
                //Logger.log(costoMaterial)
                costoUnitario = cantidad * costoMaterial;
                let newCosto = {
                    idProducto: idProducto,
                    costo: costoUnitario
                }
            costoU.push(newCosto);
            }
        }
    }


    let result = costoU.reduce((c, {idProducto,costo}) => {
        c[idProducto] = c[idProducto] || 0;
        c[idProducto] += costo;
        return c;
      }, {});
    Logger.log(result);  

    Logger.log(costoU)
    Logger.log(prods)
    //Logger.log(prods[1].id)
    //Logger.log(prods[1].nombre)
}


  