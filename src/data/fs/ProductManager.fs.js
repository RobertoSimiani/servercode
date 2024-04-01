import fs from "fs";
import crypto from "crypto";
import path from "path";

class ProductManager {
  constructor() {
    this.path = "./src/data/fs/files/product.json";
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
      if (!data.title) {
        throw new Error("INGRESE TITULO");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: "https://picsum.photos/",
          category: data.category || "ropa",
          price: data.price || 1,
          stock: data.stock || 1,
        };
        let allProducts = await fs.promises.readFile(this.path, "utf-8");
        allProducts = JSON.parse(allProducts);
        allProducts.push(product);
        allProducts = JSON.stringify(allProducts, null, 2);
        await fs.promises.writeFile(this.path, allProducts);
        return product;
      }
    } catch (error) {
      throw error;
    }
  }


  // async create(data) {
  //   try {
  //     const product = {
  //       id: crypto.randomBytes(12).toString("hex"),
  //       title: data.title,
  //       photo: "https://picsum.photos/",
  //       category: data.category || "ropa",
  //       price: data.price || 1,
  //       stock: data.stock || 1,
  //     };

  //     let allProducts = await fs.promises.readFile(this.path, "utf-8");
  //     allProducts = JSON.parse(allProducts);
  //     allProducts.push(product);
  //     allProducts = JSON.stringify(allProducts, null, 2);
  //     await fs.promises.writeFile(this.path, allProducts);
  //     } catch (error) {
  //     throw new Error("No se pudo crear el Producto");
  //   }
  // }

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

//   async function test() {
//     try {
//               const product = new ProductManager();
// await product.create({title: "Remera Estampada",  category: "ropa masculina", price: 8500, stock: 20})
// await product.create({title: "Pantalón de Jean", category: "ropa masculina", price: 12500, stock: 15})
// await product.create({title: "Camisa de Cuadros", category: "ropa masculina", price: 9500, stock: 18})
// await product.create({title: "Zapatillas Deportivas", category: "calzado", price: 15500, stock: 25})
// await product.create({title: "Vestido Floral", category: "ropa femenina", price: 13500, stock: 12})
// await product.create({title: "Falda Plisada", category: "ropa femenina", price: 10500, stock: 20})
// await product.create({title: "Campera de Cuero", category: "ropa unisex", price: 28000, stock: 10})
// await product.create({title: "Bufanda Tejida", category: "accesorios", price: 5500, stock: 30})
// await product.create({title: "Sombrero de Paja", category: "accesorios", price: 7500, stock: 25})
// await product.create({title: "Mochila Urbana", category: "accesorios", price: 12500, stock: 15})
// await product.create({title: "Gorra Deportiva", category: "accesorios", price: 4500, stock: 35})
// await product.create({title: "Reloj Analógico", category: "accesorios", price: 9500, stock: 20})
// await product.create({title: "Pulsera de Cuero", category: "accesorios", price: 3500, stock: 40})
// await product.create({title: "Collar de Perlas", category: "accesorios", price: 10500, stock: 10})
// await product.create({title: "Lentes de Sol", category: "accesorios", price: 8500, stock: 25})
// await product.create({title: "Botas de Montaña", category: "calzado", price: 19500, stock: 20})
// await product.create({title: "Sandalias Playeras", category: "calzado", price: 9500, stock: 15})
// await product.create({title: "Sweater Tejido", category: "ropa unisex", price: 11500, stock: 18})
// await product.create({title: "Shorts Deportivos", category: "ropa unisex", price: 7500, stock: 22})
// await product.create({title: "Top Deportivo", category: "ropa femenina", price: 6500, stock: 30})
// await product.create({title: "Traje de Baño", category: "ropa unisex", price: 18500, stock: 10})
// await product.create({title: "Calcetines Deportivos", category: "ropa unisex", price: 2500, stock: 50})
// await product.create({title: "Gafas de Natación", category: "accesorios", price: 6500, stock: 15})
// await product.create({title: "Paraguas Transparente", category: "accesorios", price: 8500, stock: 20})
// await product.create({title: "Chaqueta Impermeable", category: "ropa unisex", price: 19500, stock: 12})
// await product.create({title: "Chaleco Acolchado", category: "ropa unisex", price: 13500, stock: 18})
// await product.create({title: "Bufanda de Lana", category: "accesorios", price: 6500, stock: 25})
// await product.create({title: "Guantes de Invierno", category: "accesorios", price: 4500, stock: 30})
// await product.create({title: "Cinturón de Cuero", category: "accesorios", price: 8500, stock: 20})
// await product.create({title: "Mochila Escolar", category: "accesorios", price: 11500, stock: 15})
// await product.create({title: "Gorro de Lana", category: "accesorios", price: 5500, stock: 22})
// await product.create({title: "Bufanda de Seda", category: "accesorios", price: 10500, stock: 10})
// await product.create({title: "Bolso de Cuero", category: "accesorios", price: 18500, stock: 8})
// await product.create({title: "Mochila de Viaje", category: "accesorios", price: 25500, stock: 5})
// await product.create({title: "Maletín Ejecutivo", category: "accesorios", price: 17500, stock: 10})
// await product.create({title: "Portafolio de Negocios", category: "accesorios", price: 9500, stock: 15})
// await product.create({title: "Zapatos Formales", category: "calzado", price: 18500, stock: 12})
// await product.create({title: "Botas de Cuero", category: "calzado", price: 24500, stock: 10})
// await product.create({title: "Alpargatas", category: "calzado", price: 6500, stock: 20})
// await product.create({title: "Zapatillas Urbanas", category: "calzado", price: 10500, stock: 15})
// await product.create({title: "Mocasines de Cuero", category: "calzado", price: 12500, stock: 18})
 
     
//     } catch (error) {
//        console.log(error);
//     }
//     }
//     test();

const product = new ProductManager()
export default product