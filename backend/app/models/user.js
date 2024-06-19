import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },

    lastName:{
        type:String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    phone:{
        type: String,
        required: false
    },

    userAccesLevel:{
        type: String,
        required: false,
        default: 'low',
        enum: ['top', 'mid', 'low']
    },

    businessRole:{
        type: String,
        required: false,
        default: 'end-user'
    }
});

const userModel = mongoose.model('User', userSchema);

export default userModel;