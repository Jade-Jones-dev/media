import { useState, useEffect } from "react";
import {BrowserRouter as Router} from "react-router-dom";

import Routing from "../routing/Routing";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import "./App.css";

function App() {

	

	return (
		<Router  >
			<div className='App'>
				<Header />
				<div className="main">
					<Routing />
				</div>
			</div>
		</Router>
	);
}

export default App;
