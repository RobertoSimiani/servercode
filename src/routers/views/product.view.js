import { Router } from "express";
import product from "../../data/fs/ProductManager.fs.js";

const productsRouter = Router();

productsRouter.get("/real",async (req,res,next) =>{
    try {
        
        return res.render("products", {title : "PRODUCTS"}) //Aca le muestro que template de Handlebars quiero renderizar
    } catch (error) {
        return next(error)
    }
})

export default productsRouter;
