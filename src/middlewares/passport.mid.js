import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import usersManager from "../data/mongo/UsersManager.mongo.js";
import { createHash } from "../utils/hash.util.js";
import { verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        if (!email || !password) {
          const error = new Error("Enter email and password!");
          error.statusCode = 400;
          return done(error);
        }
        const one = await usersManager.readByEmail(email);
        if (one) {
          const error = new Error("Bad auth from register!");
          error.statusCode = 401;
          return done(error);
        }
        const hashPassword = createHash(password);
        req.body.password = hashPassword;
        const user = await usersManager.create(req.body);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const one = await usersManager.readByEmail(email);
        if (!one) {
          const error = new Error("Bad auth from login!");
          error.statusCode = 401;
          return done(error);
        }
        const verify = verifyHash(password, one.password);
        if (verify) {
          //   req.session.email = email;
          //   req.session.online = true;
          //   req.session.role = one.role;
          //   req.session.user_id = one._id;
          //   req.session.photo = one.photo;
          const user = {
            email,
            role: one.role,
            photo: one.photo,
            _id: one._id,
            online: true,
          };
          const token = createToken(user);
          user.token = token;

          return done(null, user);
        }
        const error = new Error("Invalid Credentials");
        error.statusCode = 401;
        return done(error);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest : ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: process.env.SECRET_JWT,
    },
    (data, done) => {
      try {
        if (data) {
          return done(null, data);
        } else {
          const error = new Error("Bad auth from Jwt!");
          error.statusCode = 403;
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
