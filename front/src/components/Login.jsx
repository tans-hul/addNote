import React, { useState } from 'react'
import axios from 'axios'
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
        e.preventDefault();
        try {
            let res = await axios.post('http://localhost:5000/route/user/register',{
                username:user.username,
                password : user.password
            })
            setuser({username:"", password: ""})
            setErr(res.data.message)
        } catch (error) {
            error.response.data.message && setErr(error.response.data.message)
            
        }
    }


    const loginSubmit = async e =>{
        e.preventDefault();
        try {
            let res = await axios.post('http://localhost:5000/route/user/signin',{
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
        <section>
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
        </section>
    )
}

export default Login