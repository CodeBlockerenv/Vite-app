import React from 'react'
import './Home.css';
import Sidebar from '../components/sidebar';
import Conversations from '../components/conversations';
import Logout from '../components/Logout';
import MessageContainer from '../components/MessageContainer';

const Home = () => {
  return (
    <div className='home'>
        <div className="home-components">
        <div className='sidebar-all'>
        <Sidebar/>
        <div className="divider"></div>
        <Conversations/> 
        <Logout/>
        </div>
        <div className="divider-y"></div>
        <div className='MessageArea'>
         <MessageContainer />
        </div>
        </div>
    </div>
  )
}

export default Home