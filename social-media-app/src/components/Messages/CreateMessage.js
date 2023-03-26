import React, {useState, useEffect} from "react";
import {json, useNavigate} from "react-router-dom";

const CreateMessage = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [user_id, setUser_id] = useState();
	const [file, setFile] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	
	useEffect(() => {
		const id = localStorage.getItem("userId");
		console.log(`this is userid ${id}`);
		setUser_id(id);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("image", file); 
		formData.append("user_id", user_id);
		formData.append("title", title);
		formData.append("body", body);

		const token = localStorage.getItem('token');
		fetch("http://127.0.0.1:8080/api/messages", {
			
			method: "post",
			headers: {
			
				"Authorization": `Bearer ${token}`
			},
			body:formData
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((error) => console.log(error));
		navigate("/dashboard");
	};

	return (
		<div className="form_pages">
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
			<label>
				<p>Image</p>
				<input type="file" onChange={(e) => setFile(e.target.files[0])} />
			</label>		
			<div>
				<button type='submit' className='btn'>
					Post
				</button>
			</div>
		</form>
		</div>
	);
};

export default CreateMessage;
