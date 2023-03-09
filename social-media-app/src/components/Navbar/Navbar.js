import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {NavLink} from "react-router-dom";
import "./Navbar.css";


const NavBar = () => {	const navigate = useNavigate()
  const [user, setUser] = useState();
  const [isAdmin, setIsAdmin] =useState()
  

  useEffect(() => {
	
	const token = (localStorage.getItem('token'));
	// const admin =(localStorage.getItem('isAdmin'))
	// if (admin === true){
	// 	setIsAdmin(true)
	// }
	// else
    if (token) {
     setUser(true);
    }
  },);

	return (
		<nav className='navbar'>
			<NavLink to='/' className='navlink'>Home</NavLink>
			{!user && (
				<>
					<NavLink to='/login' className='navlink'>Login</NavLink>
					<NavLink to='/signup' className='navlink'>Signup</NavLink>
				</>
			)}
			{user && (
				<>
					<NavLink to='/dashboard' className='navlink'>Dashboard</NavLink>
          <NavLink to='/logout' className='navlink'> Logout</NavLink>
				</>
			)}
			{/* {isAdmin && (
				<>
				<NavLink to='/admindashboard' className='navlink'>admindashboard</NavLink>
				<NavLink to='/logout' className='navlink'> Logout</NavLink>
				</>
			)} */}
		</nav>

		// <nav className='navbar'>
		//         <NavLink className='navlink' to='/'>Home</NavLink>

		//             <>
		//                 <NavLink className='navlink'  to='/login'>Login</NavLink>
		//                 <NavLink className='navlink'  to='/signup'>Signup</NavLink>
		//             </>

		//     </nav>
	);
};

export default NavBar;
