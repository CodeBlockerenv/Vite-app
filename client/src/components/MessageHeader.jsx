import React from 'react'
import useConversation from '../zustand/useConversation';

const MessageHeader = () => {
  const {selectedConversation} = useConversation();
  return (
    <div className='message-header-contain'>
        <span className='to'>To: <span className='to-name'>{selectedConversation.fullname}</span></span>
    </div>
  )
}

export default MessageHeader