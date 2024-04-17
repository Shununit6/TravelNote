import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import navlogo from '../../../src/images/logo.png';
function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	return (
		<nav><NavLink to="/"><img id="logoImage" src={navlogo} alt="logoimage"/></NavLink>
			<div>
			{/* {sessionUser &&
			<div >
				<NavLink to="/plans/current"><button>View my plans</button></NavLink>
			</div>}
			{sessionUser &&
			<div>
				<NavLink to="/places/current"><button>View my places</button></NavLink>
			</div>}
			{sessionUser &&
			<div>
				<NavLink to="/stories/current"><button>View my stories</button></NavLink>
			</div>}
			<div className="leftmenulibrarycreate-1">
					<NavLink to="/plans"><button>View all the plans</button></NavLink>
					<NavLink to="/places"><button>View all the places</button></NavLink>
					<NavLink to="/stories"><button>View all the stories</button></NavLink>
					</div> */}
			{isLoaded && (
				<ProfileButton user={sessionUser} />
			)}
			</div>
		</nav>
	);
}

export default Navigation;
