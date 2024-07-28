const express = require("express");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const app = express();
const PUERTO = 8080;
const viewRouter = require("./routes/views.router.js");

//importamos express-handlebars
const exphbs = require("express-handlebars");

//configuramos express-handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views","./src/views");

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewRouter);

app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080");
})