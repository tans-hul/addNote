import express from 'express'
import treeControllers from '../controllers/treeController.js'
const treeRouter = express.Router();

treeRouter.get('/data/:startId/:targetId',treeControllers.dataRequired)
export default treeRouter
