import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import navlogo from '../../../src/images/logo.png';
function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	return (

			<div className="navbox">
				<div><NavLink to="/"><img id="logoImage" src={navlogo} alt="logoimage"/></NavLink></div>
				<div >
					<NavLink to="/plans/"><button id="viewall">View All</button></NavLink>
				</div>
				{sessionUser &&
				<div>
					<NavLink to="/plans/current"><button id="viewmy">View My</button></NavLink>
				</div>}
				{sessionUser &&
				<div>
					<NavLink to="/plans/new"><button id="createnew">Create New</button></NavLink>
				</div>}
				<div>
					{isLoaded && (
						<ProfileButton user={sessionUser} />
					)}
				</div>
			</div>
	);
}

export default Navigation;
