const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    stock_code: {type:String, required: true},
    stock_name: {type:String, required: true},
    current_price: {type:Number, required: true},
    lastclose_price: {type:Number, required: true},
    price_change: {type:Number, required: true},
    holdings:{type:Number, required: true},
    pe_ttm: {type: Number},
    dividen: {type: Number},
    growthrate: {type: Number}
})

module.exports = mongoose.model("post", PostSchema)