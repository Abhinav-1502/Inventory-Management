import mongoose  from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        requried: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    price:{
        type: Number,
        required: true
    }
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;