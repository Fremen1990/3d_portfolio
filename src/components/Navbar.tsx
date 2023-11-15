import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="header">
      <NavLink
        to="/"
        className="hover-animate  w-14 h-14 text-lg rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
      >
        <p className="blue-gradient_text">TS</p>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-blue-500 p-2 rounded-lg" : "text-black bg-white p-2 rounded-lg hover-animate "
          }
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
              isActive ? "text-blue-500 p-2 rounded-lg" : "text-black bg-white p-2 rounded-lg hover-animate "
          }
        >
          Projects
        </NavLink>
      </nav>
    </header>
  );
};
