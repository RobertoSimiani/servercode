import environment from "./src/utils/env.util.js"; //Siempre en la primera linea
import express, { urlencoded } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import argsUtil from "./src/utils/args.util.js";
import cors from "cors"

import product from "./src/data/fs/ProductManager.fs.js";
import user from "./src/data/fs/UserManager.fs.js";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import socketCb from "./src/routers/index.socket.js";
import __dirname from "./utils.js";
//import dbConnect from "./src/utils/dbConnect.util.js"; CONEXION MONGO

//SERVER
const server = express();
const port = environment.PORT || argsUtil.p;
const ready = async () => {
  console.log("Server ready on port " + port);
 // await dbConnect(); CONECION DB
};
const nodeServer = createServer(server);
//Creo serv de node con el metodo nativo createServer pasandole como referencia la conf del serv de express
const socketServer = new Server(nodeServer);
nodeServer.listen(port, ready);
socketServer.on("connection", socketCb);

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//---------------------------------------------------------------------------------------------

//MIDDLEWARES
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"));
server.use(express.static("public"));
server.use(cookieParser(environment.SECRET));
server.use(
  session({
    store: new MongoStore({ mongoUrl: environment.MONGO_URI, ttl: 60 * 60 }),
    secret: environment.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);
server.use(cors({origin: true, credentials: true}))

//---------------------------------------------------------------------------------------------

// //ROUTER Siempre en este orden

server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);

console.log(argsUtil)
