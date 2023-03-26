import React, {useState, useEffect} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import Modal from "react-modal";
const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		backgroundColor: "white",
		width: 400,
		height: 250,
	},
};

const ViewMessage = () => {
	const navigate = useNavigate();
	const {id} = useParams();

	const [message, setMessage] = useState({});
	const [modalOpen, setModalOpen] = useState(false);
	const [body, setBody] = useState("");
	const [isAdmin, setIsAdmin] = useState();
	const [user_id, setUser_id] = useState();
	const [message_id, setMessage_id] = useState();
	const [messageUserId, setMessageUserId] = useState();
	const [comments, setComments] = useState([]);
	const [likes, setLikes] = useState([]);
	const [isCreator, setIsCreator] = useState(false);
	const [selectedCommentBody, setSelectedCommentBody] = useState("");

	const handleCommentClick = (commentId) => {
		fetch(`http://127.0.0.1:8080/api/comment/${commentId}`)
			.then((response) => response.json())
			.then((data) => {
				setSelectedCommentBody(data.body);
				console.log(`This is data ${data.body}`);
			});

		setModalOpen(true);
	};

	useEffect(() => {
		fetch(`http://127.0.0.1:8080/api/comment?message_id=${id}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to retrieve comments");
				}
				return response.json();
			})
			.then((data) => {
				setComments(data);
			})
			.catch((error) => console.error(error));
	}, [id]);

	useEffect(() => {
		fetch(`http://127.0.0.1:8080/api/likes?message_id=${id}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to retrieve likes");
				}
				return response.json();
			})
			.then((data) => {
				setLikes(data);
			})
			.catch((error) => console.error(error));
	}, [id]);

	useEffect(() => {
		const adminValue = localStorage.getItem("isAdmin");
		const isAdmin = JSON.parse(adminValue);
		setIsAdmin(isAdmin);
	}, []);

	useEffect(() => {
		const theuser = localStorage.getItem("userId");
		setUser_id(theuser);
	}, []);

	useEffect(() => {
		setMessage_id(id);
	}, [id]);

	const token = localStorage.getItem('token')

	useEffect(() => {
		fetch(`http://127.0.0.1:8080/api/messages/${id}`,
		{
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}
		)
			.then((response) => response.json())
			.then((data) => {
				setMessage(data);
				setMessageUserId(data.user_id.toString());
			})
			.catch((error) => console.error(error));
	}, [id]);

	useEffect(() => {
		if (messageUserId === user_id) {
			setIsCreator(true);
		} else {
			setIsCreator(false);
		}
	}, [messageUserId, user_id]);

	function handleDelete() {

		const token = localStorage.getItem('token');
		fetch(`http://127.0.0.1:8080/api/messages/${id}`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
				"Authorization": `Bearer ${token}` 
			  },
		})

			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error(error));
		navigate("/dashboard");
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	function handleSubmit() {
		fetch("http://127.0.0.1:8080/api/comment", {
			method: "post",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({message_id, body, user_id}),
		})
			.then((res) => res.json())
			.then((data) => data)
			.catch((error) => console.log(error));
		setModalOpen(false);
	}

	function handleDeleteComment(commentId) {
		fetch(`http://127.0.0.1:8080/api/comment/${commentId}`, {
			method: "delete",
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error(error));
	}

	function handleEditComment(e, commentId) {
		e.preventDefault();

		fetch(`http://127.0.0.1:8080/api/comment/${commentId}`, {
			method: "put",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({body: selectedCommentBody}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => console.log(error));
		setModalOpen(false);
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	function handleLike(){
		const userId = parseInt(user_id);
        const messageId = parseInt(message_id);
  
		fetch("http://127.0.0.1:8080/api/likes", {
			method: "post",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({message_id: messageId, user_id: userId}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setLikes([...likes, data]); 
			})
			.catch((error) => console.log(error));
	}

	return (
		<div className='form_pages'>
			<div className='card'>
				<h2>{message.title}</h2>
				<p>{likes.length} likes</p>
				<img src={message.imageUrl} alt='message'/>
				<div className='cardtext'>{message.body}</div>
				<div className='buttons'>
					{isAdmin || isCreator ? (
						<>
							<Link className='btns btn-new' to={`/updateMessage/${message.id}`}>
								Edit
							</Link>
							<button className='btns' onClick={handleDelete}>
								Delete
							</button>
						</>
					) : null}
					<button className='btns'onClick={()=>handleLike(user_id, message_id)}>Like </button>
					<button className='btns' onClick={setModalOpen}>
						Comment
					</button>
					<Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} style={customStyles}>
						<form className='signup_form'>
							<label>
								<p>Comment</p>
								<textarea type='text' defaultalue={body} onChange={(e) => setBody(e.target.value)} />
							</label>

							<div>
								<button className='btns' type='submit' onClick={(e) => handleSubmit(e)}>
									Post comment
								</button>
							</div>
						</form>
					</Modal>
				</div>
				<div className='comments'>
				{comments.map((comment) => {
					return (
						<div className='comment' key={comment.id}>
							<p>{comment.body}</p>
							{(isAdmin || comment.user_id.toString() === user_id) && (
								<div>
									<button className='btns' onClick={() => handleCommentClick(comment.id)}>
										Edit
									</button>
									<Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} style={customStyles}>
										<form className='signup_form'>
											<label>
												<p>Edit Comment</p>
												<textarea type='text' defaultValue={selectedCommentBody} onChange={(e) => setSelectedCommentBody(e.target.value)} />
											</label>
											<div>
												<button className='btns' type='submit' onClick={(e) => handleEditComment(e, comment.id)}>
													Edit
												</button>
											</div>
										</form>
									</Modal>
									<button className='btns new-button' onClick={() => handleDeleteComment(comment.id)}>
										Delete
									</button>
								</div>
							)}
						</div>
					);
				})}
			</div>
			</div>
			
		</div>
	);
};

export default ViewMessage;
