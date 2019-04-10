function calcular(){

    class Producto{
        id:number;
        nombre:string;
        categoria:number;
        costo:number; 

        constructor(id:number, nombre:string, categoria:number, costo:number){
            this.id = id;
            this.nombre = nombre;
            this.categoria = categoria;
            this.costo = costo;
        }
        //Ir a la hoja y buscar la data
        static getProductos(){
            let productos = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos");
            let data = productos.getDataRange().getValues();
            return data;
        }
    }

    class ProductoMaterial{
        id: number;
        idMaterial: number;
        cantidad:number;

        constructor(id:number, idMaterial:number, cantidad:number){
            this.id = id;
            this.idMaterial = idMaterial;
            this.cantidad = cantidad;
        }

        static getProductosMateriales(){
            let productosMateriales = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos-Materiales");
            let data = productosMateriales.getDataRange().getValues();
            return data;
        }
    }

    class Materiales{
        idMaterial: number;
        nombre: string;
        costoUnitario: number;

        constructor(idMaterial:number, nombre:string, costoUnitario:number){
            this.idMaterial = idMaterial;
            this.nombre = nombre;
            this.costoUnitario = costoUnitario;
        }

        static getMateriales(){
            let materiales = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Materiales");
            let data = materiales.getDataRange().getValues();
            return data;
        }

    }

    // Inicializar array donde se alojaran los objetos (array de objetos)
    let productos = [];
    let productosMateriales = [];
    let materiales = [];
    // Inicializar variables con la data de las hojas
    let dataP = Producto.getProductos();
    let dataPM = ProductoMaterial.getProductosMateriales();
    let dataM = Materiales.getMateriales();

    // Pasar la data de las 3 hojas necesarias a objetos para manejar mejor sus valores
    let DataToObjects = () => {
        for(let i = 1 ; i<dataP.length ; i++){
            productos[i-1] = new Producto(dataP[i][0], dataP[i][1], dataP[i][2], dataP[i][3])
        }
        for(let i = 1 ; i<dataPM.length ; i++){
            productosMateriales[i-1] = new ProductoMaterial(dataPM[i][0], dataPM[i][1], dataPM[i][2])
        }
        for(let i = 1 ; i<dataM.length ; i++){
            materiales[i-1] = new Materiales(dataM[i][0], dataM[i][1], dataM[i][2])
        }
    }

    // Calcular costo por material
    let getCostoMateriales = () => {
        for(var i = 0; i < productosMateriales.length ; i++){
            for(var j = 0; j < materiales.length ; j++){
                // Si el id de "ProductosMateriales" es igual a el id de "Materiales"
                if(productosMateriales[i].idMaterial === materiales[j].idMaterial){
                    // Calcular el costo total del material (cantidad*costo unitario)
                    productosMateriales[i].costo = productosMateriales[i].cantidad * materiales[j].costoUnitario;

                }
            }
        }
    }

    // Calcular costo final del producto y agregarlo a la planilla Productos
    let calcularCostos = () =>{ 
        let prods = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos");
        let output = {}; 
        productosMateriales.forEach(e => output[e.id] = (output[e.id] || 0) + e.costo);
        for(let i = 1 ; i <= productos.length ; i++){
            productos[i-1].costo = output[i];
            prods.getRange(i+1, 4).setValue(productos[i-1].costo); 
        }
    }

    DataToObjects();
    getCostoMateriales();
    calcularCostos();
}