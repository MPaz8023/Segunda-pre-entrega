const express = require("express");
const router = express.Router();
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json");

//ruta products
router.get("/products", async (req, res) => {
    const productos = await manager.getProducts();

    res.render("index", {productos});
} )



module.exports = router;