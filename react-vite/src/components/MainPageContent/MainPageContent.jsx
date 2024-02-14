// import { React } from 'react';
import './MainPageContent.css';
import Plans from '../Plans/Plans';
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
                    <p>Spotify Albums</p>
                    <ul className='MainPageFourAlbum'>
                            {/* <Albums num={num}/> */}
                    </ul>
                </div>
                <div>
                    <p>Spotify Playlists</p>
                    <ul className='MainPageFourPlaylist'>
                            {/* <PlaylistIndex num={num}/> */}
                    </ul>
                </div>
            </div>
        </nav>
	);
}

export default MainPageContent;
