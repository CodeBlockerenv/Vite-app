import React, { useRef, useState } from 'react';
import { BsSend } from "react-icons/bs";
import sendMessagehook from '../hooks/sendMessagehook';
import { MdAttachFile } from "react-icons/md";

const MessageFooter = () => {
  const fileRef =useRef();
  const [message,setMessage] = useState('');
  const [files,setFiles] = useState([]);
  const {loading,messages,sendMessage} =sendMessagehook();

  const sendFile = (e)=>{
    e.preventDefault();
    const file = e.target.files[0];
    console.log('before sending file',file)
    setFiles(file)

  }
  const handleSendMessage =async(e) =>{
    e.preventDefault();
    await sendMessage(message,files);
    setMessage('');
  }

  return (
    <div className="message-footer">
      <form action="" onSubmit={handleSendMessage}>
      <input ref={fileRef} className='file-inp' type="file" onClick={e=>e.target.value=null} onChange={sendFile}/>
      <div onClick={()=>fileRef.current.click()} className='file-but'><MdAttachFile size={18}/></div>
      <input type="text" value={message} onChange={e=>setMessage(e.target.value)}/>
      <button><BsSend size={18}/></button>
      </form>
    </div>
  )
}

export default MessageFooter