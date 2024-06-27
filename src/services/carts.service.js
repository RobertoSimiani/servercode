import Service from "./service.js";
import cartsManager from "../data/mongo/cartsManager.mongo.js"



const cartsService= new Service(cartsManager)
export const {createService, readService,paginateService,readOneService,updateService,destroyService} = cartsService