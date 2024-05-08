import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import navlogo from '../../../src/images/logo.png';
import githublogo from '../../../src/images/github-mark.png';
import githublogowhite from '../../../src/images/github-mark-white.png';
import lilogo from '../../../src/images/LI-In-Bug.png';
function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	return (

			<div className="navbox">
				<div><NavLink to="/"><img id="logoImage" src={navlogo} alt="logoimage"/></NavLink></div>
				<div>
					<NavLink to="/plans/"><button id="viewall">View All</button></NavLink>
				</div>
				<div className='githubimage'>
					<div className='githubimage1'>
						<a href="https://github.com/Shununit6">
							<img id="github" src={githublogo} alt="githublogo"/>
						</a>
					</div>
					<div className='githubimage2'>
						<a href="https://github.com/Shununit6">
							<img id="githubwhite" src={githublogowhite} alt="githublogowhite"/>
						</a>
					</div>
				</div>
				<div>
					<a href="https://www.linkedin.com/in/shun-xu-a0895918b/">
							<img id="lilogo" src={lilogo} alt="linkedinlogo"/>
					</a>
				</div>
				{sessionUser &&
				<div>
					<NavLink to="/plans/current"><button id="viewmy">View My</button></NavLink>
				</div>}
				{/* {sessionUser &&
				<div>
					<NavLink to="/plans/new"><button id="createnew">Create New</button></NavLink>
				</div>} */}
				<div>
					{isLoaded && (
						<ProfileButton user={sessionUser} />
					)}
				</div>
			</div>
	);
}

export default Navigation;
