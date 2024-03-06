import React from 'react'
import SearchInput from './searchinput/SearchInput'
import Conversations from './conversation/Conversations'
import LogOutButton from './logout/LogOutButton'

const Sidebar = () => {
    return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <SearchInput/>
        <div className='divider px-3'></div>
        <Conversations/>
        <LogOutButton/>
    </div>
    )
}

export default Sidebar
