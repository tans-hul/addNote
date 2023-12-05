// components/AddNote.js
import axios from 'axios';
import React, { useState } from 'react';
import './addnotechild.css'
// import './addnote.css'
 // Action to add a note

const AddNoteChild = ({noteId, setdt}) => {
    console.log(noteId)
  // const dispatch = useDispatch();
  const [note, setNote] = useState({title:"",content:""});

  const onChangeInput  = e =>{
    console.log(note)
    const {name,value} = e.target;
    setNote({...note, [name]:value});

}

  const handleSubmit = async (e) => {
    e.preventDefault();
    //post method
   try {
    let res = await axios.post(`http://localhost:5000/route/note/${noteId}`,{"title":note.title, "content":note.content,parent:noteId})
          
    console.log(res.data , " in Add NOte child");

    let c = res;
    // console.log(c);
    var child_id_data = {
        "child":c.data._id
    }
    var add_child = await axios.put(`http://localhost:5000/route/note/pushchild/${noteId}`,child_id_data)
    // const {savedNote,u} = res.data;
    // console.log(res.data)
    console.log(add_child," add child");
    setdt(prevData => [...prevData,res.data])

    setNote({title:'', content:''});
    return;
   } catch (error) {
      console.log(error);
    return;
   }

  };
  function close() {
    var myDiv = document.getElementById("plus-child");
    myDiv.style.display="none";  
  }
  


  return (
    <div className='addNoteChild-wrapper' id = 'plus-child'>
        <div className="add-note-child">
        <div className="addChild-crossbtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="closebtn"
            onClick={close}
          >
            <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
          </svg>
        </div>

      <h1>Add Note</h1>
      <form onSubmit={handleSubmit}>
        <div>
  
          <input
            type="text"
            name = "title"
            placeholder = "Title"
            className = "title-area-child"
            onChange = {onChangeInput}
            value={note.title}
            // onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-note-child-btn-wrapper">
            <button className="add-note-child-btn" type="submit">
              Add Note
            </button>
          </div>

      </form>


    </div>
    </div>

  );
};

export default AddNoteChild;
