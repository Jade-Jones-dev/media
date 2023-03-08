import { useState, useEffect } from "react";
import {BrowserRouter as Router} from "react-router-dom";

import Routing from "../routing/Routing";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import "./App.css";

function App() {
//   const [user, setUser] = useState();

// useEffect(() => {
//   const token = (localStorage.getItem('token'));
//   if (token) {
//    setUser(true);
//    console.log(`user is ${user}`)
//   }
// }, []);

	return (
		<Router >
			<div classname='App'>
				<Header/>
				<div>
					<Routing />
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
