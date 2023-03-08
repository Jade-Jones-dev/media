import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import background from './download.jpeg'

import "./Login.css";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		return () => {
			setIsMounted(false);
		};
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		fetch("http://127.0.0.1:8080/api/auth/login", {
			method: "post",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({email, password}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error("Login failed");
				}
			})
			.then((data) => {
				if (isMounted) {
					localStorage.setItem("token", data.token);
					localStorage.setItem("userId", data.userId);
					localStorage.setItem("isAdmin", data.isAdmin);
					localStorage.setItem("name", data.name);
					console.log(data.token, data.userId, data.isVolunteer, data.name);
					navigate("/dashboard");
					setPassword("");
					setEmail("");
					setErrorMessage("");
				}
			})
			.catch((error) => {
				console.log(error);
				setErrorMessage("Invalid email or password");
			});
	};

	return (
		<div className="maindiv" style={{ backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
		<div className='login-wrapper'>
		<form onSubmit={handleSubmit}>
			<h1>Login</h1>
			<label>
				<p>Email</p>
				<input type='email' value={email} onChange={(event) => setEmail(event.target.value)} />
			</label>
			<label>
				<p>Password</p>
				<input type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
			</label>
			{errorMessage && <p className='error'>{errorMessage}</p>}
			<div>
				<button className='btn' type='submit'>Log in</button>
			</div>
		</form>
	</div>
		</div>
		
	);
};

export default Login;
