// import { React } from 'react';
import './MainPageContent.css';
import Plans from '../Plans/Plans';
import Places from '../Places';
import Stories from '../Stories';

function MainPageContent(){
    const num = 2;
	return (
        <nav>
            <div id="MainPageContentCss">
                <div>
                    <ul className='MainPagePlans'>
                        <Plans num={num}/>
                    </ul>
                </div>
                <div>
                    <ul className='MainPagePlaces'>
                        <Places num={num}/>
                    </ul>
                </div>
                <div>
                    <ul className='MainPageStories'>
                        <Stories num={num}/>
                    </ul>
                </div>
            </div>
        </nav>
	);
}

export default MainPageContent;
