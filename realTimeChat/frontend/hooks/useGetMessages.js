import { useEffect, useState } from "react";
import useConversation from "../src/zustand/useConversation"
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading ,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation}= useConversation();
    useEffect(()=>{
        const getMessage = async()=>{
            setLoading(true)
            try {
                const res = await fetch(`/api/message/${selectedConversation._id}`);
                console.log('you in get message');
                const data = await res.json();
                console.log(data);
                if(data.error){
                    throw new Error(data.error)
                }
                setMessages(data)
                
                console.log(messages);
            } catch (error) {
                toast.error(error.message)
            }finally{
                setLoading(false)
            }
        }
        if(selectedConversation?._id) getMessage();
    },[selectedConversation?._id,setMessages]);
    return {messages,loading}
}

export default useGetMessages
