import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  // const toggleMenu = (e) => {
  //   e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
  //   setShowMenu(!showMenu);
  // };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

//   return (
//     <>
//       <button onClick={toggleMenu}>
//         <i className="fas fa-user-circle" />
//       </button>
//       {showMenu && (
//         <ul className={"profile-dropdown"} ref={ulRef}>
//           {user ? (
//             <>
//               <li>{user.username}</li>
//               <li>{user.email}</li>
//               <li>
//                 <button onClick={logout}>Log Out</button>
//               </li>
//             </>
//           ) : (
//             <>
//               <OpenModalMenuItem
//                 itemText="Log In"
//                 onItemClick={closeMenu}
//                 modalComponent={<LoginFormModal />}
//               />
//               <OpenModalMenuItem
//                 itemText="Sign Up"
//                 onItemClick={closeMenu}
//                 modalComponent={<SignupFormModal />}
//               />
//             </>
//           )}
//         </ul>
//       )}
//     </>
//   );
// }

return (
  <div id="profileNavButtonMenuItem">
    {/* <button onClick={toggleMenu}>
        <i className="fas fa-user-circle" />
    </button> */}
    {(!user) &&
      <div id="menuitemlogin">
        <OpenModalMenuItem
        itemText="Log In"
        onItemClick={closeMenu}
        modalComponent={<LoginFormModal />}
        />
      </div>
    }
    {(!user) &&
      <div id="menuitemsignup">
      <OpenModalMenuItem
      itemText="Sign Up"
      onItemClick={closeMenu}
      modalComponent={<SignupFormModal />}
      />
      </div>
    }
    <div id="iconandcloseopenmenu">
    {user && !showMenu &&
      <div id="openMenuNavButton" onClick={openMenu}>
        <i className="fas fa-user-circle fa-2x"/>
        <i className="fas fa-sort-down fa-2x"></i>
      </div>}
    {user && showMenu &&
      <div id="closeMenuNavButton" onClick={closeMenu}>
      <i className="fas fa-user-circle fa-2x"/>
      <i className="fas fa-sort-up fa-2x"></i>
      </div>}
    <section className={"profile-dropdown"} ref={ulRef}>
      {user ? (
        <div id="menuwithlogout">
          <div>Hello, {user.username}</div>
          <div>{user.email}</div>
          <div>
               <Link id="menulibraryhome" to="/" > View Home Page </Link>
          </div>
          <div>
            <hr/>
            <div onClick={logout}><Link id="menulogout" to="/" >Log Out</Link></div>
          </div>
        </div>
      ) : null}
    </section>
    </div>
  </div>
);
}

export default ProfileButton;
