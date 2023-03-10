// import React, {useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from '../Dashboard/Dashboard';
// import AdminDashboard from "../App/Admin/AdminDashboard";
import Login from '../Login/Login'
import Home from '../Home/Home'
import Signup from "../Signup/Signup";
// import PrivateRoute from "./PrivateRoute";
import Logout from "../Logout/Logout";
import Messages from "../Messages/Messages";
import CreateMessage from "../Messages/CreateMessage";
import UpdateMessage from "../Messages/UpdateMessage";
import ViewMessage from "../Messages/ViewMessage";

const Routing = () => {
    // const [user, setUser] = useState()

    // useEffect(() => {
	
    //     const token = (localStorage.getItem('token'));
    //     if (token) {
    //      setUser(true);
    //     }
    //   },);
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login  />} />
            <Route path='/signup' element={<Signup />} />
            <Route path ='/dashboard' element={<Dashboard/>}/>
            <Route path ='/logout' element={<Logout/>}/>
            <Route path ='/messages' element={<Messages/>}/>
            <Route path ='/createMessage' element={<CreateMessage/>}/>
            <Route path ='/updateMessage' element={<UpdateMessage/>}/>
            <Route path ='/viewMessage' element={<ViewMessage/>}/>

            {/* <Route element={<PrivateRoute  />}>
                <Route path ='/dashboard' element={<Dashboard/>}/>
            <Route path ='/admindashboard' element={<AdminDashboard/>}/>
            <Route path ='/logout' element={<Logout/>}/>
            </Route> */}
        </Routes>
    );
};

export default Routing;
