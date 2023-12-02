import express from 'express';
import userRouter from './userRoutes.js';
import router from './noteRoutes.js';
import treeRouter  from './treeRoutes.js'
import noteRouter2 from './noteRouter2.js'
const mainRouter = express.Router()

mainRouter.use('/user',userRouter)
mainRouter.use('/note2',noteRouter2)
mainRouter.use('/note',router)
mainRouter.use('/tree',treeRouter)
export default mainRouter