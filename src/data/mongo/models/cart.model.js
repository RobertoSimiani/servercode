import { Schema,model, Types } from "mongoose";
import mongoosPaginate from "mongoose-paginate-v2"

const collection = "carts"

const schema = new Schema({
    user_id : {type: Types.ObjectId, ref:"users", index : true},
    product_id :{type: Types.ObjectId, ref:"products", require: true},
    quantity :{type: Number,require :true},
    state :{type: String, enum:["reserved","paid","delivered"], default:"reserved"}
},{
    timestamps : true
})

schema.pre("find",function () {this.populate("user_id","email photo -_id")})
schema.pre("find",function () {this.populate("product_id")})

schema.plugin(mongoosPaginate)

const Cart = model(collection,schema) //Esta const siempre en PascalCase
export default Cart