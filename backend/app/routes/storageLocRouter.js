import express from 'express';
import * as storageControllers from '../controllers/storageController.js';

const router = express.Router();

router.post('/addStorageLocation', storageControllers.postStorage);

router.get('/', storageControllers.getStorageData);

router.put('/:id', storageControllers.putStorage);

router.delete('/:id', storageControllers.delStorage);

export default router;
