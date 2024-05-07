// import React from 'react';
import './Home.css';
// import MenuLibrary from '../MenuLibrary';
// import MainPageContent from '../MainPageContent';
import background1 from '../../../src/images/background1.png';
import background2 from '../../../src/images/background2.png';
import background3 from '../../../src/images/background3.png';

function Home(){
	return (
        <>
		<nav>
			<div id="homewrapper">
                <img id="backgroundimg1" src={background1} alt="backgroundimg1"/>
                <p id="hometext1"><h3>Hey there, fellow wanderer!</h3> Welcome to Traveler Note, your ultimate hub for all things travel-tastic!
                    Whether you're mapping out your next big adventure, seeking out hidden gems, or itching to swap stories
                    with fellow globetrotters, you've come to the right place!
                    {/* <button id="hometextbutton1">View All Plans</button>
                    <button id="hometextbutton2">View All Places</button>
                    <button id="hometextbutton3">View All Stories</button> */}
                </p>
                <p id="hometext2">Here, the world is your playground, and the possibilities are as endless as the horizon. Share your travel plans,
                    dish out tips on must-visit destinations, or regale us with your most epic tales from the road. Let's turn those
                    wanderlust dreams into reality, one adventure at a time!
                    {/* <button id="hometextbutton4">View My Plans</button>
                    <button id="hometextbutton5">View My Places</button>
                    <button id="hometextbutton6">View My Stories</button> */}
                </p>
                {/* <button>View All Places</button> */}
                <img id="backgroundimg3" src={background3} alt="backgroundimg3"/>
                <img id="backgroundimg2" src={background2} alt="backgroundimg2"/>
                <p id="hometext3"> So grab your passport, pack your sense of adventure, and let's embark on this journey together.
                Adventure awaits!
                {/* <button id="hometextbutton4">Start a new plan</button>
                <button id="hometextbutton5">Start a new place</button>
                <button id="hometextbutton6">Start a new story</button> */}
                </p>
			</div>
		</nav>
        </>
	)
}

export default Home;
