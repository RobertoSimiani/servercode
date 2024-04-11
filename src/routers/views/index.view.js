import { Router } from "express";
import usersRouter from "./user.view.js";
import productsRouter from "./product.view.js";
import product from "../../data/fs/ProductManager.fs.js";

const viewsRouter = Router();

viewsRouter.use("/users", usersRouter);
viewsRouter.use("/products", productsRouter);

viewsRouter.get("/",async (req,res,next) =>{
    try {
        const products = await product.read()
        return res.render("index", {products})
    } catch (error) {
        return next(error)
    }
})

export default viewsRouter;
