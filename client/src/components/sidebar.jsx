import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import getConversationhook from '../hooks/getConversationhook';

const Sidebar = () => {
  const [search,setSearch] = useState('');
  const {setSelectedConversation} =useConversation();
  const {conversations} =getConversationhook();
  const handleSearch =(e)=>{
    e.preventDefault();
    if(!search) toast.error('Please enter a username');  
    console.log(conversations)
    const SearchUser = conversations.find(conversation => conversation.username.toLowerCase() === search.toLowerCase());
    if(SearchUser){
      setSelectedConversation(SearchUser);
      setSearch('');
    }
  }
  return (
    <div className='sidebar-container'>
        <form className='sidebar-search' action="" onSubmit={handleSearch}>
            <input className='sidebar-search-in' type="text" 
            value={search} onChange={e=>setSearch(e.target.value)} placeholder='Search...'/>
            <button><IoSearchSharp size={24}/></button>
        </form>
    </div>
  )
}

export default Sidebar