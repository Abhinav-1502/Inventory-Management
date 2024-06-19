import userRouter from './userRouter.js';


export default (app) =>{

    app.use('/users', userRouter);
    
}