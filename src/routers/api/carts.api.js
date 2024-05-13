import { Router } from "express";
import cartsManager from "../../data/mongo/CartsManager.mongo.js";

const cartsRouter = Router();

cartsRouter.get("/", read);
cartsRouter.get("/paginate", paginate);
cartsRouter.get("/:cid", readOne);
cartsRouter.post("/", create);
cartsRouter.put("/:cid", update);
cartsRouter.delete("/:cid", destroy);




// cartsRouter.post("/", async (req, res, next) => {
//   try {
//     const data = req.body;
//     const one = await cartsManager.create(data);
//     return res.json({
//       statusCode: 201,
//       message: "CREATED",
//       response: one,
//     });
//   } catch (error) {
//     return next(error);
//   }
// });

// cartsRouter.get("/", async (req, res, next) => {
//   try {
//     const { user_id } = req.query;
//     if (user_id) {
//       const all = await cartsManager.read({ user_id });
//       if (all.length > 0) {
//         return res.json({
//           statusCode: 200,
//           message: "READ",
//           response: all,
//         });
//       }
//     } 
//       const error = new Error("NOT FOUND");
//       error.statusCode = 404;
//       throw error;
    
//   } catch (error) {
//     return next(error);
//   }
// });

async function read(req, res, next) {
  try {
    const { user_id } = req.query;
    const all = await cartsManager.read({user_id});

    if (all) {
      return res.json({
        statusCode: 200,
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
    const { cid } = req.params;
    const one = await cartsManager.readOne(cid);

    if (one) {
      return res.json({
        statusCode: 200,
        response: one,
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

async function paginate(req, res, next) {
  try {
    const filter = {};
    const opts = {};

    if(req.query.limit){
      opts.limit = req.query.limit;
    }
    if(req.query.page){
      opts.page = req.query.page;
    }

    const all = await cartsManager.paginate({ filter, opts });

    return res.json({
      statusCode: 200,
      response: all.docs,
      info:{
        page: all.page,
        limit: all.limit,
        prevPage: all.prevPage,
        nextPage: all.nextPage,
        totalPages: all.totalPages
      }
    });
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await cartsManager.create(data);

    return res.json({
      statusCode: 201,
      message: "CREATE ID: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { cid } = req.params;
    const data = req.body;
    const one = await cartsManager.update(cid, data);

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
    const { cid } = req.params;
    const one = await cartsManager.destroy(cid);

    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}


export default cartsRouter;
