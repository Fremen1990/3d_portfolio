import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="header ">
      <nav className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-7">
        <Link
          to="https://devthomas.pl/"
          className="hover-animate  w-30 h-12 px-4 text-md rounded-lg bg-gray-800 items-center justify-center flex font-bold shadow-md"
        >
          <p className="text-amber-50">TS 2d</p>
        </Link>
        <NavLink
          to="/"
          className="hover-animate  w-14 h-12 px-10 text-lg rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
        >
          <p className="blue-gradient_text">Home</p>
        </NavLink>
      </nav>
      <nav className="flex text-lg gap-1 sm:gap-2 md:gap-3 lg:gap-7 font-medium">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 p-2 rounded-lg"
              : "text-black bg-white p-2 rounded-lg hover-animate "
          }
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 p-2 rounded-lg"
              : "text-black bg-white p-2 rounded-lg hover-animate "
          }
        >
          Projects
        </NavLink>
      </nav>
    </header>
  );
};
