import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SelectDates from './SelectDates.js'
const Tree = ({endId}) => {
    const  {id} = useParams()
    const [arr,setArr] = useState([])
    const token = localStorage.getItem("token Store");

    useEffect(()=>{
        async function getData(id,endId){
            const res = await axios.get(`http://localhost:5000/route/tree/data/${id}/${endId}`,
                {
                    headers: { Authorization: token },
                  }
            );
            const array = res.data;
            console.log(array)
            await setArr([]);
            array.map( async (item,index)=>{
                const r = await axios.get(`http://localhost:5000/route/note/${item}`)
                console.log(r.data);
                setArr( p =>p.concat(r.data));
            });
            
    }
    getData(id,endId)

},[id])
    console.log(arr);

  return (
    <div className ="tree-screen-wrapper">
        {arr.map((item,index)=>
       {return ( <SelectDates dat = {item} index = {index}/>)
        })}
    </div>
  )
}

export default Tree