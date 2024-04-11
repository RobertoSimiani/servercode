import express, { urlencoded } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";

import product from "./src/data/fs/ProductManager.fs.js";
import user from "./src/data/fs/UserManager.fs.js";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import socketCb from "./src/routers/index.socket.js"
import __dirname from "./utils.js";

//SERVER
const server = express();
const port = 8080;
const ready = () => console.log("Server ready on port " + port);
const nodeServer = createServer(server);
//Creo serv de node con el metodo nativo createServer pasandole como referencia la conf del serv de express
const socketServer = new Server(nodeServer)
nodeServer.listen(port, ready);
socketServer.on("connection", socketCb)


server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname+'/src/views')


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

