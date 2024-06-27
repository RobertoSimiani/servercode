import { createService,readService,readOneService,paginateService,updateService,destroyService } from "../services/users.service.js";


async function read(req, res, next) {
    try {
      const { role } = req.query;
      const all = await readService(role);
  
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
      const one = await readOneService(uid);
  
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
      const one = await createService(data);
  
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
      const one = await updateService(uid, data);
  
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
      const one = await destroyService(uid);
  
      return res.json({
        statusCode: 200,
        response: one,
       
      });
    } catch (error) {
      return next(error);
    }
  }

  export { create,read,readOne, update,destroy}