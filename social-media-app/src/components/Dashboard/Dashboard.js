import {useState, useEffect} from 'react'
import './Dashboard.css'
// import IsAdmin from '../Utilities/IsAdmin'

export default function Dashboard() {
	const name=localStorage.getItem('name')
	const adminValue =localStorage.getItem('isAdmin')

	const [isAdmin, setIsAdmin] =useState()
  

	useEffect(() => {
		const adminValue = localStorage.getItem('isAdmin');
		const isAdmin = JSON.parse(adminValue);
		setIsAdmin(isAdmin);
	  }, []);
	
	
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
