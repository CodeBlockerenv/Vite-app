import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const getMessageshook = () => {
const [loading,setLoading] = useState(false);
const {messages,selectedConversation,setMessages} = useConversation();

useEffect(()=>{
    console.log('getMessageshook called');
    const getMessages = async () => {
        console.log('getMessages called');
        setLoading(true);
       console.log('selected user', selectedConversation._id)
        try{
            const res = await fetch(`/api/messages/${selectedConversation._id}`,{
                method:'GET',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data = await res.json();
            console.log('msg btw 2 user',data);
            if (data.error) throw new Error(data.error);
				setMessages(data);
        }catch(error){
            toast.error(error.message);
}
    }
    if(selectedConversation?._id)  getMessages();
},[selectedConversation?._id,setMessages])

return {loading,messages}
}

export default getMessageshook