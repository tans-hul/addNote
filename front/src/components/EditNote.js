import React,{useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
function EditNote() {
  const req = useParams()
  const {id} = req.params
  const [data,setData] = useState({
    title:"",
    content:""
  })
  const getdata= async(id)=>{
    const  abs = await axios.get(`http://localhost:5000/route/note/${id}`);
    setData ({
      title:abs.data.title,
      content:abs.data.content
    })
  }

  const [note, setNote] = useState(data);
  const onChangeInput  = e =>{
    console.log(e.target)
    const {name,value} = e.target;
    setNote({...note, [name]:value});

}
  const handleSubmit = async (e)=>{
    e.preventdefault();
    
    try{
      let m = await axios.put(`http://localhost:5000/route/note/${id}`,note)

      return;
    }
    catch(error){
      console.log(error);
      return;
    }




  }

  return (
    <div className="add-note">
    <h2>Edit Note</h2>
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
      <button type="submit" >save Note</button>
    </form>
  </div>
  )
}

export default EditNote