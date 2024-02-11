import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import toast from 'react-hot-toast';

const Logouthook = () => {
const {setAuthUser} =useContext(AuthContext);

const logout = async() => {


    try {
        const res = await fetch('/api/auth/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data =res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        localStorage.removeItem('chat-user');
        setAuthUser(null);
    } catch (error) {
        toast.error(error.message);
    }


}

return {logout};
}

export default Logouthook;