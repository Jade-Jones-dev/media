import {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";



import Header from "../Header/Header";

import Dashboard from "../Dashboard/Dashboard";
// import AdminDashboard from "../App/Admin/AdminDashboard";
import Login from "../Login/Login";
import Home from "../Home/Home";
import Signup from "../Signup/Signup";

import Logout from "../Logout/Logout";
import Messages from "../Messages/Messages";
import CreateMessage from "../Messages/CreateMessage";
import UpdateMessage from "../Messages/UpdateMessage";
import ViewMessage from "../Messages/ViewMessage";

import "./App.css";

function App() {
	const [user, setUser] = useState(false);

	useEffect(() => {
		getUser();
	},[setUser]);

	function getUser() {
		const token = localStorage.getItem("token");
		// const admin =(localStorage.getItem('isAdmin'))
		// if (admin === true){
		// 	setIsAdmin(true)
		// }
		// else
		if (token) {
			setUser(true);
		}
	}

	useEffect(() => {
		console.log(user);
	});

	return (
		<Router>
			<div className='App'>
				<Header />
				<div className='main'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
                  
						{user && (
							<>
								{/* <Route element={<PrivateRoute user={user}/>}> */}
								<Route path='/dashboard' element={<Dashboard />} />
								<Route path='/logout' element={<Logout />} />
								<Route path='/messages' element={<Messages />} />
								<Route path='/createMessage' element={<CreateMessage />} />
								<Route path='/updateMessage/:id' element={<UpdateMessage />} />
								<Route path='/viewMessage/:id' element={<ViewMessage />} />
								{/* </Route> */}
							</>
						)}
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
