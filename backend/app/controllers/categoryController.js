import * as categoryServices from '../services/categoryServices.js';
import {setResponse, setConflictResponse,setErrorResponse,setNotFoundResponse,setUnauthorizedResponse} from './response-handler.js';

// post new Category 
export const postCategory = async(request, response) =>{
    try{
        const catData = {...request.body};
        const newCategoryData = await categoryServices.createCategory(catData);
        setResponse(newCategoryData, response, 201, "New Category Created Successfully");
    }catch(err){
        if(err.message === "A category already exist with the same name"){
            setConflictResponse("Category Already Exists with same name", response);
        }else{
            setErrorResponse(err, response);
        }
    }
}

// get all categories with or without hierarcheal data
export const getAllCategories = async(request, response) =>{
    try{
        const isHierarchy = request.query.isHierarchy === "true";
        const categories = await categoryServices.getAllCats(isHierarchy);
        setResponse(categories, response, 200, "Categories Retrieved Successfully");
    }catch(err){
        setErrorResponse(err, response);
    }
}

// get category with id 
export const getCategory = async(request, response) =>{
    try{
        const isHierarchy = request.query.isHierarchy === 'true';
        const categoryId = request.params.id;
        const catData = await categoryServices.getCat(isHierarchy, categoryId);
        setResponse(catData, response, 200, "Category retrieved successfully");
    }catch(err){
        if(err.message === "Category not found"){
            setNotFoundResponse("Category not found", response);
        }else{
            setErrorResponse(err, response);
        }
    }
}

// update cateogry 
export const putCategory = async(request, response) =>{
    try{
        const id = request.params.id;
        const {name, description, parent} = request.body;
        const catData = await categoryServices.updateCat({name, description, parent}, id);
        setResponse(catData, response, 200, "Category updated successfully");
    }catch(err){
        setErrorResponse(err, response);
    }
}

// delete category 
export const deleteCategory = async(request, response) =>{
    try{
        const categoryId = request.params.id;
        const deletedCat = await categoryServices.deleteCat(categoryId);
        setResponse(deleteCategory, response, 200, "Category deleted successfully");
    }catch(err){
        if(err.message === "Category Not found"){
            setNotFoundResponse(err.message, response);
        }else{
            setErrorResponse(err, response);
        }
    }
}