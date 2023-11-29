import express from 'express';
import {noteControl} from '../controllers/noteController.js'
import  { auth }  from '../middleware/auth.js';
// import {createNote,updateNote,deleteNote,getAllNotes,getSingleNote} from '../controllers/noteController.js';
// import updateNote from '../controllers/noteController.js';
// import deleteNote from '../controllers/noteController.js';

const router = express.Router();

router.get('/all',auth,noteControl.getAllNotes);
router.post('/addparent', auth ,noteControl.createParentNote)
router.get('/allUserNotes',auth,noteControl.getAllUserNotes)
// router.put('/addNote',noteControl.)
// POST - Create a note
router.put('/pushchild/:id',noteControl.pushChild)
router.post('/:id', noteControl.createNote)
    router.get('/:id',noteControl.getSingleNote)
    router.put('/:id', noteControl.updateNote)
    router.delete('/:id', noteControl.deleteNote);


export default router;
