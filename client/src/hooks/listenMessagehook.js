import React, { useEffect } from 'react'
import { useSocketContext } from '../context/socketContext';
import useConversation from '../zustand/useConversation';
import notificationsound from '../assets/notification.mp3';


const listenMessagehook = () => {
const {socket} = useSocketContext();
const {messages,setMessages} = useConversation();
    useEffect(() => {
        socket.on('newMessage', (newMessage) => {
            const audio = new Audio(notificationsound);
            audio.autoplay = true;
            audio.play();
            const messageWithShake = { ...newMessage, shouldShake: true };
            setMessages([...messages, messageWithShake]);
        });
       return () => socket.off('newMessage');
    }, [socket, setMessages,messages]);
}

export default listenMessagehook