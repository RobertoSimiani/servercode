import { config } from "dotenv";
import argsUtil from "./args.util.js";

const {env} = argsUtil
const path = env ==="dev" ? "./.env.dev" : "./.env.prod"

config({path})

const environment= {
    MONGO_URI : process.env.MONGO_URI,
PORT :process.env.PORT,
SECRET :process.env.SECRET, 
SECRET_JWT :process.env.SECRET_JWT,
}

export default environment