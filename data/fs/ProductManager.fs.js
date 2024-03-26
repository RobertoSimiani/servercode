import fs from "fs";
import crypto from "crypto";
import path from "path";

class ProductManager {
  constructor() {
    this.path = "./data/fs/files/product.json";
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
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: "https://picsum.photos/",
        category: data.category,
        price: data.price || 1,
        stock: data.stock || 1,
      };

      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);
      allProducts.push(product);
      allProducts = JSON.stringify(allProducts, null, 2);
      await fs.promises.writeFile(this.path, allProducts);
      console.log({ created: product.id });
    } catch (error) {
      throw new Error("No se pudo crear el Producto");
    }
  }

  async read(cat) {
    try {
      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);
      cat && (allProducts = allProducts.filter(each => each.category === cat))

      if (allProducts.length === 0) {
        //throw new Error("No existen productos que leer!");
        return null
      } else {
        console.log(allProducts);
        return allProducts;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readOne(id) {
    try {
      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);

      let one = allProducts.find((each) => each.id === id);
      if (!one) {
        throw new Error("Producto no encontrado");
      } else {
        console.log(one);
        return one;
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

  async destroy(id) {
    try {
      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);

      let one = allProducts.find((each) => each.id === id);
      if (!one) {
        const error = new Error("not found!");
        error.statusCode = 404;
        throw error;
      } else {
        let filtered = allProducts.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        return one
      }
    } catch (error) {
      throw error;
    }
  }
}

//  async function test() {
//     try {
//        const product = new ProductManager();

//         await product.create({title: "Remera Estampada",category: "ropa masculina",price: 8500,stock: 20,});
//         await product.create({title: "Chomba",category: "ropa masculina",price: 30500,stock: 8,});
//         await product.create({title: "Pantalon Cargo",category: "ropa masculina",price: 20600,stock: 15,});
//         await product.create({title: "Gorra Trucker",category: "accesorios",price: 14800,stock: 9,});
//         await product.create({title: "Pulcera Cuero",category: "accesorios",price: 8800,stock: 12,});
//         await product.create({title: "Lentes Sol",category: "accesorios",price: 19800,stock: 2,});
//         await product.create({title: "Zapas Vans",category: "calzado",price: 48500,stock: 5,});
//         await product.create({title: "Zapas Adidas",category: "calzado",price: 95000,stock: 3,});
//         await product.create({title: "Zapas Nike",category: "calzado",price: 103200,stock: 1,});
//         await product.create({title: "Zapas Puma",category: "calzado",price: 79000,stock: 8,});
//         await product.create({title: "Zapas Topper",category: "calzado",price: 12000,stock: 13,});
//         await product.create({title: "Pulsera Hombre",category: "accesorios",price: 3000,stock: 17,});
//         await product.create({title: "Riñonera",category: "accesorios",price: 20600,stock: 1,});
//         await product.create({title: "Gorra Dama",category: "accesorios",price: 14850,stock: 8,});
//         await product.create({title: "Zapas Converse",category: "calzado",price: 81000,tock: 4,});
//         await product.create({title: "Riñonera Dama",category: "accesorios",price: 11400,stock: 9,});
//         await product.create({title: "Zapas Virtus",category: "calzado",price: 50000,stock: 5,});
//         await product.create({title: "Camisa",category: "ropa masculina",price: 27000,stock: 30,});
//         await product.create({title: "Jeans",category: "ropa masculina",price: 21500,stock: 10,});
//         await product.create({title: "Buzo",category: "ropa masculina",price: 20200,stock: 6,});
//       await product.read();
//      await product.readOne("897748be372");
//     await product.destroy("df111b5bafb6aed17d55d345");
//     } catch (error) {
//       console.log(error);
//    }
//    }
//    test();

const product = new ProductManager()
export default product