import fs from "fs";
import crypto from "crypto";
import path from "path";

class UserManager {
  constructor() {
    this.path = "./data/fs/files/user.json";
    this.init();
  }

  init() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("El archivo se creo correctamente");
    } else {
      console.log("El archivo ya existe");
    }
  }

  async create(data) {
    try {
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        photo: "https://picsum.photos/",
        email: data.email,
        password: data.password,
        role: data.role || 0 ,
      };

      let allUser = await fs.promises.readFile(this.path, "utf-8");
      allUser = JSON.parse(allUser);
      allUser.push(user);
      allUser = JSON.stringify(allUser, null, 2);
      await fs.promises.writeFile(this.path, allUser);
      console.log({ created: user.id });
    } catch (error) {
      throw new Error("No se pudo crear el usuario");
    }
  }

  async read(rol) {
    try {
      let allUser = await fs.promises.readFile(this.path, "utf-8");
      allUser = JSON.parse(allUser);
      rol && (allUser = allUser.filter(each => each.role === rol))

      if (allUser.length === 0) {
        return null
      } else {
        console.log(allUser);
        return allUser;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readOne(id) {
    try {
      let allUser = await fs.promises.readFile(this.path, "utf-8");
      allUser = JSON.parse(allUser);

      let one = allUser.find((each) => each.id === id);
      if (!one) {
        throw new Error("usuario no encontrado");
      } else {
        console.log(one);
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async destroy(id) {
    try {
      let allUser = await fs.promises.readFile(this.path, "utf-8");
      allUser = JSON.parse(allUser);

      let one = allUser.find((each) => each.id === id);
      if (!one) {
        throw new Error("usuario no encontrado");
      } else {
        let filtered = allUser.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log("usuario eliminado");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// async function test() {
//   try {
//     const user = new UserManager();
    
//     await user.create({ email: "email1@gmail.com",  password: "pass1",  role: 5});
//     await user.create({ email: "email2@gmail.com",  password: "pass1",  role: 5});
//     await user.create({ email: "email3@gmail.com",  password: "pass1",  role: 5});
//     await user.create({ email: "email4@gmail.com",  password: "pass1",  role: 5});
        
//     await user.read();
  
//     } catch (error) {
//     console.log(error);
//   }
// }
// test();


const user = new UserManager()
export default user