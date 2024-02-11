import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../context/authContext.jsx';

const signuphook = () => {
 const [loading,setLoading] =useState(false)
 const {authUser,setAuthUser} = useContext(AuthContext);
 const signup = async ({fullname,username,password,confirmPassword}) => {
  const sucess= handleErrors({fullname,username,password,confirmPassword})
  if(!sucess) return;

  setLoading(true);
  try{
  const  res = await fetch('http://localhost:5000/api/auth/signup',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    credentials:'include',
    body:JSON.stringify({fullname,username,password,confirmPassword})
  })
  const data = await res.json();
  if(data){
    toast.success('Account created successfully')
    setLoading(false);
    console.log('response from signup hook',data);
    localStorage.setItem('chat-user',JSON.stringify(data.username));
    setAuthUser(data);

  }
 }catch(err){
  toast.error('Error occured while user signup')
  console.log(err);
 }finally{
  setLoading(false);
 }
 }
 return { loading, signup };
}

export default signuphook;


function handleErrors({fullname,username,password,confirmPassword}){
  if(!fullname || !username || !password || !confirmPassword){
    toast.error('Please fill in all the fields')
    console.log('error in toast')
    return false;
  }

  if (password !== confirmPassword) {
    toast.error('Passwords do not match')
    return false;
    
  }

  return true;
}