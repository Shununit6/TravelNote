import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import navlogo from '../../../public/images/logo.png';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<nav>
			<NavLink exact to="/home" src="../../../public/images/navlogo.png">
				<img id="logoImage" src={navlogo} alt="logoimage"/>
          	</NavLink>
			{isLoaded && (
				<div id="loginsignupnavbar">
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</nav>
	);
}

export default Navigation;
