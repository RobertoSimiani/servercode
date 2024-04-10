const crypto = require("crypto");


class UserManager {
  static #users = [];

  create(data) {
    try {
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
         // id autoincremental // UserManager.#users.length === 0 ? 1 : UserManager.#users[UserManager.#users.length - 1].id + 1,
        photo: "https://picsum.photos/",
        email: data.email,
        pass: data.pass,
        role: "0",
      }; 
      UserManager.#users.push(user);
      console.log("Usuario Creado");
    } catch (error) {
      throw new error("No se pudo crear el usuario");
    }
    
  }

  read(){
    try {
      return UserManager.#users
    } catch (error) {
      throw new error("No se pudo leer la lista de usuarios");
    }
 }

 readOne(id) {
  try {
    return console.log(UserManager.#users.find(id));
  } catch (error) {
    throw new error("No se encontro el producto");
  }
}

destroy(id) {
  try {
    let UserDestroy = UserManager.#users.find(
      (each) => each.id === id
    );
    if (!UserDestroy) {
      throw new error("No existe el preoducto a eliminar");
    } else {
      let filtered = UserManager.#users.filter(
        (each) => each.id !== id
      );
      UserManager.#users.push(filtered);
    }
  } catch (error) {
    throw error;
  }
}
}


const usuarios = new UserManager();
usuarios.create({
    email : "rober.r3@hotmail.com",
    pass : "contraseña"
}) 

usuarios.create({
    email : "robertoS@hotmail.com",
    pass : "contraseña1"
}) 

usuarios.create({
  email : "robertoS@hotmail.com",
  pass : "contraseña2"
}) 

usuarios.create({
  email : "robertoS@hotmail.com",
  pass : "contraseña3"
}) 

console.log( usuarios.read());

console.log( usuarios.readOne(2));

console.log( usuarios.destroy(2));