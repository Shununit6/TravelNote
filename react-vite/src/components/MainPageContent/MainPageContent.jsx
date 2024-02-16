// import { React } from 'react';
import './MainPageContent.css';
import Plans from '../Plans/Plans';
import Places from '../Places';
import Stories from '../Stories';
// import SongIndex from '../../components/SongIndex';
// import Albums from '../Albums';
// import PlaylistIndex from '../PlaylistIndex';

function MainPageContent(){
    // const num = 4;
	return (
        <nav>
            <div id="MainPageContentCss">
                <div>
                    <p>Trip Plans</p>
                    <ul className='MainPageFourSong'>
                        <Plans/>
                            {/* <SongIndex num={num}/> */}
                    </ul>
                </div>
                <div>
                    <p>Places To Go</p>
                    <ul className='MainPageFourAlbum'>
                        <Places/>
                            {/* <Albums num={num}/> */}
                    </ul>
                </div>
                <div>
                    <p>Stories</p>
                    <ul className='MainPageFourPlaylist'>
                        <Stories/>
                            {/* <PlaylistIndex num={num}/> */}
                    </ul>
                </div>
            </div>
        </nav>
	);
}

export default MainPageContent;
