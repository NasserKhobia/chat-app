import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../src/context/AuthContext.jsx';

const useLogin = () => {
    const[loading , setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async (username,password)=>{
        setLoading(true);
        const success = handelInputError(username,password)
        if(!success) return;
        try {
            const res = await fetch('/api/auth/login',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,password})
            })

            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }

            localStorage.setItem('chat-user',JSON.stringify(data))
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    return {loading , login}
}

export default useLogin

const handelInputError = (username , password)=>{
    if(!username || !password){
        toast.error('please fill all the fields')
        return false
    }
    return true
}