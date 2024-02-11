import React, { useContext, useEffect, useState } from 'react';
import MessageHeader from './MessageHeader';
import ChatArea from './ChatArea';
import MessageFooter from './MessageFooter';
import { TiMessages } from 'react-icons/ti';
import { AuthContext } from '../context/authContext';
import useConversation from '../zustand/useConversation';

const MessageContainer = () => {
  const {authUser} =useContext(AuthContext);
  console.log('authuser msgcontainer',authUser)
  const [nochatSelected, setNoChatSelected] = useState(true);
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    //unmounts or clean function after login to remove selection
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);
  return (
    <div className='message-container'>
      {!selectedConversation ? (
        <NoChatSelected user={authUser} />
      ) : (
        <div className='message-container1'>
          <div className='messageheader'>
            <MessageHeader />
          </div>
          <div className='message-Area'>
            <ChatArea />
          </div>
          <div className='msg-foot'>
          <MessageFooter />
          </div>
        </div>
      )}
    </div>
  );
};

const NoChatSelected = ({user}) => {
  return (
    <div className='no-chat-selected'>
      <p>Welcome {user.username}</p>
      <p>Select a chat to start messaging</p>
      <TiMessages size={40}/>
    </div>
  );
};

export default MessageContainer;
