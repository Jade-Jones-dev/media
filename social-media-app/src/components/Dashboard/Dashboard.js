import {useState, useEffect} from 'react'
import './Dashboard.css'
import {useNavigate, Link} from "react-router-dom";

export default function Dashboard({user}) {
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
			<button  className='btn' onClick={handleClick}>Create message</button>
			<div className='messages'>
			{/* <button>Create message</button> */}
					{messages.map((message, index) => {
			
						return <div className='message'key={message.id}>
							<h3 >{message.title}</h3>
							<Link className='btn' to={`/viewMessage/${message.id}`} >
  view
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
