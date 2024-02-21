// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<>
			<NavLink exact to="/home" src="../../../public/images/navlogo.png">
            <img id="logoImage" src={navlogo} alt="logoimage"/>
          	</NavLink>
			{isLoaded && (
				<div id="loginsignupnavbar">
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</>
	);
}

export default Navigation;
