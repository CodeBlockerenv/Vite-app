import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const getConversationhook = () => {
 const [loading,setLoading] = useState(false);
 const [conversations,setConversations] = useState([]);
 console.log('getConversationshook called');
 useEffect(()=>{
    console.log('getConversationshook useffect called');
    const getConversations = async () => {
        console.log('getConversations called');
        setLoading(true);
        try{
            const res = await fetch('http://localhost:5000/api/users',{
                method:'GET',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                }
            }
            )
            const data = await res.json();
            console.log(data);
            if(data.error){
                throw new Error(data.error);
            }
            return setConversations(data);
    }catch(error){
        console.log(error);
        toast.error(error.message);
    
    }finally{
        setLoading(false);
    }
    }
    getConversations();
 },[])
 return {loading,conversations};
}

export default getConversationhook;