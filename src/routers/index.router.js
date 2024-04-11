import { Router } from "express";
import apiRouterRouter from "./api/index.api.js";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";

const indexRouter = Router()

indexRouter.use("/api",apiRouter)
indexRouter.use("/",viewsRouter)


export default indexRouter