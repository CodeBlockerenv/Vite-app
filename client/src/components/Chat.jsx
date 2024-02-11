import React, { useContext, useState } from 'react';
import { AvatarGenerator } from 'random-avatar-generator';
import { AuthContext } from '../context/authContext';
import { FaFile } from "react-icons/fa";

const Chat = ({message}) => { 
    const generator = new AvatarGenerator();
    const date = new Date(message.createdAt);
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const {authUser} =useContext(AuthContext);
    console.log('authuser',authUser._id);
    console.log('check message source',{authUser:authUser._id,sender:message.senderId})
    const from = authUser._id === message.senderId ? 'from-msg' : 'to-msg';
    console.log('message with shakclass',message);
    const shakeClass = message.shouldShake?'shake':'';
    console.log('message filename',message.file?.filename)
    const docs = [
      { uri: `http://localhost:5000/images/${message.file?.filename}` }, // Remote file
    ];
  return (
    // <div className={`-chat ${from} `}>
    //     <div className='-chat-main'>
    //       <div className='chat-top'>     
    //     <div className='chat-avatar'>
    //         <img src={generator.generateRandomAvatar(message.senderId)} alt="" />
    //     </div>
    //     <div className='chat-content'>
    //         <span>{message.message}</span>
    //     </div>
    //     </div> 
    //     <div className='time-chat'>
    //       <span>12:56</span>
    //       </div>
    //     </div>
    // </div>
    <div className={`-chat ${from} `}>
    <div className='-chat-main'>
      <div className={`chat-top ${from ==='from-msg' ? 'chat-top-right':''} `}>     
    <div className='chat-avatar'>
        <img  className='chat-pic' src={generator.generateRandomAvatar(message.senderId)} alt="" />
    </div>
    {message.message&&(<div style={from === 'to-msg' ?{backgroundColor:'gray',borderRadius:'0px 10px 10px 10px'}:null} className={`chat-content ${shakeClass}`}>
        <span>{message.message}</span>
    </div>)}
    {
      message.file&&(<div style={from === 'to-msg' ?{borderRadius:'0px 10px 10px 10px'}:null} className={`chat-file-content ${shakeClass} `}>
      <span className={message.file.mime ? 'attach-':'no-attach'}><a  download={message.file.filename} href={`http://localhost:5000/images/${message.file.filename}`}>{message.file.mime?.startsWith('image')?<img src={`http://localhost:5000/images/${message.file.filename}`} alt="" />:(<div className='attachments'><FaFile size={23}/><span>{message.file.filename}</span></div>)}</a></span>
  </div>)
    }
    {/* {
      message.file&&(<div style={from === 'to-msg' ?{borderRadius:'0px 10px 10px 10px'}:null} className={`chat-file-content ${shakeClass}`}>
      <span><a download={message.file.filename} href={`http://localhost:5000/images/${message.file.filename}`}><DocViewer documents={docs} pluginRenderers={DocViewerRenderers} /></a></span>
  </div>)
    } */}
    </div> 
    <div className={`time-chat ${from ==='from-msg' ? 'time-chat-right':''}`}>
      <span>{timeString}</span>
      </div>
    </div>
</div>

  )
}

export default Chat