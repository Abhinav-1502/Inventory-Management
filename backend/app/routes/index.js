import userRouter from './userRouter.js';
import storageRouter from './storageLocRouter.js'

export default (app) =>{

    app.use('/users', userRouter);
    app.use('/storageLocations', storageRouter);
}