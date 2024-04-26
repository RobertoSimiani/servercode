import { Router } from "express";
import usersRouter from "./user.view.js";
import productsRouter from "./product.view.js";
import product from "../../data/fs/ProductManager.fs.js";

const viewsRouter = Router();

viewsRouter.use("/users", usersRouter);
viewsRouter.use("/products", productsRouter);

//ACA HAGO LAS PETICIONES Y MUESTRO QUE ES LO QUE TENGO QUE RENDERIZAR, LUEGO CREO EL HANDLEBAR CON LA VISTA.

viewsRouter.get("/",async (req,res,next) =>{
    try {
        const products = await product.read()
        return res.render("index", {products}) //RENDERIZO INDEX
    } catch (error) {
        return next(error)
    }
})

export default viewsRouter;
