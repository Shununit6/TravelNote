import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import navlogo from '../../../src/images/logo.png';
function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	return (
		<nav><NavLink to="/home"><img id="logoImage" src={navlogo} alt="logoimage"/></NavLink>
			<div>
			{/* <Link to="/home"><i id="discover" className="fa-solid fa-bars"></i></Link> */}
			{isLoaded && (
				<ProfileButton user={sessionUser} />
			)}
			</div>
		</nav>
	);
}

export default Navigation;
