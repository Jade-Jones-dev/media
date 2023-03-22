import React, {useState, useEffect} from "react";
import { FaHome, FaList } from 'react-icons/fa';
import { AiOutlineLogin, AiOutlineLogout} from "react-icons/ai";
import { MdAssignmentAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {NavLink} from "react-router-dom";
import "./Navbar.css";


const NavBar = () => {	
	const navigate = useNavigate()
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
			<NavLink to='/' className='navlink'><p className="desktop">Home</p><FaHome className="mobile"/></NavLink>
			{!user && (
				<>
					<NavLink to='/login' className='navlink'><p className="desktop">Login</p><AiOutlineLogin className="mobile"/></NavLink>
					<NavLink to='/signup' className='navlink'><p className="desktop">Login</p><MdAssignmentAdd className="mobile"/></NavLink>
				</>
			)}
			{user && (
				<>
					<NavLink to='/dashboard' className='navlink'><p className="desktop">Dashboard</p><FaList className="mobile"/></NavLink>
          <NavLink to='/logout' className='navlink'> <p className="desktop">Logout</p><AiOutlineLogout className="mobile"/></NavLink>
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
