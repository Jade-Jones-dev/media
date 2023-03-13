import {useState, useEffect} from "react";
import "./Dashboard.css";
import {useNavigate, Link} from "react-router-dom";

export default function Dashboard({user}) {
	const navigate = useNavigate();
	const name = localStorage.getItem("name");
	const adminValue = localStorage.getItem("isAdmin");

	const [isAdmin, setIsAdmin] = useState();
	const [messages, setMessages] = useState([]);
	// const [reloadCount, setReloadCount] = useState()

	useEffect(() => {
		const adminValue = localStorage.getItem("isAdmin");
		const isAdmin = JSON.parse(adminValue);
		setIsAdmin(isAdmin);
	}, []);


	// useEffect(() => {
	// 	if(reloadCount < 2) {
	// 	  localStorage.setItem('reloadCount', String(reloadCount + 1));
	// 	  setReloadCount(reloadCount + 1);
	// 	  window.location.reload();
	// 	} else {
	// 	  localStorage.removeItem('reloadCount');
	// 	}
	//   }, [reloadCount]);

	useEffect(() => {
		fetchMessages();
	}, []);

	function fetchMessages() {
		fetch("http://127.0.0.1:8080/api/messages/")
			.then((response) => response.json())
			.then((data) => setMessages(data))
			.catch((error) => console.error(error));
	}

	function handleClick() {
		navigate("/createMessage");
	}

	return (
		<div className='dashboard-wrapper'>
			{!isAdmin && (
				<>
					<button className='btn' onClick={handleClick}>
						Create message
					</button>
					<div className='messages'>
						{/* <button>Create message</button> */}
						{messages.map((message, index) => {
							return (
								<div className='message' key={message.id}>
									<h3>{message.title}</h3>
									<Link className='btn' to={`/viewMessage/${message.id}`}>
										view
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
							return (
								<div className='message' key={message.id}>
									<h3>{message.title}</h3>
									<Link className='btn' to={`/viewMessage/${message.id}`}>
										view
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
