// components/AddNote.js
import axios from 'axios';
import React, { useState } from 'react';
 // Action to add a note
 import { useParams } from 'react-router-dom';

const AddNote = ({setNotelists}) => {
  // const dispatch = useDispatch();
  const [note, setNote] = useState({title:"",content:""});
  const onChangeInput  = e =>{
    console.log(e.target)
    const {name,value} = e.target;
    setNote({...note, [name]:value});

}

  const handleSubmit = async (e) => {
    // e.preventDefault();
    //post method
   try {
    const token =  localStorage.getItem('token Store');
    let res = await axios.post('http://localhost:5000/route/note/addparent',{"title":note.title, "content":note.content},
                {
                  headers:{Authorization: token}
                }
            )
    // console.log(res.data);
    // const {savedNote,u} = res.data;
    console.log(res.data)
   ///setllist is changing and showing but api call is not being made
   
    let m = await axios.put('http://localhost:5000/route/user/addnote',res.data,
    {
      headers:{Authorization: token}
    })
    
    // console.log(m);

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

export default AddNote;
