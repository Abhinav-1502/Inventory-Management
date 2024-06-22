import Storage from '../models/storageLoc.js';

// post a new storage location info

export const addStorageLocation = async(storageData)=>{
    const {name} = storageData;
    if(await Storage.findOne({name: name})){
        throw new Error("Data already exists");
    }

    const newStorage = new Storage(storageData);
    return await newStorage.save();
}

// get all stage locations
export const getStorageInfos = async(query) =>{
    console.log("query:",query);
    const storageData = await Storage.find(query).exec();
    if(!storageData){
        throw new Error("No data found");
    }
    return storageData;
}


// update storage location 

export const updateStorageInfo = async (storageData, storageId) =>{
    const data = await Storage.findById(storageId).exec();
    if(!data){
        throw new Error("No data found");
    }
    return await Storage.findByIdAndUpdate(storageId, storageData).exec();
}

// Delete Storage information , should be able to handle the stock present in the particular storage
// ie, either move the stock to another storage or drop the stock information 

export const deleteStorage = async (storageId) =>{
    const storageData = await Storage.findById(storageId).exec();
    if(!storageData){
        throw new Error("No data found");
    }
    return await Storage.findByIdAndDelete(storageId).exec();
}