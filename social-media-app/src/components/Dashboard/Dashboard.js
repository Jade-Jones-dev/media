import {useState, useEffect} from 'react'
import './Dashboard.css'
import {useNavigate, Link} from "react-router-dom";

export default function Dashboard() {
	const navigate = useNavigate()
	const name=localStorage.getItem('name')
	const adminValue =localStorage.getItem('isAdmin')

	const [isAdmin, setIsAdmin] =useState()
	const [messages, setMessages] = useState([])
  
	useEffect(() => {
		const adminValue = localStorage.getItem('isAdmin');
		const isAdmin = JSON.parse(adminValue);
		setIsAdmin(isAdmin);
	  }, []);

	//   useEffect(() => {
	// 	fetch("http://127.0.0.1:8080/api/auth/login")
	// 	  .then((response) => response.json())
	// 	  .then((data) => setMessages(data))
	// 	  .catch((error) => console.error(error));
	//   }, []);


		  useEffect(() => {
			fetchMessages();
		}, []);

		useEffect(() => {
			console.log(messages);
		}, [messages]);
	
		function fetchMessages() {
			fetch("http://127.0.0.1:8080/api/messages/")
		  .then((response) => response.json())
		  .then((data) => setMessages(data))
		  .catch((error) => console.error(error));
		}

		function handleClick(){
			navigate('/createMessage')
		}
	
	return (
		<div className='dashboard-wrapper'>
			{!isAdmin && (
			<>
			<button onClick={handleClick}>Create message</button>
			<div className='messages'>
			{/* <button>Create message</button> */}
					{messages.map((message, index) => {
						const {id, title, body} = message;
						return <div className='message'key={id}>
							<h3 >{title}</h3>
							<Link to={`/viewMessage/${id}`} id={id} title={title} body={body}>
  <button className='btn'>view</button>
</Link>

							
						</div>

					})}
				


			</div>

			</>
		)}
		{isAdmin && (
			<>
			<h2>{name} This is an Admin Dashboard</h2>
			<h2>{name} isAdmin is {adminValue}</h2>
			</>
		)}
			
			
		</div>
	);
}
