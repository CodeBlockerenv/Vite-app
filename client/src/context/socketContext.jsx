import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client';
import { AuthContext } from "./authContext";


const socketContext = createContext();

export const useSocketContext = () => {
	return useContext(socketContext);
};


export const SocketContextProvider = ({ children }) => {
    const [socket,setSocket] =useState();
    const [onlineUsers,setOnlineUsers] =useState([]);
    const {authUser} = useContext(AuthContext);
    useEffect(() => {
    if (authUser){
        const socket = io('http://localhost:5000', {
            query: {
                userId: authUser._id
            },
        });
        console.log('connect to socket')
        setSocket(socket);

        socket.on('getUsers',(users)=>{
            setOnlineUsers(users);
        })

        
    } else {
        if (socket) {
            socket.close();
            setSocket(null);
        }
    }  }, [authUser]);   
        return (
            <socketContext.Provider value={{socket,onlineUsers}}>
                {children}
            </socketContext.Provider>
        );
}