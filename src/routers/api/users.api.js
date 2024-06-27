import CustomRouter from "../CustomRouter.js";
import { create,read,readOne, update,destroy} from "../../controllers/users.controller.js"

class UsersRouter extends CustomRouter{
  init(){
    this.read("/", read);
    this.read("/:uid", readOne);
    this.create("/", create);
    this.update("/:uid", update);
    this.destroy("/:uid", destroy);
  }
}



const usersRouter = new UsersRouter();

export default usersRouter.getRouter();
