import {useAuthContext} from '../../../context/AuthContext'
import React from 'react'
import useConversation from '../../../zustand/useConversation';
import { extractTime } from '../../../utils/extractTime';

const Message = ({message}) => {
    console.log(message);
    const {authUser} = useAuthContext();
    const {selectedConversation} = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt)
    const chatClassname = fromMe ? 'chat-end' : 'chat-start'
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? 'bg-blue-500':'';
    const shakeClass = message.shouldShake ? 'shake' : ""
    return (
    <div className={`chat ${chatClassname}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={`${profilePic}`} alt='hi'/>
            </div>
        </div>
        <div className={`chat-bubble text-whit ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
        <div className='chat-footer text-xs opacity-50 nflex gap-1 items-center'>{formattedTime}</div>
    </div>
    )
}

export default Message
