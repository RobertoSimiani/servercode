import { Schema, model } from "mongoose";
import mongoosPaginate from "mongoose-paginate-v2"

const collection = "users";
const schema = new Schema(
  {
    photo: {
      type: String,
      default:
        "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
    },
    email: { type: String, require: true, unique: true, index: true },
    password: { type: String, require: true },
    role: { type: Number, default: 0, enum: [0, 1], index: true },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosPaginate)

const User = model(collection, schema);
export default User;
