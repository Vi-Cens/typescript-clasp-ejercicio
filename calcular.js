function calcular() {
    var Producto = /** @class */ (function () {
        function Producto(id, nombre, categoria, costo) {
            this.id = id;
            this.nombre = nombre;
            this.categoria = categoria;
            this.costo = costo;
        }
        //Ir a la hoja y buscar la data
        Producto.getProductos = function () {
            var productos = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos");
            var data = productos.getDataRange().getValues();
            return data;
        };
        return Producto;
    }());
    var ProductoMaterial = /** @class */ (function () {
        function ProductoMaterial(id, idMaterial, cantidad) {
            this.id = id;
            this.idMaterial = idMaterial;
            this.cantidad = cantidad;
        }
        ProductoMaterial.getProductosMateriales = function () {
            var productosMateriales = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos-Materiales");
            var data = productosMateriales.getDataRange().getValues();
            return data;
        };
        return ProductoMaterial;
    }());
    var Materiales = /** @class */ (function () {
        function Materiales(idMaterial, nombre, costoUnitario) {
            this.idMaterial = idMaterial;
            this.nombre = nombre;
            this.costoUnitario = costoUnitario;
        }
        Materiales.getMateriales = function () {
            var materiales = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Materiales");
            var data = materiales.getDataRange().getValues();
            return data;
        };
        return Materiales;
    }());
    // Inicializar array donde se alojaran los objetos (array de objetos)
    var productos = [];
    var productosMateriales = [];
    var materiales = [];
    // Inicializar variables con la data de las hojas
    var dataP = Producto.getProductos();
    var dataPM = ProductoMaterial.getProductosMateriales();
    var dataM = Materiales.getMateriales();
    // Pasar la data de las 3 hojas necesarias a objetos para manejar mejor sus valores
    var DataToObjects = function () {
        for (var i = 1; i < dataP.length; i++) {
            productos[i - 1] = new Producto(dataP[i][0], dataP[i][1], dataP[i][2], dataP[i][3]);
        }
        for (var i = 1; i < dataPM.length; i++) {
            productosMateriales[i - 1] = new ProductoMaterial(dataPM[i][0], dataPM[i][1], dataPM[i][2]);
        }
        for (var i = 1; i < dataM.length; i++) {
            materiales[i - 1] = new Materiales(dataM[i][0], dataM[i][1], dataM[i][2]);
        }
    };
    // Calcular costo por material
    var getCostoMateriales = function () {
        for (var i = 0; i < productosMateriales.length; i++) {
            for (var j = 0; j < materiales.length; j++) {
                // Si el id de "ProductosMateriales" es igual a el id de "Materiales"
                if (productosMateriales[i].idMaterial === materiales[j].idMaterial) {
                    // Calcular el costo total del material (cantidad*costo unitario)
                    productosMateriales[i].costo = productosMateriales[i].cantidad * materiales[j].costoUnitario;
                }
            }
        }
    };
    // Calcular costo final del producto y agregarlo a la planilla Productos
    var calcularCostos = function () {
        var prods = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos");
        var output = {};
        productosMateriales.forEach(function (e) { return output[e.id] = (output[e.id] || 0) + e.costo; });
        for (var i = 1; i <= productos.length; i++) {
            productos[i - 1].costo = output[i];
            prods.getRange(i + 1, 4).setValue(productos[i - 1].costo);
        }
    };
    DataToObjects();
    getCostoMateriales();
    calcularCostos();
}
