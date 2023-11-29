// components/AddNote.js
import axios from 'axios';
import React, { useState } from 'react';
 // Action to add a note

const AddNoteChild = ({noteId}) => {
    console.log(noteId)
  // const dispatch = useDispatch();
  const [note, setNote] = useState({title:"",content:""});
  if(!noteId) return <div>no note Id</div>

  const onChangeInput  = e =>{
    console.log(e.target)
    const {name,value} = e.target;
    setNote({...note, [name]:value});

}

  const handleSubmit = async (e) => {
    e.preventDefault();
    //post method
   try {
    let res = await axios.post(`http://localhost:5000/route/note/${noteId}`,{"title":note.title, "content":note.content,parent:noteId})
          
    console.log(res.data);

    let c = res;
    console.log(c);
    var child_id_data = {
        "child":c.data._id
    }
    var add_child = await axios.put(`http://localhost:5000/route/note/pushchild/${noteId}`,child_id_data)
    // const {savedNote,u} = res.data;
    // console.log(res.data)
    console.log(add_child);

    setNote({title:'', content:''});
    return;
   } catch (error) {
      console.log(error);
    return;
   }

  };


  return (
    <div className="add-note">
      <h2>Add Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name = "title"
            
            onChange = {onChangeInput}
            value={note.title}
            // onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
          name='content'
            
            // onChange={(e) => setContent(e.target.value)}
            onChange = {onChangeInput}
            value={note.content}
          />
        </div>
        <button type="submit" >Add Note</button>
      </form>
    </div>
  );
};

export default AddNoteChild;
