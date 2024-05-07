// import React from 'react';
import './Home.css';
// import MenuLibrary from '../MenuLibrary';
// import MainPageContent from '../MainPageContent';
import background1 from '../../../src/images/background1.png';
import background2 from '../../../src/images/background2.png';
import background3 from '../../../src/images/background3.png';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";


function Home(){
    const sessionUser = useSelector((state) => state.session.user);
	return (
        <>
		<nav>
			<div id="homewrapper">
                <img id="backgroundimg1" src={background1} alt="backgroundimg1"/>
                <div id="hometext1"><h3>Hey there, fellow wanderer!</h3> Welcome to Traveler Note, your ultimate hub for all things travel-tastic!
                    Whether you're mapping out your next big adventure, seeking out hidden gems, or itching to swap stories
                    with fellow globetrotters, you've come to the right place!
                    <Link id="hometextlink1" to="/places" > <button>See what has been created</button> </Link>
                </div>
                <div id="hometext2">Here, the world is your playground, and the possibilities are as endless as the horizon. Share your travel plans,
                    dish out tips on must-visit destinations, or regale us with your most epic tales from the road. Let's turn those
                    wanderlust dreams into reality, one adventure at a time!
                    {sessionUser &&
                    <Link id="hometextlink2" to="/places/current" > <button>View things I have added</button> </Link>}
                </div>
                <img id="backgroundimg3" src={background3} alt="backgroundimg3"/>
                <img id="backgroundimg2" src={background2} alt="backgroundimg2"/>
                <div id="hometext3"> So grab your passport, pack your sense of adventure, and let's embark on this journey together.
                Adventure awaits!
                {sessionUser &&
                <Link id="hometextlink3" to="/places/current" > <button>Start a new plan</button> </Link>}
                {!sessionUser &&
                <Link id="hometextlink3" to="/places/current" > <button>Join Traveler Note</button> </Link>}
                </div>
			</div>
		</nav>
        </>
	)
}

export default Home;
