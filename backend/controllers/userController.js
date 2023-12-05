import User from "../models/user_mode.js";
import Note from "../models/Note.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth.js";
 const userControl = { 
addUser :async (req,res)=>{
  
    try {

    const {
        username,
        password,
    } = req.body;
    const u =await User.findOne({username:username})
    if(u) return res.status(400).json({message:"username already exists"})
    const hashedPass = await bcrypt.hash(password,10)
    const user = new User({username:username, password:hashedPass, notes:[]});
    const newUser = await user.save();
    return res.json({message: "register User", newUser : newUser})
    } catch (error) {
        s
        return res.status(500).json({
            message:"Error in addUser",
            err:error
        })
        
    }


},
 signin : async(req,res)=>{
    try {
        console.log(req.body)
        const {username,password}  = req.body;
        const u = await User.findOne({username: username});
        if(!u) return res.status(400).json({message: "User not found"});
        
        const isMatch = await bcrypt.compare(password ,  u.password)
        if(!isMatch) return res.status(302).json({message: "Password doesn't match"})
        //if login success
        const payload = {id:u._id , username : u.username}
        const token =  jwt.sign(payload,"secretKey",{expiresIn:'1d'});
      
    return res.json({message: "signin user", token:token})

        
    } catch (error) {
        return res.status(500).json({
            message:"Error in sigin",
            err:error
        })
    }
}

,  verifiedUser: async( req , res)=>{
    try {
        // console.log(req)
        const token =await req.header("Authorization");
        console.log(token, " in verified user")
        if(!token) return res.send(false)
        jwt.verify(token,"secretKey",async (err, verified)=>{
    
    if(err) {
        console.log(err)
        return res.send(false)
    }
    const u = await User.findById(verified.id)
    console.log(u)
    if(!u) return res.send(false)
        return res.send(true)

    })
    } catch (error) {
        return res.status(400).json({message:"error in verified user", error: error})
        
    }

},
pushNotes:async (req, res)=>{
    try {
        console.log(req.body , " backend")
        const {savedNote,u} = req.body;
    const parent_u = await User.findById(u.id);
    if(!parent_u) return res.send(400).json({message:"user not found"})
    parent_u.notes.push(savedNote._id)
console.log(parent_u)
await parent_u.save()
    } catch (error) {
        return res.send(error);
        
    }
    
},
updateUser:async (req,res)=>{
    try {
        
        const id = res.user.id;
        const user = await User.findByIdAndUpdate(id,req.body);
        console.log(req.body)
        await user.save();
        res.send(user);
    } catch (error) {
        return res.send(error)
    }

}
,
getUser: async (req,res)=>{
    try {
        const id = await res.user.id;
        const user = await User.findById(id)
        if(!user) return res.send("user not found");
        console.log(user)
        return res.send(user);
    } catch (error) {
        return res.send(error)
    }

    
}

}
export default userControl
