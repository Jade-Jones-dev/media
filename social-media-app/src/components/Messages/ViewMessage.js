import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ViewMessage = () => {
  const navigate = useNavigate();
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

  function handleDelete(){
    fetch(`http://127.0.0.1:8080/api/messages/${id}`, {
      method : "delete"
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
      navigate('/dashboard')    
  }

 

  return (
    <div className="viewMessage">
      <div className='card'>
      <h2>{message.title}</h2>
      <div className='cardtext'>{message.body}</div>
      <div className="buttons">
      <Link className='btns' to={`/updateMessage/${message.id}`}>Edit</Link>
      <button className="btns">Like</button>
      <button className="btns">Comment</button>
      <button className="btns" onClick={handleDelete}>Delete</button>
      </div>
      
    </div>
    </div>
    
  );
};

export default ViewMessage;

