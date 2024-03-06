import Message from "../models/Message.model.js";
import Conversation from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req,res,next)=>{
    try {
        const {message} = req.body;
        console.log(message);
        const {id:reseverId} = req.params;
        const senderId = req.user._id;

        let conversation  =  await Conversation.findOne({
            participants:{
                $all : [senderId,reseverId]
            }
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId,reseverId]
            })
        }

        const newMessage = new Message({
            senderId,
            reseverId,
            message
        })
        
        if(newMessage){
            conversation.message.push(newMessage._id)
        }

        // await conversation.save();
        // await newMessage.save();

        //this is run in parallel
        await Promise.all([conversation.save(),newMessage.save()])
        
        const receiverSocketId = getReceiverSocketId(reseverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newMessage);
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("error in send message controller",error.message);
        res.status(500).json({error : "internal server error"})
    }
}

export const getMessages = async (req,res)=>{
    try {
        const {id: userToCahtId} = req.params;
        console.log(userToCahtId);
        const senderId = req.user._id;
        console.log(senderId);

        const conversation = await Conversation.findOne({
            participants: {
                $all : [senderId,userToCahtId]
            },
        }).populate('message');
        if(!conversation){
            return res.status(200).json([]);
        }
        const messages = conversation.message

        res.status(200).json(messages)
    } catch (error) {
        console.log("error in get message controller",error.message);
        res.status(500).json({error : "internal server error"})
    }
}