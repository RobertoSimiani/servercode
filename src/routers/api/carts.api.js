import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  paginate,
  readOne,
  update,
  destroy,
} from "../../controllers/carts.controller.js";

class CartsRouter extends CustomRouter {
  init() {
    this.read("/", read);
    this.read("/paginate", paginate);
    this.read("/:cid", readOne);
    this.create("/", create);
    this.update("/:cid", update);
    this.destroy("/:cid", destroy);
  }
}

const cartsRouter = new CartsRouter();

export default cartsRouter.getRouter();
