import './Dashboard.css'
export default function Dashboard() {
	const name=localStorage.getItem('name')
	const isAdmin=localStorage.getItem('isAdmin')
	return (
		<div className='dashboard-wrapper'>
			<h2>{name} Dashboard</h2>
			<h2>{name} isAdmin is {isAdmin}</h2>
		</div>
	);
}
