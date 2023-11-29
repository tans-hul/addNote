import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './cards/Card'
import AddNoteChild from './AddNoteChild'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useParams, Link } from 'react-router-dom'
const NoteScreen = () => {

    const { id } = useParams();

    console.log(id)
    const [dt, setdt] = useState([])
    const [Loading, setLoading] = useState(true);
    const [error,setError] = useState(null);
    useEffect(
        () => {
            // setdt([])
            // e.preventDefault()
            setdt([])
            console.log(dt,"inside use Effect")
            const getData = async(id) =>{
                const isv = await axios.get(`http://localhost:5000/route/note/${id}`)
                // console.log(isv.data)
                var M = await isv.data.children;
                if (!M) {
                    setError("no Notes Found");
                    setLoading(false);
                    return;
                }
                
                M.map(async (noteId) => {
                    const res = await axios.get(
                        `http://localhost:5000/route/note/${noteId}`,
                    );


                    setdt(prevData => prevData.concat(res.data))
                    setLoading(false);
                })
            }
            
            getData(id);
        }

    ,[id])
    console.log(dt)
    if(Loading) return <div> Loading...
    <AddNoteChild id = {id} />
    </div>
    if(error != null) return <div>{error}
        <AddNoteChild noteId = {id} />
    </div>
    return (
        <section>
        
            <div className='child-note-list'>
                Notes
                <ul>
                    {
                        dt.map((item, index) => (
                            <Link to={`/note/${item._id}`} key = {item._id}>
                                <li key={item._id} ><Card data={item} index={index} /> </li>
                            </Link>
                        ))
                    }
                </ul>



            </div>
            <AddNoteChild noteId={id} />
        </section>

    )
}

export default NoteScreen