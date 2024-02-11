import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import loginhook from '../hooks/loginhook'
import { ClipLoader } from 'react-spinners';

const Login = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const loginUser = async(e) => {
    e.preventDefault();
    await login({username,password});
  }
  const {loading,login} = loginhook();
  return (
    <div className='auth-page-container' >
    <div className='login-container'>
      <h1>Login</h1>

      <form action="" className='login-form' onSubmit={loginUser}>
        <label >
          <span>Username</span>
        <input type="text" placeholder='Username' onChange={e=>setUsername(e.target.value)}/>
        </label>
        <label >
          <span>Password</span>
        <input type="text" placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
        </label>
        {loading && (
            <div className="spinner-container">
              <ClipLoader color="#36d7b7" />
            </div>
          )}

        {!loading && <button>Login</button>}
        <span className='linktologin'>Don't have an account? <span className='loglink'><Link className='link' to="/signup">Signup</Link></span></span>
      </form>
    </div>
    </div>
  )
}

export default Login