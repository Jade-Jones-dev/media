import { useState, useEffect } from "react";
import {BrowserRouter as Router} from "react-router-dom";

import Routing from "../routing/Routing";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import "./App.css";

function App() {
	const [user, setUser] = useState(false);
  

    useEffect(() => {
      
      getUser()
      
     },);

     function getUser(){
        const token = (localStorage.getItem('token'));
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
        console.log(user)
     },)
	

	return (
		<Router  >
			<div className='App'>
				<Header />
				<div className="main">
					<Routing user={user}/>
				</div>
			</div>
		</Router>
	);
}

export default App;
