import { createService,readService,readOneService,paginateService,updateService,destroyService } from "../services/products.service.js";


async function read(req, res, next) {
  try {
    const { category } = req.query;
    const all = await readService(category);

    if (all) {
      return res.response200(all);
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
    const one = await readOneService(pid);

    if (one) {
      return res.response200(one);
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

    if (req.query.limit) {
      opts.limit = req.query.limit;
    }
    if (req.query.page) {
      opts.page = req.query.page;
    }

    const all = await paginateService({ filter, opts });

    return res.json({
      statusCode: 200,
      response: all.docs,
      info: {
        page: all.page,
        limit: all.limit,
        prevPage: all.prevPage,
        nextPage: all.nextPage,
        totalPages: all.totalPages,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await createService(data);

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
    const one = await updateService(pid, data);

    return res.response200(one);
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await destroyService(pid);

    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

export { create, read, readOne, paginate, update, destroy };
