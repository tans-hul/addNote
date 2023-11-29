// controllers/noteController.js
import Note from '../models/Note.js';
import UserM from '../models/user_mode.js';
export const noteControl = {
  createParentNote : async (req,res)=>{
    try {

      const u = await res.user;
      console.log(u,"in controller")

      
      if(!u) return res.status(400).json({message: " user not found"});
      
      const { title, content } = req.body;
      
      // Create a new notew
      const newNote = new Note({ title, content });
      
      // Save the note
      const savedNote = await newNote.save();
      const us = await UserM.findById(u.id)
      console.log(savedNote._id)
      if(!us) return res.status(302).json({message:"user Not found"})
      us.notes.push(savedNote._id);
      res.status(201).json({savedNote,u});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  ,
   createNote : async (req, res) => {
    try {
      const { id } = req.params
      console.log(req.params)
      const { title, content } = req.body;

      const newNote = new Note({ title:title, content:content, parent:id });
      // Save the note
      const savedNote = await newNote.save();
      
      res.status(201).json(savedNote);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  
   ,updateNote : async (req, res) => {
      try {
        const { id } = req.params;
        const { title, content } = req.body;
    
        // Find the note by ID and update
        const updatedNote = await Note.findByIdAndUpdate(
          id,
          { title, content },
          { new: true }
        );
    
        if (!updatedNote) {
          return res.status(404).json({ message: 'Note not found' });
        }
    
        res.json(updatedNote);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
     deleteNote : async (req, res) => {
      try {
        const { id } = req.params;
    
        // Find the note by ID and delete
        const deletedNote = await Note.findByIdAndDelete(id);
    
        if (!deletedNote) {
          return res.status(404).json({ message: 'Note not found' });
        }
    
        res.json({ message: 'Note deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
     getAllNotes : async (req, res) => {
      try {
        
        const user = res.user.id;
        const u = await UserM.findById(user)
        const notes = u.notes;
        if(!notes) return res.status(402).json({message:"no notes yet"})
        console.log(notes);
        return res.send(notes);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    getSingleNote : async (req, res) => {
      try {
        const { id } = req.params;
        const note = await Note.findById(id);
    
        if (!note) {
          return res.status(404).json({ message: 'Note not found' });
        }
    
        res.status(200).json(note);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    getAllUserNotes: async(req,res)=>{
      try {
        
        const userId = res.user.id;
      
        const us = await UserM.findById(userId);
       
        var details = [];
        const ids = us.notes;
        console.log(ids)
          ids.map(async id=>{
          const d = await Note.findById(id)
          details.push(d)
        })
     
          console.log(details)
    
          
        
    
        
        return res.status(200).json({data:details})
      } catch (error) {
        return res.send(error)
      }
    },
    pushChild : async(req,res)=>{
      try {
        // console.log(req.params)
        const {id} = req.params;
        console.log(id)
      const {child} = req.body
      console.log(child)
      console.log(req.body, " in push child")
      var parent = await Note.findById(id);
      console.log(parent)
      if(!parent){
        return res.status(302).json({message:"parent not found",id:id})
      }
      var c = await Note.findById(child);
      if(!c)return res.status(302).json({message:"child not found"})
      console.log(c);
      parent.children.push(c._id);
      awaitparent.save()
      return res.status(200).json(parent);
      } catch (error) {
        res.status(400).json(error);
      }
      


    }

}
//  export { createNote, deleteNote, updateNote,getAllNotes,getSingleNote }
  
  
