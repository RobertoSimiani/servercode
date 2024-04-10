import { Router } from "express";
import apiRouterRouter from "./api/index.api.js";
import apiRouter from "./api/index.api.js";

const indexRouter = Router()

indexRouter.use("/api",apiRouter)

export default indexRouter