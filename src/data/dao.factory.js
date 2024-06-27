import argsUtil from "../utils/args.util.js";
import dbConnect from "../utils/dbConnect.util.js"
import product from "./fs/ProductManager.fs.js";

const persistence = argsUtil.persistence;
let dao = {} //Objeto a llenar dinamicamente con los managers que corresponda

switch (persistence) {
    case "memory":
        const {default: usersManagerMem} = await import("./memory/UserManager.Memory.js")
        const {default: productsManagerMem} = await import("./memory/ProductManager.Memory.js")
        

        dao = {users: usersManagerMem, products: productsManagerMem }
        break;
    case "fs" : 
    const {default: usersManagerFs} = await import("./fs/UserManager.fs.js")
    const {default: productsManagerFs} = await import("./fs/ProductManager.fs.js")

    dao = {users: usersManagerFs, products: productsManagerFs }
        break;
    default:
        dbConnect();
        const {default: usersManagerMongo} = await import("./mongo/UsersManager.mongo.js")
        const {default: productsManagerMongo} = await import("./mongo/ProductsManager.mongo.js")

        dao = {users: usersManagerMongo, products: productsManagerMongo}
        break;
}

export default dao