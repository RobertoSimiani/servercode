const { log, error } = require("console");
const crypto = require("crypto");
const { afterEach } = require("node:test");

class ProductManager {
  static #products = [];

  create(data) {
    try {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        //ProductManager.#products.length === 0 ? 1 : ProductManager.#products[ProductManager.#products.length - 1].id + 1,
        title: data.title,
        photo: "https://picsum.photos/",
        category: data.category,
        price: data.price,
        stock: data.stock,
      };
      ProductManager.#products.push(product);
      console.log("Producto Creado");
    } catch (error) {
      throw new error("No se pudo crear el producto");
    }
  }

  read() {
    try {
      return ProductManager.#products;
    } catch (error) {
      throw new error("No se pudo leer la lista de productos");
    }
  }

  readOne(id) {
    try {
      return console.log(ProductManager.#products.find(id));
    } catch (error) {
      throw new error("No se encontro el producto");
    }
  }

  destroy(id) {
    try {
      let productDestroy = ProductManager.#products.find(
        (each) => each.id === id
      );
      if (!productDestroy) {
        throw new error("No existe el preoducto a eliminar");
      } else {
        let filtered = ProductManager.#products.filter(
          (each) => each.id !== id
        );
        ProductManager.#products.push(filtered);
      }
    } catch (error) {
      throw error;
    }
  }
}

const productos = new ProductManager();
productos.create({
  title: "Remera Estampada",
  category: "ropa masculina",
  price: 8500,
  stock: 20,
});

productos.create({
  title: "Chomba",
  category: "ropa masculina",
  price: 30500,
  stock: 8,
});

productos.create({
  title: "Pantalon Cargo",
  category: "ropa masculina",
  price: 20600,
  stock: 15,
});

productos.create({
  title: "Gorra Trucker",
  category: "accesorios",
  price: 14800,
  stock: 9,
});

productos.create({
  title: "Pulcera Cuero",
  category: "accesorios",
  price: 8800,
  stock: 12,
});

productos.create({
  title: "Lentes Sol",
  category: "accesorios",
  price: 19800,
  stock: 2,
});

productos.create({
  title: "Zapas Vans",
  category: "calzado",
  price: 48500,
  stock: 5,
});

productos.create({
  title: "Zapas Adidas",
  category: "calzado",
  price: 95000,
  stock: 3,
});

productos.create({
  title: "Zapas Nike",
  category: "calzado",
  price: 103200,
  stock: 1,
});

productos.create({
  title: "Zapas Puma",
  category: "calzado",
  price: 79000,
  stock: 8,
});

productos.create({
  title: "Zapas Topper",
  category: "calzado",
  price: 12000,
  stock: 13,
});

productos.create({
  title: "Pulsera Hombre",
  category: "accesorios",
  price: 3000,
  stock: 17,
});

productos.create({
  title: "Riñonera",
  category: "accesorios",
  price: 20600,
  stock: 1,
});

productos.create({
  title: "Gorra Dama",
  category: "accesorios",
  price: 14850,
  stock: 8,
});

productos.create({
  title: "Zapas Converse",
  category: "calzado",
  price: 81000,
  stock: 4,
});

productos.create({
  title: "Riñonera Dama",
  category: "accesorios",
  price: 11400,
  stock: 9,
});

productos.create({
  title: "Zapas Virtus",
  category: "calzado",
  price: 50000,
  stock: 5,
});

productos.create({
  title: "Camisa",
  category: "ropa masculina",
  price: 27000,
  stock: 30,
});

productos.create({
  title: "Jeans",
  category: "ropa masculina",
  price: 21500,
  stock: 10,
});

productos.create({
  title: "Buzo",
  category: "ropa masculina",
  price: 20200,
  stock: 6,
});

console.log(productos.read());

console.log(productos.readOne(2));

console.log(productos.destroy(2));


