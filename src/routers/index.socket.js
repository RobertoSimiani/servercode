import product from "../data/fs/ProductManager.fs.js"

export default async (socket) =>{
    console.log("client id:"+ socket.id)
    socket.emit("products",await product.read())
    socket.on("newProduct", async data =>{
        await product.create(data)
        socket.emit("products",await product.read())
    })

}