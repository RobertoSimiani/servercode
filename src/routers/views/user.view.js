import { Router } from "express";
//import user from "../../data/fs/UserManager.fs.js";


const usersRouter = Router();

usersRouter.get("/register",async (req,res,next) =>{
    try {
        
        return res.render("users", {title : "USERS"}) //Aca le muestro que template de Handlebars quiero renderizar
    } catch (error) {
        return next(error)
    }
})

usersRouter.get("/login",async (req,res,next) =>{
    try {
        
        return res.render("login", {title : "LOGIN"}) //Aca le muestro que template de Handlebars quiero renderizar
    } catch (error) {
        return next(error)
    }
})

usersRouter.get("/:uid",async (req,res,next) =>{
    try {
        const {uid} = req.params;
        const one = await user.readOne(uid)
        return res.render("userDetail", {user : one}) //Aca le muestro que template de Handlebars quiero renderizar
    } catch (error) {
        return next(error)
    }
})

export default usersRouter;
