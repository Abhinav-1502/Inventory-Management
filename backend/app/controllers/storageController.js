import * as storageServices from '../services/storageServices.js';
import {setResponse, setErrorResponse, setConflictResponse, setUnauthorizedResponse, setNotFoundResponse} from './response-handler.js';
// post call to create a new storage location
export const postStorage = async(request, response) =>{
    try{
        const storageData = {...request.body};
        const newStorage = await storageServices.addStorageLocation(storageData);
        setResponse(newStorage, response, 201, "Storage Info Created Successfuly");
    }catch(err){
        if(err.message === "Data already exists"){
            setConflictResponse(err.message, response);
        }else{
            setErrorResponse(err, response);
        }
    }
}


// get call to get all storage locations

export const getStorageData = async(request, response) =>{
    try{
        const {searchBy, searchParams} = request.query;
        let query = {};
        if(searchParams && searchBy){
            const regex = new RegExp(searchParams, 'i');
            if(searchBy === "storageType"){
                query = {storageType: {$regex: regex}};
            }else if(searchBy === "storageName"){
                query = {name: {$regex: regex}};
            }else{
                throw new Error("Invalid search by parameters");
            }
        }
        const storageData = await storageServices.getStorageInfos(query);
        setResponse(storageData, response, 200, "Data retrieved successfuly");

    }catch(err){
            setErrorResponse(err, response);
    }
}

// put call
export const putStorage = async(request, response) =>{
    try{
        const storageData = {...request.body};
        const storageId = request.params.id;
        const updatedData = await storageServices.updateStorageInfo(storageData, storageId);
        setResponse(updatedData, response, 200, "Update successfull");
    }catch(err){
            setErrorResponse(err, response);
    }
}

// delete call
export const delStorage = async(request, response) =>{
    try{
        const storageId = request.params.id;
        const deletedData = await storageServices.deleteStorage(storageId);
        setResponse(deletedData, response, 200, "Data Deleted Successfully");
    }catch(err){
            setErrorResponse(err, response);
        
    }
}

