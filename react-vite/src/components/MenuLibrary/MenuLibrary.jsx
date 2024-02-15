// import React from 'react';
import { NavLink, Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MenuLibrary.css';

function MenuLibrary(){
	const sessionUser = useSelector(state => state.session.user);

	return (
        <nav className="leftmenu">
        <div className="leftmenufirst">
            {/* <div>
				<i className="fa-brands fa-spotify"></i>
				{" "} Spotify
            </div> */}
            <div>
                <Link exact to="/">
					<i id="fa-house" className="fa-solid fa-house"></i>
					{" "} Home
				</Link>
            </div>
            {/* <div>
				<i className="fa-solid fa-magnifying-glass"></i>
				{" "} Search
            </div> */}
			{sessionUser &&
			<div >
				<NavLink exact to="/plans/current"><button>View my plans</button></NavLink>
			</div>}
			{sessionUser &&
			<div>
				<NavLink exact to="/places/current"><button>View my places</button></NavLink>
			</div>}
			{sessionUser &&
			<div>
				<NavLink exact to="/stories/current"><button>View my stories</button></NavLink>
			</div>}

		</div>
		<div className="leftmenulibrary">
			<div>
				<i className="fa-solid fa-earth-americas"></i>
				{" "}Discover All
			</div>
			<div className="leftmenulibrarycreate">
				<div className="leftmenulibrarycreate-1">
					<div id="leftmenulibrarytext1">View all travels here</div>
					<NavLink exact to="/plans"><button>View all the plans</button></NavLink>
					<NavLink exact to="/places"><button>View all the places</button></NavLink>
					<NavLink exact to="/stories"><button>View all the stories</button></NavLink>
				</div>
				{sessionUser &&
				<div className="leftmenulibrarycreate-2">
					<div id="leftmenulibrarytext2">Create a new plan here. It is easy, we will help you</div>
					{/* <NavLink exact to="/plans/new"><button>Create Plan</button></NavLink> */}
					<NavLink exact to="/plans/new"><button>Create Plan</button></NavLink>
				</div>
				}
				{sessionUser &&
				<div className="leftmenulibrarycreate-4">
					<div id="leftmenulibrarytext4">Create a new place here. It is easy, we will help you</div>
					<NavLink exact to="/places/new"><button>Create Place</button></NavLink>
				</div>
				}
				{sessionUser &&
				<div className="leftmenulibrarycreate-3">
					<div id="leftmenulibrarytext3">Create a new story here. It is easy, we will help you</div>
					<NavLink exact to="/stories/new"><button>Create Story</button></NavLink>
				</div>
				}
			</div>
		</div>
        </nav>
	);
}

export default MenuLibrary;
