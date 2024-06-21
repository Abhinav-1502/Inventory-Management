import User from '../models/user.js';


// Get request using just email
export const getUserByEmail = async (reqEmail) =>{
    const user = await User.findOne({email: reqEmail }).exec();
    if(!user){
        throw new Error("User doesn't exist");
    }

    return user;
}

// Get request using email and password
export const getUserByCreds = async (reqEmail, reqPassword) =>{
    const user =await User.findOne({email: reqEmail, password: reqPassword}).exec();
    if(!user){
        throw new Error("Invalid email or password");
    }

    return user;
}

// Update request 
export const updateUser = async (userData, userId) =>{
    const user = await User.findById(userId);
    if(!user){
        throw new Error("User not found");
    }else{
        return await User.findByIdAndUpdate(userId, userData);

    }
}

// Delete Request
export const deleteUserById = async (userId) =>{
    const user = await User.findByIdAndDelete(userId).exec();
    if(!user){
        throw new Error("User doesn't exist");
    }
    return user;
}

// Post request using user details

export const postUser = async (userData) =>{
    console.log(userData)
    if(await User.findOne({email: userData.email}).exec()){
        throw new Error("A User already exists with the given email");
    }

    const user = new User(userData);
    return await user.save();
}