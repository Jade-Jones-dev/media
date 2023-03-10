import React, { useState, useEffect } from "react";

const ViewMessage = ({ id, title, body }) => {
  const [message, setMessage] = useState({});

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/messages/${id}`)
      .then((response) => response.json())
      .then((data) => setMessage(data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div>
      <h2>{message.title}</h2>
      <p>{message.body}</p>
    </div>
  );
};

export default ViewMessage;
