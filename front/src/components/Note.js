import React, { useEffect, useState } from "react";
import AddNote from "./AddNote";
import EditNote from "./EditNote";
import "./Note.css";
import NoteScreen from "./NoteScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "./cards/Card";
import TreePage from "./Tree/TreePage.js"
import Navbar from "./Navbar.js"



function ParentNote({Notelists,setisInside}) {
  
  
  console.log(Notelists)
  return (
    
    <section>
    <div className='child-note-list'>
        
          <ul>
          {
            Notelists.map((item,index) =>(
             
              <li key = {item._id} ><Card data={item} index ={index} setisInside = {setisInside}/> </li>
     
            ))
          }
</ul>

          

        </div>
      </section>
  )
}

const Note = ({ setisLogin }) => {
  const logoutSubmit = async () => {
    localStorage.clear();
    setisLogin(false);
  };
   

  var [Notelists, setNotelists] = useState([]);
  var [isInside, setisInside] = useState(false);
  console.log(isInside)
  // var [details, setdetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(
    () => async () => {
      try {
        // console.log(loading)

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
              var data = isv.data.notes;
              data.map(async (noteId) => {
                const res = await axios.get(
                  `http://localhost:5000/route/note/${noteId}`,
                );
                setNotelists(prevData => [...prevData, res.data])
                console.log(res.data, " inside the map")

                console.log(Notelists, " in maps of notes")
              });
              setLoading(false)
              console.log(loading)
              const entries = Object.keys(Notelists.at());
              console.log(entries, "values in entries")
              console.log(Notelists, " after useEffect call");
            }
          );
        }

        // console.log(details)
      }
      catch (error) {
        setError(error);
        
        setLoading(false);
      
      }finally {
        setLoading(false);
      }
    },
    [],
  );

  
  
  if (loading)return (<div>Loading....</div>) // Display a loading message or spinner
  // if(error)return <div> {erro}</div>
  function handleClick(){
    var myDiv = document.getElementById("cross");
    // myDiv.classList.remove("wrapper");
    myDiv.classList.remove("wrapper-close");
    myDiv.classList.add("wrapper");

  }

  return (
    <div className = "home">
    <Navbar/>

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
        <Route path = '/' exact element = {<ParentNote Notelists={Notelists} setisInside = {setisInside}/>}/>
        <Route path='/Tree' exact element={<TreePage />} />
        <Route path='/note/:id' exact element={<NoteScreen  />}  />
        <Route path='/edit/:id' exact element={<EditNote/>}  />

      </Routes>
      <AddNote isInside = {isInside} setNotelists={setNotelists}/>
      <section>
        <Link className="logoutbtn" 
          to='/'
          onClick={() => {
            logoutSubmit();
          }}>
          {" "}
          Logout
        </Link>
      </section>
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 40 40" className="plusbtn" id="plus" onClick={handleClick}>
<path fill="#98ccfd" d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z"></path><path fill="#4788c7" d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z"></path><g><path fill="#fff" d="M30 18L22 18 22 10 18 10 18 18 10 18 10 22 18 22 18 30 22 30 22 22 30 22z"></path></g>
</svg>
      </div>


    </div>
  );
};

export default Note;