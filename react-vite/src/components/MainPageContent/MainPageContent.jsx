// import { React } from 'react';
import './MainPageContent.css';
import Plans from '../Plans/Plans';
import Places from '../Places';
import Stories from '../Stories';

function MainPageContent(){
    const num = 2;
	return (
        <>
            <div className="MainPageContentCss">
            {/* <Link id="plansIsActive" to="/plans" > Plans </Link>
            <Link id="placesIsNotActive" to="/places" > Places </Link>
            <Link id="storiesIsNotActive" to="/stories" > Stories </Link> */}
                <div className='MainPagePlans'>
                    <Plans num={num}/>
                </div>

                <div className='MainPagePlaces'>
                    <Places num={num}/>
                </div>

                <div className='MainPageStories'>
                    <Stories num={num}/>
                </div>

            </div>
        </>
	);
}

export default MainPageContent;
