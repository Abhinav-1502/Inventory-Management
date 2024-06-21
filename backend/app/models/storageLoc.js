import mongoose from "mongoose";

const Schema = mongoose.Schema;

const storageSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    storageType:{
        type:String,
        enum:['Warehouse', 'Lockers', 'Space', 'StoreFront', 'Other'],
        required: true
    },
    department:{
        type:String,
        required: true
    }
});

const storageModel = mongoose.model('storageLocation', storageSchema);

export default storageModel;