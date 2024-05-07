// import React from 'react';
import './Home.css';
// import MenuLibrary from '../MenuLibrary';
// import MainPageContent from '../MainPageContent';
import background1 from '../../../src/images/background1.png';
import background2 from '../../../src/images/background2.png';
import background3 from '../../../src/images/background3.png';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import SignupFormModal from '../SignupFormModal';

function Home(){
    const sessionUser = useSelector((state) => state.session.user);
	return (
        <>
		<nav>
			<div id="homewrapper">
                <img id="backgroundimg1" src={background1} alt="backgroundimg1"/>
                <p id="hometext1"><h3>Hey there, fellow wanderer!</h3> Welcome to Traveler Note, your ultimate hub for all things travel-tastic!
                    Whether you are mapping out your next big adventure, seeking out hidden gems, or itching to swap stories
                    with fellow globetrotters, you have come to the right place! <br></br>
                    <Link to="/places" > <button id="hometextlink1">See what has been created</button> </Link>
                </p>
                <p id="hometext2">Here, the world is your playground, and the possibilities are as endless as the horizon. Share your travel plans,
                    dish out tips on must-visit destinations, or regale us with your most epic tales from the road. Let us turn those
                    wanderlust dreams into reality, one adventure at a time! <br></br>
                    {sessionUser &&
                    <Link to="/places/current" > <button id="hometextlink2">View things I have added</button> </Link>}
                </p>
                <img id="backgroundimg3" src={background3} alt="backgroundimg3"/>
                <img id="backgroundimg2" src={background2} alt="backgroundimg2"/>
                <p id="hometext3"> So grab your passport, pack your sense of adventure, and let us embark on this journey together.
                Adventure awaits! <br></br>
                {sessionUser &&
                <Link to="/plans/new" > <button id="hometextlink3">Start a new plan</button> </Link>}
                {!sessionUser &&
                <div>
                    <button id="hometextsignup">
                    <OpenModalMenuItem
                    itemText="Join Traveler Note"
                    modalComponent={<SignupFormModal />}
                    />
                    </button>
                </div>}
                </p>
			</div>
		</nav>
        </>
	)
}

export default Home;
