import React, { useState } from 'react'
import { AvatarGenerator } from 'random-avatar-generator';
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../context/socketContext';


const Conversation = ({conversation}) => {
  const {onlineUsers} =useSocketContext();
  console.log('online users in socket', onlineUsers)
  const onlineIndicator = onlineUsers.includes(conversation._id)
  // const [selected, setSelected] = useState(false);
  const {selectedConversation,setSelectedConversation} =useConversation();
    const generator = new AvatarGenerator();
    const isSelect = selectedConversation?._id === conversation._id;
  return (
    <div  className={`convers ${isSelect? 'activeSelection' : ''}`}
    onClick={() => setSelectedConversation(conversation)}>
     <img className='avatar' 
     src={generator.generateRandomAvatar(conversation._id)} alt=""/>
     <span>{conversation.username}</span>
     <div className={onlineIndicator&&'online-indicator'}></div>
    </div>
  )
}

export default Conversation