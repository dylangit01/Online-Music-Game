import React from 'react';
import './Chat.scss';
import MessageList from './MessageList';

export default function Chat(props) {
  const { user, users, messages } = props;
  return (
    <>
      <div className='chat-layout'>
        <div className='chat-msg'>
          <MessageList messages={messages} users={users} user={user} />
        </div>
      </div>
    </>
  );
}
