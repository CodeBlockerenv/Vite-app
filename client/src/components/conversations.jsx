import React, { useEffect } from 'react'
import Conversation from './conversation'
import getConversationhook from '../hooks/getConversationhook'
import { useSocketContext } from '../context/socketContext';

const Conversations = () => {
  const {loading,conversations} =getConversationhook();
  console.log('conversations',conversations);
  console.log('loading',loading);
  return (
    <div className='conversations'>
      <div className='scrollable-container'>
        {loading && (
            <div className='spinner-container'>
                <div className="loading-spinner"></div>
            </div>
        )}
        {conversations.map(conversation => (
            <Conversation key={conversation._id} conversation={conversation}/>
        ))}
        {/* <Conversation/>
        <Conversation/>
        <Conversation/>
        <Conversation/>
        <Conversation/>
        <Conversation/>
        <Conversation/>
        <Conversation/> */}
        </div>
    </div>
  )
}

export default Conversations