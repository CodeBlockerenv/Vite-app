import { request } from "express";
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { receiverSocketId,io } from "../socket/socket.js";





export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const message = req.body.message || '';
        const file = req.file;

        const SenderId = req.userId.id;

        let conversation = await Conversation.findOne({
            participants: {
                $all: [SenderId, receiverId]
            }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [SenderId, receiverId]
            });
        }

        let newMessage;

        if (message.trim() === '' && file) {
            // If the message is empty but a file is present, send the file
            newMessage = new Message({
                senderId: SenderId,
                receiverId: receiverId,
                file: {
                    // Assuming 'file' contains information about the uploaded file
                    filename: file.filename,
                    path: file.path,
                    mime: file.mimetype
                    // Add other necessary file details
                }
            });
        } else if (message.trim() !== '' && !file) {
            // If the message is not empty and no file is present, send the message
            newMessage = new Message({
                senderId: SenderId,
                receiverId: receiverId,
                message: message
            });
        } else {
            // Handle the case where both message and file are empty
            return res.status(400).json('Message and file are empty');
        }

        conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiver = receiverSocketId(receiverId);
        if (receiver) {
            io.to(receiver).emit('newMessage', newMessage);
        }

        res.json(newMessage);
    } catch (error) {
        console.log(error);
        res.status(500).json('Error in sendMessage controller', error);
    }
};



export const getMessages = async(req,res)=>{
const{id:chatWithId} =req.params;
const SenderId = req.userId.id;

try{
    const conversation = await Conversation.findOne({
        participants: {
            $all: [SenderId, chatWithId]
        }
    }).populate('messages')
    if (!conversation) return res.status(200).json([]);
    res.json(conversation.messages);
}catch(error){
    console.log(error);
    res.status(500).json('error in getMessages controller',error);

}
}
