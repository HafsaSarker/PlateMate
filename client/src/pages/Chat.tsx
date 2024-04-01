import React, { useEffect, useContext } from 'react';
import io, { Socket } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import ChatBox from '../components/Chat/ChatBox';
import ChatList from '../components/Chat/ChatList';

import { UserContext } from '../context/UserContext';
import { UserContextType } from '../types/userContextType';

import { ChatContext } from '../context/ChatContext';
import { ChatContextType } from '../types/chatContextType';


const Chat: React.FC = () => {
  const { currUser } = useContext(UserContext) as UserContextType;
  const { setCurrPartner } = useContext(ChatContext) as ChatContextType;

  const location = useLocation();


  // if from home page, get chat partner id from state
  useEffect(() => {
    if(location.state?.user) {
      setCurrPartner(location.state.user);
    }
  }, [location.state]);



  // ensures currentUser exists
  if (currUser === null) {
    return <></>;
  }
  return (
    <div className='flex w-screen h-full overflow-hidden'>
      <ChatList/>
      <ChatBox/>
    </div>
  );
}

export default Chat;
