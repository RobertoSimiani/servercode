import CustomRouter from "../CustomRouter.js";
import usersManager from "../../data/mongo/UsersManager.mongo.js";

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

async function read(req, res, next) {
    try {
      const { role } = req.query;
      const all = await usersManager.read(role);
  
      if (all) {
        return res.status(200).json({
          response: all,
          });
      } else {
        const error = new Error("Not Found");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
  
  async function readOne(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await usersManager.readOne(uid);
  
      if (one) {
        return res.json({
          statusCode: 200,
          response : one,
        });
      } else {
        const error = new Error("Not Found");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
        return next(error);
    }
  }
  
  async function create(req, res,next) {
    try {
      const data = req.body;
      const one = await usersManager.create(data);
  
      return res.json({
        statusCode: 201,
        response: "CREATE ID: " + one.id,
        message : "CREATED USER"
      });
    } catch (error) {
      return next(error);
    }
  }
  
  async function update(req, res, next) {
    try {
      const { uid } = req.params;
      const data = req.body;
      const one = await usersManager.update(uid, data);
  
      return res.json({
        statusCode: 200,
        response: one,
        });
    } catch (error) {
      return next(error);
    }
  }
  
  async function destroy(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await usersManager.destroy(uid);
  
      return res.json({
        statusCode: 200,
        response: one,
       
      });
    } catch (error) {
      return next(error);
    }
  }


export default usersRouter.getRouter();
