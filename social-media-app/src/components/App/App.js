import {useState, useEffect} from "react";
import {Route, Routes, Navigate} from "react-router-dom";

import Header from "../Header/Header";

import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Home from "../Home/Home";
import Signup from "../Signup/Signup";
import Logout from "../Logout/Logout";
import Messages from "../Messages/Messages";
import CreateMessage from "../Messages/CreateMessage";
import UpdateMessage from "../Messages/UpdateMessage";
import ViewMessage from "../Messages/ViewMessage";
import RequireAuth from "../Utilities/RequireAuth";

import {AuthProvider} from "../Utilities/auth";

import "./App.css";

function App() {
	return (
		<div className='App'>
			<AuthProvider>
				<Header />
				<div className='main'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />

						<Route
							path='/dashboard'
							element={
								<RequireAuth>
									<Dashboard />
								</RequireAuth>
							}
						/>
						<Route
							path='/logout'
							element={
								<RequireAuth>
									<Logout />
								</RequireAuth>
							}
						/>
						<Route
							path='/messages'
							element={
								<RequireAuth>
									<Messages />
								</RequireAuth>
							}
						/>
						<Route
							path='/createMessage'
							element={
								<RequireAuth>
									<CreateMessage />
								</RequireAuth>
							}
						/>
						<Route
							path='/updateMessage/:id'
							element={
								<RequireAuth>
									<UpdateMessage />
								</RequireAuth>
							}
						/>
						<Route
							path='/viewMessage/:id'
							element={
								<RequireAuth>
									<ViewMessage />
								</RequireAuth>
							}
						/>
					</Routes>
				</div>
			</AuthProvider>
		</div>
	);
}

export default App;
