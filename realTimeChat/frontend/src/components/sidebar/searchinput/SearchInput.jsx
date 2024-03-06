import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import useGetConversation from '../../../../hooks/useGetConversation';
import useConversation from '../../../zustand/useConversation';
import toast from 'react-hot-toast';


const SearchInput = () => {
    const [search,setSearch] = useState("");
    const {setSelectedConversation } =useConversation();
    const {conversation} = useGetConversation();
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!search) return;
        if(search.length<3){
            return toast.error('search term must be at least 3 charactars long')
        }
        const findconversation = conversation.find((c)=> c.fullname.toLowerCase().includes(search.toLowerCase()));
        if(findconversation){
            setSelectedConversation(findconversation)
            setSearch("")
        }else{
            toast.error('no user find')
        }
    }
    return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <input type="text" placeholder="Search ..." value={search} onChange={(e)=>{setSearch(e.target.value)}} className='input input-bordered rounded-full'/>
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <IoSearch className='w-6 h-6 outline-none'/>
        </button>
    </form>
    )
}

export default SearchInput





// import React from 'react'
// import { IoSearch } from "react-icons/io5";


// const SearchInput = () => {
//     return (
//     <form className='flex items-center gap-2'>
//         <input type="text" placeholder="Search ..." className='input input-bordered rounded-full'/>
//         <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
//             <IoSearch className='w-6 h-6 outline-none'/>
//         </button>
//     </form>
//     )
// }

// export default SearchInput
