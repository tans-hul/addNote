// models/Note.js
import mongoose from 'mongoose';

const User = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique : true
  },
  password:{
    type:String,
    required: true,
  },
  notes:[{type:mongoose.Schema.Types.ObjectId,
ref:"Note"}] 
  
});

const UserM = mongoose.model('User', User);

export default UserM;
