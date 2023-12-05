// components/AddNote.js
import axios from 'axios';
import "./addnote.css"
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
    e.preventDefault();

    //post method
   try {
    const token =  localStorage.getItem('token Store');
    let res = await axios.post('http://localhost:5000/route/note/addparent',{"title":note.title, "content":note.content},
                {
                  headers:{Authorization: token}
                }
            )
    console.log(res.data , "inside Add Parent note")

    // console.log(res.data);
    // const {savedNote,u} = res.data;
    setNotelists(prevdata => [...prevdata,res.data.savedNote])
   ///setllist is changing and showing but api call is not being made
   
    let m = await axios.put('http://localhost:5000/route/user/addnote',res.data,
    {
      headers:{Authorization: token}
    })
    
    // console.log(m);

    setNote({title:'', content:''});
    var myDiv = document.getElementById("cross");
    // myDiv.classList.remove("wrapper");
    myDiv.classList.add("wrapper-close");
    return;
   } catch (error) {
      console.log(error);
    return;
   }

  };
  function handleClick(){
    var myDiv = document.getElementById("cross");
    // myDiv.classList.remove("wrapper");
    myDiv.classList.add("wrapper-close");
    }


  return (
    <div className='wrapper-close' id='cross'>
    <div className="add-note">
      <div className='heading'>
      <h2>Add Note</h2>
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24" className='closebtn' onClick={handleClick} >
<path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
</svg>
      </div>
      
      
      <form onSubmit={handleSubmit} >
        <div>
          {/* <label>Title:</label> */}
          <input className='title-main'
            type="text"
            name = "title"
            placeholder='title:'
            onChange = {onChangeInput}
            value={note.title}
            // onChange={(e) => setTitle(e.target.value)}
          />
        </div>
       
        <button className='addnote-btn' onClick = {handleClick} type="submit" >Add Note</button>
      </form>
    </div>
    </div>
  );

};

export default AddNote;
