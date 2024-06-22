import Category from '../models/category.js';

// Post a new Category
export const createCategory = async(catData) =>{
    if(await Category.findOne({name: catData.name}).exec()){
        throw new Error("A category already exist with the same name");
    }
    
    let hasParent = false;
    let parentCategory = null
    if(catData.parent){
        parentCategory = await Category.findById(catData.parent).exec();
        
        if(!parentCategory){
            throw new Error("Parent Category not found");
        }
        hasParent = true;
    }

    const newCategory = new Category(catData);
    await newCategory.save();

    if(hasParent){
        parentCategory.children.push(newCategory._id);
        await parentCategory.save();
    }
    
    return newCategory;
}

// Get all category information with or without hierarchial data
export const getAllCats = async(isHierarchy) => {
    if(isHierarchy){
        return await Category.find().populate('children').exec();
    }
    return await Category.find().exec()
}


// Get Spercif category informatio with or without hierarchial data
export const getCat = async (isHierarchy, catId) =>{
    const catData = await Category.findById(catId);
    if(!catData){
        throw new Error("Category not found");
    }else if(isHierarchy){
        return await Category.findById(catId).populate('children').exec();
    }
    return catData
}


// Update category informaiton (decide if can be used when creating a child category)
export const updateCat = async(catData, catId) => {
    const oldCatData = await Category.findById(catId).exec();
    if(!oldCatData){
        throw new Error("Category not found");
    }
    
    if(catData.name && oldCatData.name !== catData.name){
        const existingCategory = await Category.findOne({name: catData.name});
        if(existingCategory){
            throw new Error("Another Category with the same name already exists");
        }
    }

    let existingParent = null;
    if(catData.parent && catData.parent !== oldCatData.parent){
        existingParent = await Category.findById(catData.parent).exec();
        if(!existingParent){
            throw new Error("New Parent Category not found");
        }

        if(existingParent._id.equals(catId)){
            throw new Error("A Category cannot be a parent to it's own");
        }
    }

    oldCatData.name = catData.name || oldCatData.name;
    oldCatData.description = catData.description || oldCatData.description;
    
    // Updating Parent
    if(catData.parent && catData.parent !== oldCatData.parent){
        //Updating new parent category
        existingParent.children.push(catData.parent);
        await existingParent.save();
        // Updating old parent category
        const oldParent = await Category.findById(oldCatData.parent).exec();;
        if(oldParent){
            oldParent.children = oldParent.children.filter(childId => !childId.equals(catId));
            await oldParent.save();
        }

        oldCatData.parent = catData.parent;
    }
    return await oldCatData.save();
}

// Delete a category information 
export const deleteCat = async(catId) =>{
    const catData = await Category.findById(catId).exec();
    if(!catData){
        throw new Error("Category Not found");
    }
    const parentCat = await Category.findById(catData.parent);
    if(parentCat){
        parentCat.children = parentCat.children.filter(childId => !childId.equals(catId));
        await parentCat.save();
    }
    return await Category.findByIdAndDelete(catId);
}


