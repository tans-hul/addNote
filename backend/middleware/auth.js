// import jwt from "jsonwebtoken"
import jwt from "jsonwebtoken";



export const auth = async(req,res,next)=>{
    // console.log("user")
    try {
        const token = req.header("Authorization")
        if(!token)  return res.status(400).json({message: "Invalid Auth"})

        jwt.verify(token,"secretKey",(err,user)=>{

            if(err) return res.status(400).json({
                message:"Auth not valid",
            })
            // console.log(user)

            res.user = user
  
        })
        next()
        
    } catch (error) {
        res.status(400).json({message: " error in auth", err: error})
        
    }

}