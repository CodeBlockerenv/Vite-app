import React from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast';

const sendMessagehook = () => {
    const {messages,setMessages,selectedConversation} =useConversation();
    const [loading,setLoading] = React.useState(false);

    const sendMessage = async (message,files) => {
        setLoading(true);
        const formdata = new FormData();
        console.log('files before calling api',files);
        formdata.append('file',files||'');
        if (message) {
            formdata.append('message', message);
        }
        try {
            const res = await fetch(`http://localhost:5000/api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                credentials: 'include',
                body: formdata
            })
            
            const data = await res.json();
            
            
            if (data === 'Message is empty'){
                console.log('if test executed');
                throw new Error('Message is empty');
            }
            console.log('message',data);
            if (data.error) {
                throw new Error(data.error);
            }
                setMessages([...messages, data]);
                console.log('message sent successfully', messages);
            }catch (error) {
                console.log(error);
                toast.error(error.message);

            }finally{
                setLoading(false);
            }
        
    }
    return {sendMessage,loading};
}

export default sendMessagehook;