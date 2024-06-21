import * as userServices from '../services/userServices.js';
import { setErrorResponse, setConflictResponse, setNotFoundResponse, setResponse, setUnauthorizedResponse } from './response-handler.js';

// Create User Controller
export const createUser = async (request, response) =>{
    try{
        const userData = { ...request.body};
        const newUser = await userServices.postUser(userData);
        setResponse(userData, response, 201, "User Created Successfully");
    }
    catch(err){
        if(err.message === "A User already exists with the given email"){
            setConflictResponse(err.message, response)
        }else{
            setErrorResponse(err, response);
        }
    }
}

//Update User info 
export const putUser = async(request, response) =>{
    try{
        const userId = request.params.id;
        const userData = { ...request.body};
        const updatedUser = await userServices.updateUser(userData, userId);
        setResponse(updatedUser, response, 200, "User updated successfully");
    }catch(err){
        if(err.message === "User not found"){
            setConflictResponse(err.message, response);
        }else{
            setErrorResponse(err, response);
        }
    }
    

}

// Get User Using Email and password 

export const loginUser = async(request, response) =>{
    try{
        const {email, password} = {...request.body};
        const token = await userServices.getUserByCreds(email, password);
        setResponse(token, response, 200, "User Retrived Successfuly");
    }catch(err){
        if (err.message === 'Invalid email or password') {
            setUnauthorizedResponse('Invalid email or password', response);
        }
        else {
            setErrorResponse(err, response);
        }
    }
}

// Delete User

export const deleteUser = async(request, response) =>{
    try{
        const userId = request.params.id;
        const token = await userServices.deleteUserById(userId);
        setResponse(token, response, 200, "User deleted successfully");
    }catch(err){
        if(err.message = "User doesn't exist"){
            setNotFoundResponse("User doesn't Exist", response);
        }else{
            setErrorResponse(err, response);
        }
    }
}
