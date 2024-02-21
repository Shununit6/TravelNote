// import { React } from 'react';
import './MainPageContent.css';
import Plans from '../Plans/Plans';
import Places from '../Places';
import Stories from '../Stories';

function MainPageContent(){
    // const num = 4;
	return (
        <nav>
            <div id="MainPageContentCss">
                <div>
                    <ul className='MainPageFourSong'>
                        <Plans/>
                    </ul>
                </div>
                <div>
                    <ul className='MainPageFourAlbum'>
                        <Places/>
                    </ul>
                </div>
                <div>
                    <ul className='MainPageFourPlaylist'>
                        <Stories/>
                    </ul>
                </div>
            </div>
        </nav>
	);
}

export default MainPageContent;
