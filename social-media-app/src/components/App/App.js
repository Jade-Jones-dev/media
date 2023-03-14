import {useState, useEffect} from "react";
import {Route, Routes, Navigate} from "react-router-dom";

import Header from "../Header/Header";

import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Home from "../Home/Home";
import Signup from "../Signup/Signup";
import PrivateRoute from "../routing/PrivateRoute";
import Logout from "../Logout/Logout";
import Messages from "../Messages/Messages";
import CreateMessage from "../Messages/CreateMessage";
import UpdateMessage from "../Messages/UpdateMessage";
import ViewMessage from "../Messages/ViewMessage";

import "./App.css";

function App() {
	

	return (
		<div className='App'>
			<Header />
			<div className='main'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route element={<PrivateRoute />}>
						<Route path='/dashboard' element={<Dashboard/>} />
						<Route path='/logout' element={<Logout />} />
						<Route path='/messages' element={<Messages />} />
						<Route path='/createMessage' element={<CreateMessage />} />
						<Route path='/updateMessage/:id' element={<UpdateMessage />} />
						<Route path='/viewMessage/:id' element={<ViewMessage />} />
					</Route>
					
				</Routes>
			</div>
		</div>
	);
}

export default App;
