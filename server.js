import express, { urlencoded } from "express";
import product from "./data/fs/ProductManager.fs.js";
import user from "./data/fs/UserManager.fs.js";

//SERVER
const server = express();
const port = 8080;
const ready = () => console.log("Server ready on port " + port);

server.listen(port, ready);

//---------------------------------------------------------------------------------------------

//MIDDLEWARES
server.use(express.urlencoded({ extended: true }));

//---------------------------------------------------------------------------------------------

//ROUTER
server.get("/", async (req, res) => {
  try {
    return res.status(200).json({
      response: "CODER API",
      succes: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      response: "CODER API ERROR",
      succes: false,
    });
  }
});

// server.get("/api/products/:title/:category", async (req, res) => {
//   try {
//     const { title , category} = req.params;
//     const data ={title, category}
//     const one = await product.create(data)

//     return res.status(201).json({
//       response: {one},
//       succes: true,
//     });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       response: "ERROR",
//       succes: false,
//     });
//   }
// });

// READ ONE PRODUCT
server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const one = await product.readOne(pid);

    if (one) {
      return res.status(200).json({
        response: one,
        succes: true,
      });
    } else {
      const error = new Error("Not Found")
      error.statusCode= 404
      throw error
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      succes: false,
    });
  }
});


// READ ALL PRODUCTS
server.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;
    const all = await product.read(category);

    if (all) {
      return res.status(200).json({
        response: all,
        category,
        succes: true,
      });
    } else {
      const error = new Error("Not Found")
      error.statusCode= 404
      throw error
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      succes: false,
    });
  }
});

// READ ONE USER
server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const one = await user.readOne(uid);

    if (one) {
      return res.status(200).json({
        response: one,
        succes: true,
      });
    } else {
      const error = new Error("Not Found")
      error.statusCode= 404
      throw error
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      succes: false,
    });
  }
});


// READ ALL USERS
server.get("/api/users", async (req, res) => {
  try {
    const { role } = req.query;
    const all = await user.read(role);

    if (all) {
      return res.status(200).json({
        response: all,
        role,
        succes: true,
      });
    } else {
      const error = new Error("Not Found")
      error.statusCode= 404
      throw error
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      succes: false,
    });
  }
});

