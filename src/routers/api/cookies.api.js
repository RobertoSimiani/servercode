import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set", (req, res, next) => {
  try {
    return res
      .cookie("modo", "nocturno", { maxAge: 10000 })
      .cookie("isOnline", "true", { maxAge: 60 * 60 * 1000 , signed: true})
      .json({ message: "Cooki creada con exito" });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/", (req, res, next) => {
  try {
    const cookies = req.cookies;
    return res.json({ cookies });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/get-signed", (req, res, next) => {
    try {
      
      return res.json({ message: req.signedCookies });
    } catch (error) {
      return next(error);
    }
  });

cookiesRouter.get("/destroy/:cookie", (req, res, next) => {
  try {
    const { cookie } = req.params;
    return res
      .clearCookie(cookie)
      .json({ message: "Cooki " + cookie + " borrada" });
  } catch (error) {
    return next(error);
  }
});

export default cookiesRouter;
