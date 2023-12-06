import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './cards/Card'
import AddNoteChild from './AddNoteChild'
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import './addnotechild.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
const NoteScreen = ({setEnd}) => {

    const { id } = useParams();
    console.log(id)
    const [dt, setdt] = useState([])
    const [Loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(
        () => {
            // setdt([])
            // e.preventDefault()
            console.log(dt, "inside use Effect")
            const getData = async (id) => {
                const isv = await axios.get(`https://unimon-add-notes.onrender.com/route/note/${id}`)
                // console.log(isv.data)
                var M = await isv.data.children;
                if (!M) {
                    setError("no Notes Found");
                    setLoading(false);
                    return;
                }
                setdt(() => [])

                M.map(async (noteId) => {
                    const res = await axios.get(
                        `https://unimon-add-notes.onrender.com/route/note/${noteId}`,
                    );


                    setdt(prevData => prevData.concat(res.data))
                    setLoading(false);
                })
            }

            getData(id);
            if (dt == []) {
                setError("empty array")
                setLoading(false)
            }
        }

        , [id, Loading])



    console.log(dt)


    function handleClick() {
        var myDiv = document.getElementById("plus-child");
        myDiv.style.display = "flex";
    }

    if (Loading) return (<div> Loading...
        <AddNoteChild noteId={id} setdt={setdt} />
    </div>)
    if (error !== null) return (<div>{error}
        <AddNoteChild noteId={id} setdt={setdt} />
    </div>
    )
    return (

        <section className="notescreen-wrapper">
            <button type="button" className="back-button" onClick={() => {
                navigate(-1);
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 24" height="24" width="14"><path stroke-linejoin="round" stroke-linecap="round" stroke-width="3" stroke="#000" d="M12 2L2 12L12 22"></path></svg>
            </button>
            {/* {id} */}

            <div className='child-note-list-child'>

                <ul>
                    {
                        dt.map((item, index) => (

                            <li key={item._id} ><Card data={item} index={index} setisInside={true} setdt={setdt} setEnd={setEnd} /> </li>

                        ))
                    }
                </ul>



            </div>
            <div className="plusbtn-child" onClick={handleClick} >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 40 40" id="plus">
                    <path fill="#98ccfd" d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z"></path><path fill="#4788c7" d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z"></path><g><path fill="#fff" d="M30 18L22 18 22 10 18 10 18 18 10 18 10 22 18 22 18 30 22 30 22 22 30 22z"></path></g>
                </svg>
            </div>
            <AddNoteChild noteId={id} setdt={setdt} />

        </section>

    )
}

export default NoteScreen