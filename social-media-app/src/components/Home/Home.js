import React from "react";
import Image from './icon-above-font.png'

const Home = () => {
	return (
		<div className='home-wrapper'>
			<img className='homelogo'src={Image} alt='company logo'/>
			<p>Social Media App</p>
		</div>
	);
};

export default Home;
