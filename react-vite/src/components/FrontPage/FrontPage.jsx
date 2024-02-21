// import React from 'react';
import './FrontPage.css';
// import MenuLibrary from '../MenuLibrary';
// import MainPageContent from '../MainPageContent';
import frontimg from '../../../public/images/img-1.jpg';


function FrontPage(){
	return (
        <>
			<div className='bg'>
            <img src={frontimg} alt="frontpageimg"/>
            {/* Image by <a href="https://www.freepik.com/free-photo/full-shot-woman-travel-concept_19894706.htm#query=travel&position=12&from_view=keyword&track=sph&uuid=55164df0-fdb3-47e7-8370-dbeb4e40d422">Freepik</a> */}

              {/* <div className="homeitem-1">
                    <MenuLibrary />
                </div> */}
                {/* <div className="homeitem-2">
                    <MainPageContent />
                </div> */}
			</div>
            {/* <div className="TravelMakesYouHappy">Travel Makes You Happy</div>
            <div className="DiscoverFun">Discover Fun</div>
            <div className="TravelerNote">Traveler Note</div>
            <div className="YourTravelStory">Your Travel Story</div> */}
        </>
	)
}

export default FrontPage;
