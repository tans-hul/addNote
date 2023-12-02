// controllers/noteController.js
import Note from '../models/Note.js';
import UserM from '../models/user_mode.js';
import mongoose from 'mongoose';
// Importing the Note model
export const noteControl = {
  createParentNote: async (req, res) => {
    try {

      const u = await res.user;
      console.log(u, "in controller")


      if (!u) return res.status(400).json({ message: " user not found" });

      const { title, content } = req.body;

      // Create a new notew
      const newNote = new Note({ title, content });

      // Save the note
      const savedNote = await newNote.save();
      const us = await UserM.findById(u.id)
      console.log(savedNote._id)
      if (!us) return res.status(302).json({ message: "user Not found" })
      us.notes.push(savedNote._id);
      res.status(201).json({ savedNote, u });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  ,
  createNote: async (req, res) => {
    try {
      const { id } = req.params
      console.log(req.params)
      const { title, content } = req.body;

      const newNote = new Note({ title: title, content: content, parent: id });
      // Save the note
      const savedNote = await newNote.save();

      res.status(201).json(savedNote);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  , updateNote: async (req, res) => {
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

  deleteNote: async (req, res) => {
    try {
      const { id } = req.params;

      // Find the note by ID and delete
      
      const deleteNoteAndChildren = async (noteId) => {
        try {
          // Find the note by its ID
          const note = await Note.findById(noteId);

          // If the note doesn't exist, return
          if (!note) {
            return;
          }
      
          // Recursively delete children
          for (const childId of note.children) {
            await deleteNoteAndChildren(childId);
          }
      
          // Delete the note
          await Note.findByIdAndDelete(noteId);
      
      
        } catch (error) {
          console.error('Error deleting note and children:', error);
          throw error;
        }
      };
      const deletedNote = await deleteNoteAndChildren(id);
      if (!deletedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }

      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  ,

  getAllNotes: async (req, res) => {
    try {

      const user = res.user.id;
      const u = await UserM.findById(user)
      const notes = u.notes;
      if (!notes) return res.status(402).json({ message: "no notes yet" })
      console.log(notes);
      return res.send(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSingleNote: async (req, res) => {
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
  getAllUserNotes: async (req, res) => {
    try {

      const userId = res.user.id;

      const us = await UserM.findById(userId);

      var details = [];
      const ids = us.notes;
      console.log(ids)
      ids.map(async id => {
        const d = await Note.findById(id)
        details.push(d)
      })

      console.log(details)





      return res.status(200).json({ data: details })
    } catch (error) {
      return res.send(error)
    }
  },
  pushChild: async (req, res) => {
    try {
      // console.log(req.params)
      const { id } = req.params;
      console.log(id)
      const { child } = req.body
      console.log(child)
      console.log(req.body, " in push child")
      var parent = await Note.findById(id);
      
      console.log(parent)
      if (!parent) {
        return res.status(302).json({ message: "parent not found", id: id })
      }
      var c = await Note.findById(child);
      if (!c) return res.status(302).json({ message: "child not found" })
      console.log(c);
      parent.children.push(c._id);
      await parent.save()
      return res.status(200).json(parent);
    } catch (error) {
      res.status(400).json(error);
    }



  },
  notesOfaUser: async (req, res) => {
    var user = res.user;
    let rarray = [];
    console.log(user.id , " in note of allUsers")
    const temp_user = await UserM.findById(user.id).exec();
    console.log(temp_user)

    // Recursive function to fetch all children until leaf nodes
    async function fetchAllChildren(noteId, allChildren = []) {

      const note = await Note.findById(noteId).exec();
      if (!note) {
        return allChildren;
      }

      allChildren.push(note);

      // Recursively fetch children
      for (const childId of note.children) {
        await fetchAllChildren(childId, allChildren);
      }

      return allChildren;
    }

    // Example usage: Fetching all children of a specific note
    console.log(temp_user.notes[0])
    for (const c in temp_user.notes){
      // const mar = 
      console.log(c,"insied for loop")
      // rarray.push(temp_user.notes[c]);
      const noteIdToFetch = temp_user.notes[c] // Replace with the ID of the note you want to start from

      await fetchAllChildren(noteIdToFetch)
        .then((allChildren) => {

          // console.log('All children:', allChildren);
          // allChildren.forEach((ch) => {
          //   rarray.push(ch);
          //   console.log(ch);
          // })
          // console.log("rarray: ",rarray)
          rarray.push(...allChildren)

          // Do whatever you want with the fetched notes
        })
        .catch((err) => {
          console.error('Error fetching children:', err);
        });
    }
    console.log(rarray);
    return res.status(200).json({data:rarray});
  }

}
//  export { createNote, deleteNote, updateNote,getAllNotes,getSingleNote }


