import React, { useState } from 'react'
import signuphook from '../hooks/signuphook';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Signup = () => {
  const [inputs,setInputs]=useState({
    fullname:"",
    username:"",
    password:"",
    confirmPassword:""
  })
  const {loading,signup} = signuphook();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(inputs);
    await signup(inputs);
    console.log('after calling signup hook');
  }
  return (
    <div className="auth-page-container">
    <div className='login-container'>
      <h1>Signup</h1>

      <form action="" className='login-form' onSubmit={handleSubmit} >
      <label >
          <span>Fullname</span>
        <input type="text" placeholder='Fullname' value ={inputs.fullname} onChange={e=>setInputs({...inputs,fullname:e.target.value})}/>
        </label>
        <label >
          <span>Username</span>
        <input type="text" placeholder='Username' value={inputs.username} onChange={e=>setInputs({...inputs,username:e.target.value})}/>
        </label>
        <label >
          <span>Password</span>
        <input type="text" placeholder='Password' value={inputs.password} onChange={e=>setInputs({...inputs,password:e.target.value})}/>
        </label>
        <label >
          <span>Confirm Password</span>
        <input type="text" placeholder='Password' value={inputs.confirmPassword} onChange={e=>setInputs({...inputs,confirmPassword:e.target.value})}/>
        </label>
        {loading && (
            <div className="spinner-container">
              <ClipLoader color="#36d7b7" />
            </div>
          )}

        {!loading && <button>Signup</button>}
        <span className='linktologin'>Already have an account? <span className='loglink'><Link className='link' to="/login">Login</Link></span></span>
      </form>
    </div>
    </div>
  )
}

export default Signup