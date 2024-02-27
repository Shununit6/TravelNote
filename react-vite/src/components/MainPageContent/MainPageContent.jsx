// import { React } from 'react';
import './MainPageContent.css';
import Plans from '../Plans/Plans';
import Places from '../Places';
import Stories from '../Stories';

function MainPageContent(){
    const num = 3;
	return (
        <nav>
            <div id="MainPageContentCss">
                <div>
                    <ul className='MainPageFourSong'>
                        <Plans num={num}/>
                    </ul>
                </div>
                <div>
                    <ul className='MainPageFourAlbum'>
                        <Places num={num}/>
                    </ul>
                </div>
                <div>
                    <ul className='MainPageFourPlaylist'>
                        <Stories num={num}/>
                    </ul>
                </div>
            </div>
        </nav>
	);
}

export default MainPageContent;
