import express from 'express'
import treeControllers from '../controllers/treeController.js'
const treeRouter = express.Router();

treeRouter.get('/data',treeControllers.dataRequired)
export default treeRouter
