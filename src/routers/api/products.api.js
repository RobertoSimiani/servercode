import { Router } from "express";
import product from "../../data/fs/ProductManager.fs.js";

const productsRouter = Router();

productsRouter.get("/", read);
productsRouter.get("/:pid", readOne);
productsRouter.post("/", create);
productsRouter.put("/:pid", update);
productsRouter.delete("/:pid", destroy);

async function read(req, res, next) {
  try {
    const { category } = req.query;
    const all = await product.read(category);

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
    const { pid } = req.params;
    const one = await product.readOne(pid);

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
    const one = await product.create(data);

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
    const { pid } = req.params;
    const data = req.body;
    const one = await product.update(pid, data);

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
    const { pid } = req.params;
    const one = await product.destroy(pid);

    return res.json({
      statusCode: 200,
      response: one,
     
    });
  } catch (error) {
    return next(error);
  }
}

export default productsRouter;
