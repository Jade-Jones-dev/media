import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateMessage = () => {
	const { id } = useParams();
	const [message, setMessage] = useState({});
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	useEffect(() => {
		fetch(`http://localhost:8080/api/messages/${id}`)
		  .then((response) => response.json())
		  .then((data) => {
			setMessage(data);
			setTitle(data.title);
			setBody(data.body);
		  })
		  .catch((error) => console.error(error));
	  }, [id]);

	

	const handleSubmit = (e) => {
		e.preventDefault();
	
		fetch(`http://127.0.0.1:8080/api/messages/${id}`, {
			method: "put",
			headers: {
				"Content-type": "application/json",
			},
			 body: JSON.stringify({id, body, title}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((error) => console.log(error));
			console.log(id, body, title)
	};
	return (
		<form className='updatemessage' >
            <h2>Update message</h2>
			<label>
				<p>Title</p>
				<input type='title' defaultValue={title} onChange={(event) => setTitle(event.target.value)}/>
			</label>
			<label>
				<p>Message</p>
				<textarea type='text' defaultValue={body} onChange={(event) => setBody(event.target.value)} />
			</label>

			<div>
				<button type='submit' onClick={handleSubmit} className='btn'>
					Post
				</button>
			</div>
		</form>
	);
}

export default UpdateMessage