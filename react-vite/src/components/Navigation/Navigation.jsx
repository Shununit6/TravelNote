// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<>
			{/* <li>
				<NavLink exact to="/">Home</NavLink>
			</li> */}
			{isLoaded && (
				<div id="loginsignupnavbar">
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</>
	);
}

export default Navigation;
