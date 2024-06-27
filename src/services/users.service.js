import Service from "./service.js";
//import usersManager from "../data/mongo/UsersManager.mongo.js"
//NO SE USA MAS DAO XQ INCORPORE ROPOSITORY 
//import dao from "../data/dao.factory.js";
//const {users} = dao
import userRepository from "../repositories/users.rep.js"



const userService= new Service(userRepository)
export const {createService, readService,paginateService,readOneService,updateService,destroyService} = userService