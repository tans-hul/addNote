import React, { useState } from 'react'
import axios from 'axios'
import './login.css'

const Login = ({setisLogin}) => {
    const [user, setuser] = useState({
        username: '',
        password: '',
    })
    const [err,setErr] = useState('');

    const onChangeInput  = e =>{
        console.log(e.target)
        const {name,value} = e.target;
        setuser({...user, [name]:value});
        setErr('')
    }



    const registerSubmit = async e =>{
        // e.preventDefault();
        try {
            let res = await axios.post('https://unimon-add-notes.onrender.com/route/user/register',{
                username:user.username,
                password : user.password
            })
            setErr(res.data.message)
            // loginSubmit()
            setuser({username:"", password: ""})
        } catch (error) {
            error.response.data.message && setErr(error.response.data.message)
        }
    }


    const loginSubmit = async e =>{
        // e.preventDefault();
        try {
            let res = await axios.post('https://unimon-add-notes.onrender.com/route/user/signin',{
                username:user.username,
                password : user.password
            })
            setuser({username:"", password: ""})
            console.log(res.data)
            localStorage.setItem("token Store" , res.data.token)
            setisLogin(true)
            setErr(res.data.message)
        } catch (error) {
            error.response.data.message && setErr(error.response.data.message)
            
        }
    }
    return (
        <>
        {/* <section>
            <div className='login'>
                <h2>Login</h2>
                <form onSubmit={loginSubmit}>
                    <input type='text' name="username" placeholder='Username' id="login-username" required value={user.username} 
                        onChange = {onChangeInput}
                    />

                    <input type="password" name="password" placeholder='password' id="login-password" required value={user.password} autoComplete='true'
                        onChange = {onChangeInput}
                     />


                    <button type='submit'> Login </button>

                    <p>
                        You don't have an account
                    </p>
                    <span> Register Now</span>

                </form>
            </div>
            <div className='Register'>
                <h2>Register</h2>
                <form  onSubmit={registerSubmit}>
        

                    <input  name="username" placeholder='Username' id="signup-username" required value={user.username} 
                        onChange = {onChangeInput}

                    />

                    <input type="password" name="password" placeholder='password' id="signup-password" required value={user.password} autoComplete='true' 
                        onChange = {onChangeInput}

                    />
                    


                    <button type='submit'> Login </button>

                    <p>
                        You have an account
                 
                    <span> Sign in </span>
                    </p>
                    <h3> {err} </h3>
                </form>
            </div>
        </section> */}

<form className="form">
<p id="heading">Login</p>
<div className="field">
<svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
<path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
</svg>
  <input autoComplete="off" placeholder="Username" name="username" className="input-field" type="text" onChange = {onChangeInput}/>
</div>
<div className="field">
<svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
</svg>
  <input placeholder="Password" className="input-field"  name="password" type="password"   onChange = {onChangeInput} />
</div>
<div className="btn">
<button type= 'button' className="button1" onClick={()=>loginSubmit()}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
<button type = 'button' className="button2" onClick={()=>registerSubmit()}>Sign Up</button>
</div>
{/* <button className="button3">Forgot Password</button> */}
</form>
</>
    )
}

export default Login