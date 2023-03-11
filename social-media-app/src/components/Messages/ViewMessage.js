import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ViewMessage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState({});

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/messages/${id}`)
      .then((response) => response.json())
      .then((data) => setMessage(data))
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    console.log(`hello the id is ${id}`);
  }, [id]);

  return (
    <div className='card'>
      <h2>view message</h2>
      <h2>{message.title}</h2>
      <div className='cardtext'>{message.body}</div>
      <Link to={`/updateMessage/${message.id}`}>Update Message</Link>
    </div>
  );
};

export default ViewMessage;

