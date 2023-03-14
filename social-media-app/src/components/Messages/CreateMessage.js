import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const CreateMessage = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [user_id, setUser_id] = useState();

	useEffect(() => {
		const id = localStorage.getItem("userId");
		// const userid= JSON.parse(id);
		console.log(`this is userid ${id}`);
		setUser_id(id);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		const newMessage = {
			user_id,
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
		navigate("/dashboard");
	};
	return (
		<form className='updatemessage' onSubmit={handleSubmit}>
			<h2>Create message</h2>
			<label>
				<p>Title</p>
				<input type='title' value={title} onChange={(event) => setTitle(event.target.value)} />
			</label>
			<label>
				<p>Message</p>
				<textarea type='text' value={body} onChange={(e) => setBody(e.target.value)} />
			</label>

			<div>
				<button type='submit' className='btn'>
					Post
				</button>
			</div>
		</form>
	);
};

export default CreateMessage;
