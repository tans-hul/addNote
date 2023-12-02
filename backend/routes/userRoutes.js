import express from 'express'
import userControl from '../controllers/userController.js'
import { auth } from '../middleware/auth.js'


const userRouter = express.Router()
userRouter.post('/register',userControl.addUser)
userRouter.post('/signin',userControl.signin)
userRouter.get('/verify',userControl.verifiedUser)
userRouter.put('/addnote',userControl.pushNotes);
userRouter.get('/userinfo',auth,userControl.getUser)
userRouter.put('/updateUser',auth,userControl.updateUser)
// userRouter.get('/verify', aut)
export default userRouter;
// userRouter.get('/g')