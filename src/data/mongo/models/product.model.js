import { Schema, model } from "mongoose";
import mongoosPaginate from "mongoose-paginate-v2"

const collection = "products"

const schema = new Schema({
    title : {type : String, require :true, index: true},
    photo : {type :String, default : "https://static.vecteezy.com/system/resources/thumbnails/008/976/210/small/clothing-store-logo-design-with-hanger-illustration-vector.jpg"},
    category : {type :String, default:"generica", index: true},
    price :{type :Number},
    stock :{type : Number, default : 1}
},{
    timestamps : true
})

schema.plugin(mongoosPaginate)

const Product = model(collection,schema);
export default Product;