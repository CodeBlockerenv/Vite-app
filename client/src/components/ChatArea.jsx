import React, { useEffect, useRef } from 'react'
import Chat from './Chat'
import getMessageshook from '../hooks/getMessageshook';
import listenMessagehook from '../hooks/listenMessagehook';

const ChatArea = () => {
  listenMessagehook();
  const {messages,loading} =getMessageshook();
  const latestMessageRef = useRef();
  console.log('conversations btw users',messages)
  useEffect(() => {
    latestMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  return (
    <div className='chats-container'>
      <div className='scrollable-container'>
      {messages.length>0 &&
        messages.map(message => (
          <div key={message._id}  ref={latestMessageRef}>
          <Chat  message={message}/>
          </div>
        ))
      }
      {/* <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/> */}
      </div>
    </div>
  )
}

export default ChatArea