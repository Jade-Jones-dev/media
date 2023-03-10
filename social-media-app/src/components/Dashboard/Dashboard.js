import {useState, useEffect} from 'react'
import './Dashboard.css'
// import IsAdmin from '../Utilities/IsAdmin'

export default function Dashboard() {
	const name=localStorage.getItem('name')
	const adminValue =localStorage.getItem('isAdmin')

	const [isAdmin, setIsAdmin] =useState()
	const [messages, setMessages] = useState()
  
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
	
	return (
		<div className='dashboard-wrapper'>
			<p>Hello</p>
			{!isAdmin && (
			<>
			<h2>{name} This is a user Dashboard</h2>
			<h2>{name} isAdmin is {adminValue}</h2>
			

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
