import{BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login'
import Home from '../Home/Home'
import Signup from "../Signup/Signup";
import Routing from '../routing/Routing';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './App.css';

function App() {
  
  return (
    <Router>
    <div classname='App'>
      
      <Header/>
     <div>
      <Routing/>
     </div>
      <Footer/>
      
    </div>
    </Router>
  );
}

export default App;
