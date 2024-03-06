import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useAuthContext } from '../src/context/AuthContext';

const useSignUp = () => {
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const SignUp = async ({fullname,username,password,confirmPassword,gender})=>{
        const success = handelInputError({fullname,username,password,confirmPassword,gender})
        if(!success) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup",{
                method:"POST",
                headers:{'Content-Type':"application/json"},
                body: JSON.stringify({fullname,username,password,confirmPassword,gender})
            })

            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            //localstorage 
            localStorage.setItem('chat-user',JSON.stringify(data));
            setAuthUser(data)
        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    }
    return {loading ,SignUp}
}

const handelInputError = ({fullname,username,password,confirmPassword,gender})=>{
    if(!fullname || !username || !password || !confirmPassword || !gender){
        toast.error('please fill all the fields')
        return false
    }
    if(password !== confirmPassword){
        toast.error('the password and confirmpassword is not mautch')
        return false
    }
    if(password.length < 6 ){
        toast.error('the password must be at least 6 character')
        return false
    }

    return true
}

export default useSignUp
