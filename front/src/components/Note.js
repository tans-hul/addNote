import React, { useEffect, useState } from "react";
import AddNote from "./AddNote";
import EditNote from "./EditNote";
import "./Note.css";
import NoteScreen from "./NoteScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "./cards/Card";





function ParentNote({Notelists}) {
  return (
    <section>
    <div className='child-note-list'>
          Notes
          <ul>
          {
            Notelists.map((item,index) =>(
              <Link to={`/note/${item._id}`}>
              <li key = {item._id} ><Card data={item} index ={index}/> </li>
              </Link>
            ))
          }
</ul>

          

        </div>
      </section>
  )
}

const Note = ({ setisLogin }) => {
  const logoutSubmit = async (req, res) => {
    localStorage.clear();
    setisLogin(false);
  };
   

  var [Notelists, setNotelists] = useState([]);
  var [details, setdetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(
    () => async () => {
      try {
        console.log(loading)

        const token = localStorage.getItem("token Store");

        if (token) {
          const isv = await axios.get(
            "http://localhost:5000/route/user/userinfo",
            {
              headers: { Authorization: token },
            },
          ).then(
            (isv)=>{
              console.log(isv);
              // const NoteDetails = [];
              var data = isv.data.notes;
    
              data.map(async (noteId) => {
                const res = await axios.get(
                  `http://localhost:5000/route/note/${noteId}`,
                );
                
    
                setNotelists(prevData => [...prevData, res.data])
                
                

                // details.push(res.data);
                // console.log(details)
                // setdetails(NoteDetails,console.log(details));
                
              });
              setLoading(!loading)
              console.log(loading)

              // console.log(Notelists.ata);
              const entries = Object.keys(Notelists.at());
              console.log(entries)
              // setdetails(Notelists);
              // console.log(details);
            }
           
          );

          
        
          

        // const ap = await axios.get(`http://localhost:5000/route/note/allUserNotes`,{
        //           headers: { Authorization: token },
        //         },)
        //         console.log(ap);

        }

        // console.log(details)
      } catch (error) {
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }

      // setNotelists(fetch_details())
      // return;
    },
    [],
  );

  
  
  if (loading)return (<div>Loading....</div>) // Display a loading message or spinner
  

  return (
    <div>
      Note Component
      <section>
        <h1>
          Notes
          
          <ul>
            <li>
              <Link to='/' /> Home
            </li>
          </ul>
        </h1>
      </section>
      {/* <section>
        <div className='child-note-list'>
          Notes
          <ul>
          {
            Notelists.map((item,index) =>(
              <Link to={`/note/${item._id}`}>
              <li key = {item._id} ><Card data={item} index ={index}/> </li>
              </Link>
            ))
          }
</ul>

          

        </div>
      </section> */}
      <Routes>
        <Route path = '/' element = {<ParentNote Notelists={Notelists}/>}/>
        <Route path='/edit/:id' element={<EditNote />} />
        <Route path='/note/:id' element={<NoteScreen  />}  />
      </Routes>
      <AddNote />
      <section>
        <Link
          to='/'
          onClick={() => {
            logoutSubmit();
          }}>
          {" "}
          Logout
        </Link>
      </section>
    </div>
  );
};

export default Note;