import "dotenv/config.js"; //Siempre en la primera linea
import express, { urlencoded } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import product from "./src/data/fs/ProductManager.fs.js";
import user from "./src/data/fs/UserManager.fs.js";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import socketCb from "./src/routers/index.socket.js";
import __dirname from "./utils.js";
import dbConnect from "./src/utils/dbConnect.util.js";

//SERVER
const server = express();
const port = process.env.PORT || 8080;
const ready = async () => {
  console.log("Server ready on port " + port);
  await dbConnect();
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
server.use(cookieParser(process.env.SECRET));
server.use(
  session({
    store: new MongoStore({ mongoUrl: process.env.MONGO_URI, ttl: 60 * 60 }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

//---------------------------------------------------------------------------------------------

// //ROUTER Siempre en este orden

server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
