import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { sidebarLinks } from "../../constant";
import { Loader } from "../Loader/Loader";


const LeftSidebar = () => {
 
return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
      
        <div className="flex flex-col">
          <p className="body-bold">Test User</p>
          <p className="small-regular text-light-3">@testuser</p>
        </div>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link) => {
            const isActive = false;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
          
        </ul>
      </div>

      <button
        className="shad-button_ghost">
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </button>
    </nav>
  );
};

export default LeftSidebar;
