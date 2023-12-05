import express from 'express'
import treeControllers from '../controllers/treeController.js'
import {auth} from '../middleware/auth.js'
const treeRouter = express.Router();

treeRouter.get('/data/:startId/:targetId',auth,treeControllers.dataRequired)
export default treeRouter
