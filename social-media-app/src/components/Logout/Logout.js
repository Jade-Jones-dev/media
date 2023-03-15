import {useEffect} from "react";
import {useAuth} from "../Utilities/auth";
import {useNavigate} from "react-router";

const Logout = () => {
	const navigate = useNavigate();
	const auth = useAuth();

	useEffect(() => {
		auth.logout();
		window.localStorage.clear();
		navigate("/");
	}, [auth, navigate]);
    
	return null;
};

export default Logout;
