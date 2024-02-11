import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext';
import toast from 'react-hot-toast';

const loginhook = () => {
 const [loading,setLoading] =useState(false);
 const {setAuthUser} = useContext(AuthContext);

 const login = async({username,password}) => {
   const success= handleErrors({username,password});

   if(!success) return;
   setLoading(true);
    try{
        const res = await fetch('http://localhost:5000/api/auth/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify({username,password})
        })
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        localStorage.setItem('chat-user',JSON.stringify(data));
        console.log('response from login hook',data);
        setAuthUser(data);
    }catch(err){
        console.log(err);
        toast.error(err.message);
    }finally{
        setLoading(false);
    }
 }

 return {login,loading}
}

export default loginhook;


function handleErrors({username,password}){
    if(!username || !password){
      toast.error('Please fill in all the fields')
      console.log('error in toast')
      return false;
    }
    return true;
  }