import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="header px-1">
      <nav className="flex gap-3 sm:gap-2 md:gap-3 lg:gap-7">
        <Link
          to="https://devthomas.pl/"
          className="hover-animate  w-max h-12 px-2 text-sm md:text-lg rounded-lg bg-gray-800 items-center justify-center flex font-bold shadow-md"
        >
          <p className="text-amber-50">TS 2D</p>
        </Link>
        <NavLink
          to="/"
          className="hover-animate  w-max h-12 px-2 md:px-6 text-sm md:text-lg rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
        >
          <p className="blue-gradient_text">Home</p>
        </NavLink>
      </nav>
      <nav className="flex text-lg gap-3 sm:gap-2 md:gap-3 lg:gap-7 font-medium">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-200 text-black p-2 rounded-lg"
              : "text-black bg-white p-2 rounded-lg hover-animate  w-max h-12 px-2 md:px-6 text-sm md:text-lg"
          }
        >
          <p className="blue-gradient_text font-bold">About</p>
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
              isActive
                  ? "bg-blue-200 text-black p-2 rounded-lg"
                  : "text-black bg-white p-2 rounded-lg hover-animate  w-max h-12 px-2 md:px-6 text-sm md:text-lg"
          }
        >
          <p className="blue-gradient_text font-bold">Projects</p>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
              isActive
                  ? "bg-blue-200 text-black p-2 rounded-lg"
                  : "text-black bg-white p-2 rounded-lg hover-animate  w-max h-12 px-2 md:px-6 text-sm md:text-lg"
          }
        >
          <p className="blue-gradient_text font-bold">Contact</p>
        </NavLink>
      </nav>
    </header>
  );
};
