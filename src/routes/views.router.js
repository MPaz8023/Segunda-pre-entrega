const express = require("express");
const router = express.Router();
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json");

//ruta products
router.get("/products", async (req, res) => {
    const productos = await manager.getProducts();

    res.render("home", {productos});
})

//punto 2. mostrar los productos en tiempo real con form para agregar y boton de eliminar


router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
})


module.exports = router;