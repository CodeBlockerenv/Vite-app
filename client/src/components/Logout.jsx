import React from 'react'
import { BiLogOut } from "react-icons/bi";
import  Logouthook  from '../hooks/logouthook.js';

const Logout = () => {
  const {logout} = Logouthook();

  const logoutUser = () => {
     logout();
  }
  return (
    <div className='log-out' onClick={logoutUser}>
    <BiLogOut  size={24}/>
    </div>
  )
}

export default Logout