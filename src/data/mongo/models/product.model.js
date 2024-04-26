import { Schema, model } from "mongoose";

const collection = "products"

const schema = new Schema({
    title : {type : String, require :true},
    photo : {type :String, default : "https://static.vecteezy.com/system/resources/thumbnails/008/976/210/small/clothing-store-logo-design-with-hanger-illustration-vector.jpg"},
    category : {type :String, default:"generica"},
    price :{type :Number},
    stock :{type : Number, default : 1}
},{
    timestamps : true
})

const Product = model(collection,schema);
export default Product;