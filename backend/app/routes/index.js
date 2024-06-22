import userRouter from './userRouter.js';
import storageRouter from './storageLocRouter.js';
import categoryRouter from './categoryRouter.js';

export default (app) =>{

    app.use('/users', userRouter);
    app.use('/storageLocations', storageRouter);
    app.use('/categories', categoryRouter);
}