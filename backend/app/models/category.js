import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
});

const categoryModel = mongoose.model('Category', categorySchema);

export default categoryModel;
