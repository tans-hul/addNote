import express from 'express'
import {noteControl} from '../controllers/noteController.js'
import  { auth }  from '../middleware/auth.js';
const noteRouter2 = express.Router();

noteRouter2.get('/getall/:id',noteControl.notesOfaUser)


export default noteRouter2;
