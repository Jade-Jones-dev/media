import React, {useState}from 'react';
import {useNavigate} from "react-router-dom";

const UpdateMessage = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const newMessage = {
			body,
			title,
		};

		fetch("http://127.0.0.1:8080/api/messages", {
			method: "post",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(newMessage),
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
				<input type='title' value={title} onChange={(event) => setTitle(event.target.value)} />
			</label>
			<label>
				<p>Message</p>
				<input type='text' value={body} onChange={(e) => setBody(e.target.value)} />
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