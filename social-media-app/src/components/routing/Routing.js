import React, {useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from '../Dashboard/Dashboard';
import AdminDashboard from "../App/Admin/AdminDashboard";
import Login from '../Login/Login'
import Home from '../Home/Home'
import Signup from "../Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import Logout from "../Logout/Logout";

const Routing = () => {

    const [user, setUser] = useState()

    useEffect(() => {
	
        const token = (localStorage.getItem('token'));
        if (token) {
         setUser(true);
        }
      },);
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login  />} />
            <Route path='/signup' element={<Signup />} />
            <Route path ='/dashboard' element={<Dashboard/>}/>
            <Route path ='/logout' element={<Logout/>}/>
            {/* <Route element={<PrivateRoute  />}>
                <Route path ='/dashboard' element={<Dashboard/>}/>
            <Route path ='/admindashboard' element={<AdminDashboard/>}/>
            <Route path ='/logout' element={<Logout/>}/>
            </Route> */}
        </Routes>
    );
};

export default Routing;
