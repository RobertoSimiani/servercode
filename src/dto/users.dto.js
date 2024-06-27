import argsUtil from "../utils/args.util.js";
import crypto from "crypto";
import { createHash } from "../utils/hash.util.js";

const persistence = argsUtil.persistence;

class UsersDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.email = data.email;
    this.password = createHash(data.password);
    this.role = data.role || 0;
    this.age = data.age || 12;
    this.photo =
      data.photo ||
      "www.fotopordefecto.com"
      persistence !== "mongo" &&
        (this.createdAt = new Date())
        persistence !== "mongo" &&
        (this.updatedAt = new Date());
  }
}

export default UsersDTO;
