import express, { urlencoded } from "express";
import product from "./src/data/fs/ProductManager.fs.js";
import user from "./src/data/fs/UserManager.fs.js";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import morgan from "morgan";

//SERVER
const server = express();
const port = 8080;
const ready = () => console.log("Server ready on port " + port);

server.listen(port, ready);

//---------------------------------------------------------------------------------------------

//MIDDLEWARES
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"));


//---------------------------------------------------------------------------------------------

// //ROUTER Siempre en este orden

server.use("/", indexRouter);
server.use(errorHandler)
server.use(pathHandler)

