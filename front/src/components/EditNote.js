import React, { useState } from 'react'
import axios from 'axios'
import './editnote.css'
// import { useParams } from 'react-router-dom'
function EditNote({ dat ,setState}) {
  console.log(dat)
  // const req = useParams()
  // const {id} = req.params
  const id = dat._id
  const [note, setNote] = useState({
    title: dat.title,
    content: dat.content
  });
  const onChangeInput = e => {
    console.log(note)
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });

  }
  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      let m = await axios.put(`https://unimon-add-notes.onrender.com/route/note/${id}`, note)
      // setState({...data,{title:note.title,content:note.content}})
      console.log(m)
      const newState = {...note};
      newState.title = note.title
      newState.content =note.content;
      setState(newState)
      return;

    }
    catch (error) {
      console.log(error);
      return;
    }




  }
  function handleClick(e) {
    // e.preventdefault()
    var myDiv = document.getElementById("edit")
    myDiv.classList.add("edit-wrapper-close");
  }

  return (
    <div className="edit-wrapper-close" id="edit">
      <div className="edit-note">
        <div className="edit-heading">
          <h2>Update Note</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="closebtn"
            onClick={handleClick}
          >
            <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
          </svg>
        </div>

        <form >
          <div>
            {/* <label>Title:</label> */}
            <input
              className="title-main"
              type="text"
              name="title"
              placeholder="title:"
              onChange={onChangeInput}
              value={note.title}
              // onChange={(e) => setTitle(e.target.value)}
            />
          </div>
         
          <button type="button" className="addnote-btn" onClick={async()=>{
            await handleSubmit();
            await handleClick();
            }} >
            Update
          </button>
        </form>
      </div>
        
    </div>
  )
}

export default EditNote