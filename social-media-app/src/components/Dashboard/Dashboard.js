import {useState, useEffect} from "react";
import "./Dashboard.css";
import { FaCheck, FaEye } from "react-icons/fa";
import {useNavigate, Link} from "react-router-dom";
// import {useAuth} from "../Utilities/auth";
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

export default function Dashboard() {
	// const auth = useAuth();
	const navigate = useNavigate();
	const name = localStorage.getItem("name");

	const [isAdmin, setIsAdmin] = useState();
	const [userId, setUserId] = useState();
	const [messages, setMessages] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [views, setViews] = useState([])

	useEffect(() => {
		const adminValue = localStorage.getItem("isAdmin");
		const isAdmin = JSON.parse(adminValue);
		setIsAdmin(isAdmin);
	}, []);

	useEffect(() => {
		const idValue = localStorage.getItem("userId");
		setUserId(idValue);
	}, []);

	function handleSubmit(e) {
		fetch(`http://127.0.0.1:8080/api/auth/deleteaccount/${userId}`, {
			method: "delete",
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error(error));
		navigate("/dashboard");
		setModalOpen(false);
	}

	useEffect(() => {
		fetchMessages();
		fetchViews();
	}, []);

	function fetchMessages() {
		fetch("http://127.0.0.1:8080/api/messages/")
			.then((response) => response.json())
			.then((data) => setMessages(data))
			.catch((error) => console.error(error));
	}

	function fetchViews(){
		fetch("http://127.0.0.1:8080/api/views/")
			.then((response) => response.json())
			.then((data) => {
				setViews(data);
				console.log(data)
			})
			.catch((error) => console.error(error));
	}

	function handleClick() {
		navigate("/createMessage");
	}

	function handleView(id){
		const user_id = parseInt(userId);
        const messageId = parseInt(id);
  
		fetch("http://127.0.0.1:8080/api/views", {
			method: "post",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({message_id: messageId, user_id: user_id}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((error) => console.log(error));
	}

	// const handlelogout = () => {
	// 	auth.logout();
	// 	navigate("/");
	// };

	return (
		<div className='dashboard-wrapper'>
			{!isAdmin && (
				<>
					
					<div className="btn-wrapper">
					{/* <p>Welcome {name}</p> */}
						<button className='btn dashboard-btn' onClick={handleClick}>
							Create message
						</button>
						{/* <button className='btn' onClick={handlelogout}>
							Logout
						</button> */}
						<button className='btn dashboard-btn' onClick={setModalOpen}>
							Delete account
						</button>
						<Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} style={customStyles}>
							<form className='signup_form'>
								<p>Are you sure you want to delete your account? you will no longer have access to the Groupmania social media app?</p>

								<div>
									<button className='btns' type='submit' onClick={(e) => handleSubmit(e)}>
										Delete account
									</button>
								</div>
							</form>
						</Modal>
					</div>

					<div className='messages'>
						{/* <button>Create message</button> */}
						{messages.map((message, index) => {
							const hasViewed = views.some((view) => view.message_id === message.id && view.user_id === parseInt(userId));
							return (
								<div className='message' key={message.id}>
									 {hasViewed && <FaCheck className="btn message-btn check"/>}
									<h3>{message.title}</h3>
									<Link className='btn message-btn' to={`/viewMessage/${message.id}`} onClick={() => handleView(message.id)}>
										<FaEye/>
									</Link>
								</div>
							);
						})}
					</div>
				</>
			)}
			{isAdmin && (
				<>
					<button className='btn' onClick={handleClick}>
						Create message
					</button>
					<div className='messages'>
						{/* <button>Create message</button> */}
						{messages.map((message, index) => {
							const hasViewed = views.some((view) => view.message_id === message.id && view.user_id === parseInt(userId));
							return (
								<div className='message' key={message.id}>
									 {hasViewed && <FaCheck className="btn message-btn"/>}
									<h3>{message.title}</h3>
									<Link className='btn message-btn' to={`/viewMessage/${message.id}`} onClick={() => handleView(message.id)}>
										<FaEye/>
									</Link>
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}
