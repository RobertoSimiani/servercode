import fs from "fs";
import crypto from "crypto";
import path from "path";

class UsersManager {
  constructor() {
    this.path = "./src/data/fs/files/user.json";
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
      if(!data.email){
        throw new Error("INGRESE EMAIL");
      }
      if(!data.password){
        throw new Error("INGRESE PASSWORD");
      }
      else{
        

      let allUser = await fs.promises.readFile(this.path, "utf-8");
      allUser = JSON.parse(allUser);
      allUser.push(data);
      allUser = JSON.stringify(allUser, null, 2);
      await fs.promises.writeFile(this.path, allUser);
      return data;
      }
      

      
    } catch (error) {
      throw error;
    }
  }

  async read(role) {
    try {
      let allUser = await fs.promises.readFile(this.path, "utf-8");
      allUser = JSON.parse(allUser);
      role && (allUser = allUser.filter(each => each.role === role))

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

  async update(id,data){
    try {
      let all = await this.read()
      let one = all.find(each => each.id === id)
     //RECORRE EL OBJETO Y ACTUALIZA LAS PROPIEDADES 
      if (one){
        for (let prop in data){
          one[prop] = data[prop]
        }
      
        all = JSON.stringify(all,null,2)
      await fs.promises.writeFile(this.path,all)
      return one;
      }
      else{
        const error = new Error("Not Found")
        error.statusCode = 404
        throw error
      }
      

    } catch (error) {
      throw error
    }
  }

}

// async function test() {
//    try {
//     const user = new UserManager();
    
//     await user.create({ email: "email1@gmail.com",  password: "pass1",  role: 0});
//     await user.create({ email: "email2@gmail.com",  password: "pass1",  role: 0});
//     await user.create({ email: "email3@gmail.com",  password: "pass1",  role: 1});
//     await user.create({ email: "email4@gmail.com",  password: "pass1",  role: 1});
        
//      await user.read();
  
//     } catch (error) {
//      console.log(error);
//    }
//  }
//   test();


const usersManager = new UsersManager()
export default usersManager