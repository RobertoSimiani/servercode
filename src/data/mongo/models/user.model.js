import { Schema, model } from "mongoose";


const collection = "users";
const schema = new Schema(
  {
    photo: { type: String, default:"https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"},
    email: { type: String, require: true , unique : true},
    password: { type: String, require: true },
    role: { type: Number, default: 0, enum: [0, 1] },
  },
  {
    timestamps: true,
  }
);

const User = model(collection,schema);
export default User;