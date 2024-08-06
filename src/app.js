const express = require("express");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const app = express();
const PUERTO = 8080;
const viewRouter = require("./routes/views.router.js");

//importo socket.io
const socket = require("socket.io");

//importamos express-handlebars
const exphbs = require("express-handlebars");

//configuramos express-handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views","./src/views");

app.use(express.json());
app.use(express.static("./src/public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewRouter);

const httpServer = app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080");
})

const ProductManager = require("./managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json");

//trabajamos con webSocket
const io = socket(httpServer);

io.on("connection", async (socket) => {
    console.log("Hay un cliente conectado");

    socket.emit("productos", await manager.getProducts());

    socket.on("eliminarProducto", async (id) => {
        await manager.deleteProduct(id);

        io.sockets.emit("productos", await manager.getProducts());
    });

    socket.on("agregarProducto", async (nuevoProducto) => {
        try {
            await manager.addProduct(nuevoProducto);
            io.sockets.emit("productos", await manager.getProducts());
        } catch (error) {
            console.log("Error al agregar el producto:", error);
        }
    });


})

