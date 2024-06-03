import CustomRouter from "../CustomRouter.js";
import cartsManager from "../../data/mongo/CartsManager.mongo.js";


class CartsRouter extends CustomRouter{
  init(){
    this.read("/", read);
    this.read("/paginate", paginate);
    this.read("/:cid", readOne);
    this.create("/", create);
    this.update("/:cid", update);
    this.destroy("/:cid", destroy);
  }
}




const cartsRouter = new CartsRouter();


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


export default cartsRouter.getRouter();
