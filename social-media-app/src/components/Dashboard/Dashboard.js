import {useState, useEffect} from 'react'
import './Dashboard.css'

export default function Dashboard() {
	const name=localStorage.getItem('name')
	const adminValue =localStorage.getItem('isAdmin')

	const [isAdmin, setIsAdmin] =useState(false)
  

	useEffect(() => {
	  
	  const token = (localStorage.getItem('isAdmin'));
	  // const admin =(localStorage.getItem('isAdmin'))
	  // if (admin === true){
	  // 	setIsAdmin(true)
	  // }
	  // else
	  if (token === true) {
	   setIsAdmin(true);
	  }
	},);
	
	return (
		<div className='dashboard-wrapper'>
			{!isAdmin && (
			<>
			<h2>{name} Dashboard</h2>
			<h2>{name} isAdmin is {adminValue}</h2>
			</>
		)}
		{isAdmin && (
			<>
			<h2>{name}  Admin Dashboard</h2>
			<h2>{name} isAdmin is {adminValue}</h2>
			</>
		)}
			
			
		</div>
	);
}
