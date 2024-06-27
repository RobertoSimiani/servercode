import Service from "./service.js";
//import productsManager from "../data/mongo/productsManager.mongo.js"
import dao from "../data/dao.factory.js";

const {products} = dao



const productsService= new Service(products)
export const {createService, readService,paginateService,readOneService,updateService,destroyService} = productsService