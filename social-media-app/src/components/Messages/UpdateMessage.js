import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";

const UpdateMessage = () => {
	const navigate = useNavigate();
	const {id} = useParams();
	const [message, setMessage] = useState({});
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [file, setFile] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		fetch(`http://localhost:8080/api/messages/${id}`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
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
		const formData = new FormData();
		formData.append("image", file); 
		formData.append("id", id);
		formData.append("title", title);
		formData.append("body", body);

		const token = localStorage.getItem("token");

		fetch(`http://127.0.0.1:8080/api/messages/${id}`, {
			method: "put",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				navigate(`/viewMessage/${id}`);
			})
			.catch((error) => console.log(error));
	};
	return (
		<div className='form_pages'>
			<form className='updatemessage'>
				<h2>Update message</h2>
				<label>
					<p>Title</p>
					<input type='title' defaultValue={title} onChange={(event) => setTitle(event.target.value)} />
				</label>
				<label>
					<p>Message</p>
					<textarea type='text' defaultValue={body} onChange={(event) => setBody(event.target.value)} />
				</label>
				<label>
				<p>Image</p>
				<input type="file" onChange={(e) => setFile(e.target.files[0])} />
			</label>
				<div>
					<button type='submit' onClick={handleSubmit} className='btn'>
						Post
					</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateMessage;
