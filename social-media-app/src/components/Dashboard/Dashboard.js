import './Dashboard.css'
export default function Dashboard() {
	const name=localStorage.getItem('name')
	return (
		<div className='dashboard-wrapper'>
			<h2>{name} Dashboard</h2>
		</div>
	);
}
