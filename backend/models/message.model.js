import mongoose, { Schema } from "mongoose";



const messageSchema = new mongoose.Schema({
    senderId: {
        type:Schema.Types.ObjectId,
        ref: "User"
    },
    receiverId: {
        type:Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
    },
    file: {
        filename: {
            type: String,
        },
        path: {
            type: String,
        },
        mime: {
            type: String,
        }
    }
},{timestamps: true});


const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;