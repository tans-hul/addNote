// models/Note.js
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Note' },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
});

const Note = mongoose.model('Note', noteSchema);

export default Note;
