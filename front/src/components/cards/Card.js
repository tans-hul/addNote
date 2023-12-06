import React, { useState, useEffect } from 'react'
import './Card.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditNote from '../EditNote';

const colors = [
  {
    primaryColor: "rgba(93, 147, 225, 1)",
    btnColor: "rgba(93, 147, 225, 0.7)",
    hoverColor: "rgba(93, 147, 225, 1)",
    shadowColor: "rgba(93, 147, 225, 0.3)",
    secondaryColor: "rgba(93, 147, 229, 0.1)",
  },
  {
    primaryColor: "hsla(16, 87%, 62%,1)",
    btnColor: "hsla(16, 87%, 62%,0.7)",
    hoverColor: "hsla(16, 87%, 62%,1)",
    shadowColor: "hsla(16, 87%, 62%,0.3)",
    secondaryColor: "hsla(16, 87%, 62%,0.09)",
  },
  {
    primaryColor: "rgba(93, 194, 80, 1)",
    btnColor: "rgba(93, 194, 80, 0.6)",
    hoverColor: "rgba(93, 194, 80, 1)",
    shadowColor: "rgba(93, 194, 80, 0.3)",
    secondaryColor: "rgba(93, 194, 80, 0.08)",
  },
  {
    primaryColor: "rgba(244, 134, 135, 1)",
    btnColor: "rgba(244, 134, 135, 0.7)",
    hoverColor: "rgba(244, 134, 135, 1)",
    shadowColor: "rgba(244, 134, 135, 0.3)",
    secondaryColor: "rgba(244, 134, 135, 0.08)",
  },
  {
    primaryColor: "rgba(185, 100, 247, 1)",
    btnColor: "rgba(177,79,243,0.8)",
    hoverColor: "rgba(177,79,243,1)",
    shadowColor: "rgba(177,79,243,0.3)",
    secondaryColor: "rgba(185, 100, 247, 0.07)",
  },
];
const Card = ({ data, index, setdt,setEnd }) => {
  const [state, setState] = useState(data);
  const [dDown, setdDown] = useState(["--"])
  // const [End, setEnd] = useState(null);

  //delete use index to change
  useEffect(() => {
    async function getDropdownArray(id) {
      const res = await axios.get(`https://unimon-add-notes.onrender.com/route/note2/getall/${id}`);
      const c = res.data.data;
      setdDown(["--"])
      c.map(async (item) => {
        setdDown(re => re.concat(item));
      })
      // setdDown(re=>[...re,res.data.data]);
    }
    getDropdownArray(data._id)
  }, [index,data._id])
  console.log(dDown);


  const OnDelete = async e => {
    try {
      e.preventDefault();
      console.log(state.parent)

      if (state.parent === null) {
        const token = localStorage.getItem("token Store");
        console.log(token);
        if (token) {
          const par = await axios.get(`https://unimon-add-notes.onrender.com/route/user/userinfo`,
            {
              headers: { Authorization: token },
            })
          var c = par.data.notes
          const elementToRemove = state._id;
          c = c.filter(item => item !== elementToRemove);
          const rem = await axios.put(`https://unimon-add-notes.onrender.com/route/user/updateUser`,


            { notes: c },
            {
              headers: { Authorization: `${token}` },
            });
          console.log(rem);

        }

        else {
          console.log("Not token found")
          return;
        }
        // Element to remove
        // console.log(par)

      }
      else {
        const par = await axios.get(`https://unimon-add-notes.onrender.com/route/note/${state.parent}`)
        // Element to remove
        console.log(par.data, 'in else consoling parent')
        var f = par.data.children
        const elementToRemove = state._id;
        console.log(elementToRemove)
        f = f.filter(item => item !== elementToRemove);
        console.log(f)
        const rem = await axios.put(`https://unimon-add-notes.onrender.com/route/note/remchild/${state.parent}`, { children: f });
        console.log(rem)
      }

      const res = await axios.delete(`https://unimon-add-notes.onrender.com/route/note/${state._id}`);
      setdt(prevItems => prevItems.filter(item => item._id !== state._id))
      console.log(res.data, "deleted state")
      // var d = res.state
      // console.log(d);
      return
    }
    catch (error) {
      console.log(error)
    }



  }
  
  async function handleEditClick(e) {
    // e.preventDefault()
    
    var myDiv = document.getElementById("edit");
    // myDiv.classList.remove("wrapper");
    myDiv.classList.remove("edit-wrapper-close");
    myDiv.classList.add("edit-wrapper");
  }

  return (
    <>
      <div
        className="card-wrapper "
        style={{ boxShadow: `0 0 0.7rem ${colors[index % 5].shadowColor}`, backgroundColor: colors[index % 5].secondaryColor }}
      >

        <div className="task-holder">
          <Link to={`/note/${state._id}`} onClick={e => {

          }
          } key={index} style={{ all: "unset", cursor: "pointer" }}>
            <span
              className="card-header"
              style={{

                backgroundColor: colors[index % 5].secondaryColor, width: '100%'

              }}
            >
              {state.title}
            </span>
          </Link>
          <select className="drop-down" onChange= {(e)=>{
                e.preventDefault()
                setEnd(e.target.value)
                console.log(e.target.value)
              }}>
            {/*to map*/}
          { 
            dDown.map((item,index)=>{
              if(index === 0)return(<option className='drop-option' value = {null} key={index}  >--</option>)
              else return<option className='drop-option' value={item._id} key={index} > {item.title}</option>

            })
          }
            
            

          </select>










        </div>
        <EditNote dat={state} setState={setState} />
        

        

      </div>
      <div className="icon-wrapper">
        <div className="delete-icon" onClick={OnDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
          </svg>
        </div>
        <div className="edit-icon" onClick={handleEditClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="26"
            height="26"
            viewBox="0 0 32 32"
          >
            <path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z"></path>
          </svg>
        </div>
        <div>
        <Link to={`/tree/${state._id}`}>
          <button className="tree-icon">
            Tree
          </button>
          </Link>
        </div>
      </div>
    </>
  );

}

export default Card