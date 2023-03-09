import {useState, useEffect} from 'react';

import React from 'react'

const Messages = () => {
    const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch('http://127.0.0.1:8080/api/messages');
      const data = await response.json();
      setMessages(data);
    }
    fetchMessages();
  }, []);

  function handleClick(index) {
    const newMessages = [...messages];
    newMessages[index].showMessage = !newMessages[index].showMessage;
    setMessages(newMessages);
  }

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index} onClick={() => handleClick(index)}>
          <h2>{message.title}</h2>
          {message.showMessage && <Message text={message.text} />}
        </div>
      ))}
    </div>
  );
}

function Message({ text }) {
  const [showMessage, setShowMessage] = useState(true);

  function handleClick() {
    setShowMessage(!showMessage);
  }

  return (
    <div>
      <p>{showMessage ? text : ''}</p>
      <button onClick={handleClick}>{showMessage ? 'Hide Message' : 'Show Message'}</button>
    </div>
  );
}


export default Messages