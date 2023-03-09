import { useState, useEffect } from 'react';
import './Messages.css'

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch('http://127.0.0.1:8080/api/messages');
      const data = await response.json();
      const messagesWithShowMessage = data.map(message => ({...message, showMessage: false}));
      setMessages(messagesWithShowMessage);
    }
    fetchMessages();
  }, []);

  function handleClick(index) {
    const newMessages = [...messages];
    newMessages[index].showMessage = !newMessages[index].showMessage;
    setMessages(newMessages);
  }

  return (
    <div className='messages'>
      {messages.map((message, index) => (
        <div className='message' key={index} onClick={() => handleClick(index)}>
          <h2>{message.title}</h2>
          {message.showMessage && <Message message={message} />}
        </div>
      ))}
    </div>
  );
}

function Message({ message }) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setShowMessage(message.showMessage);
  }, [message]);

  function handleClick() {
    setShowMessage(!showMessage);
  }

  return (
    <div className='message'>
      <p>{showMessage ? message.body : ''}</p>
      <button className='btn'onClick={handleClick}>{showMessage ? 'Hide Message' : ' Message'}</button>
    </div>
  );
}

export default Messages;
