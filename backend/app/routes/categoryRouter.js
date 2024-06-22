import express from "express";
import * as categoryControllers from '../controllers/categoryController.js';

const router = express.Router();

router.post("/createCategory", categoryControllers.postCategory);

router.get("/", categoryControllers.getAllCategories);

router.get("/:id", categoryControllers.getCategory);

router.put("/:id", categoryControllers.putCategory);

router.delete('/:id', categoryControllers.deleteCategory);

export default router;