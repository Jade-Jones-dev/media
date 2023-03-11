import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateMessage = () => {
	const { id } = useParams();
	const [message, setMessage] = useState({});
	// const [title, setTitle] = useState("");
	// const [body, setBody] = useState("");

	useEffect(() => {
		fetch(`http://localhost:8080/api/messages/${id}`)
		  .then((response) => response.json())
		  .then((data) => setMessage(data))
		  .catch((error) => console.error(error));
	  }, [id]);

	

	const handleSubmit = (e) => {
		e.preventDefault();

		// const newMessage = {
		// 	body,
		// 	title,
		// };

		fetch(`http://127.0.0.1:8080/api/messages${id}`, {
			method: "post",
			headers: {
				"Content-type": "application/json",
			},
			// body: JSON.stringify(newMessage),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((error) => console.log(error));
	};
	return (
		<form className='signup_form' onSubmit={handleSubmit}>
            <h2>Update message</h2>
			<label>
				<p>Title</p>
				<input type='title' value={message.title} />
			</label>
			<label>
				<p>Message</p>
				<input type='text' value={message.body}  />
			</label>

			<div>
				<button type='submit' className='btn'>
					Post
				</button>
			</div>
		</form>
	);
}

export default UpdateMessage