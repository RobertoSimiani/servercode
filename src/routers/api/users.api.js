import { Router } from "express";
import user from "../../data/fs/UserManager.fs.js";

const usersRouter = Router();

usersRouter.get("/", read);
usersRouter.get("/:uid", readOne);
usersRouter.post("/", create);
usersRouter.put("/:uid", update);
usersRouter.delete("/:uid", destroy);


async function read(req, res, next) {
    try {
      const { role } = req.query;
      const all = await user.read(role);
  
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
      const one = await user.readOne(uid);
  
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
      const one = await user.create(data);
  
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
      const one = await user.update(uid, data);
  
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
      const one = await user.destroy(uid);
  
      return res.json({
        statusCode: 200,
        response: one,
       
      });
    } catch (error) {
      return next(error);
    }
  }


export default usersRouter;
