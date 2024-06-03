import CustomRouter from "../CustomRouter.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      passportCb("register"),
      async (req, res, next) => {
        try {
          return res.json({ statusCode: 201, message: "Registered" });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create(
      "/login",
      ["PUBLIC"],
      passportCb("login"),
      async (req, res, next) => {
        try {
          return res.cookie(req.user.token, { signedCookie: true }).json({
            statusCode: 200,
            message: "Logged in",
            //  token: req.user.token,
          });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.read(
      "/online",
      ["USER", "ADMIN"],
      passportCb("jwt"),
      async (req, res, next) => {
        try {
          if (req.user.online) {
            return res.json({
              statusCode: 200,
              message: "Is Online",
              user_id: req.session.user_id,
            });
          }
          return res.json({ statusCode: 401, message: "Log Fail" });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create("/signout",["USER","ADMIN"], (req, res, next) => {
      try {
        if (req.session.email) {
          req.session.destroy();
          return res.json({ statusCode: 200, message: "Signed Out" });
        }
        const error = new Error("Invalid credentials from signout");
        error.statusCode = 401;
        throw error;
      } catch (error) {
        return next(error);
      }
    });
  }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();
