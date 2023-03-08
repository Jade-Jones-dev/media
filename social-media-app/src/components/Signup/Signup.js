import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Signup.css";

import background from './Abstract_blue_dark_background_02_generated.jpg'

const Signup = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");


    const handleSubmit =  (e) => {
        e.preventDefault();
    
    
        const newUser = {
          name,
          password, 
          email,
		  isAdmin: false
        }
    
        fetch('http://127.0.0.1:8080/api/auth/signup', {
          method: "post",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(newUser)
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
		navigate("/login");
        setName("");
        setPassword("");
        setEmail("");
        setConfirmPassword("")
      };

	return (
		<div className='maindiv' style={{ backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",backgroundSize:"fill" }}>
			
			<div className='signup-wrapper'>
			<h1>Please sign up</h1>
			<form onSubmit={handleSubmit}>
				<label>
					<p>Name</p>
					<input type='text' value={name} onChange={(e) => setName(e.target.value)} />
				</label>
				<label>
					<p>Email</p>
					<input type='email' value={email} onChange={(event) => setEmail(event.target.value)} />
				</label>
				<label>
					<p>Password:</p>
					<input type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
				</label>
				<label>
					<p>Confirm password</p>
					<input type='password' value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
				</label>
                <div>
                <button type='submit' className="btn">Sign up</button>
                </div>
			</form>
			</div>
	
		</div>
	);
};

export default Signup;
