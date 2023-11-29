// App.js
import React,{useState, useEffect} from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Provider } from 'react-redux';

// import thunk from 'redux-thunk';
// import rootReducer from './reducers'; // Your root reducer
// import store from './store';
import Login from './components/Login.jsx';
// Components
import axios from 'axios'
// improt Note
// import Home from './components/Home.js';
// import NoteList from './components/NoteList';
// import NoteDetails from './components/NoteDetails';
// import AddNote from './components/AddNote.js';
import Note from './components/Note.js';
// import Note from '../../backend/models/Note.js';

// const store = createStore(rootReducer, applyMiddleware(thunk)); // Create your Redux store

const App = () => {

  const [islogin, setisLogin] = useState(false)
  
  useEffect(()=>{
    async function verification(){
      console.log("in verification")
    const token =  localStorage.getItem('token Store');
    // console.log("token: " + token)
    if(token) {
      
      const isVerified =await axios.get('http://localhost:5000/route/user/verify',{
        headers:{Authorization: token}
      })
      // console.log(isVerified.data)
      setisLogin(isVerified.data)
      if(!isVerified.data){
        return localStorage.clear()
      }
      // return ()=>{};

      }
    else{
      setisLogin(false)
    }
  }
    verification();
  },[])
  return (
    
    <div className='App'>
    
     
           {
            islogin ?<Note setisLogin = {setisLogin}/>: <Login setisLogin = {setisLogin}/> 
            }
            
   
    </div>
  );
};

export default App;
