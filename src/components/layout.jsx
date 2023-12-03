import { NavLink } from "react-router-dom";
import "./layout.css";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const activeClassName = ({ isActive }) =>
    isActive ? "active navlink" : "navlink";

  return (
    <div>
      <nav>
        <p className="header-logo">
          <span>A</span>nalyse
        </p>
        <div>
          <NavLink to="/login" className={activeClassName}>
            Login
          </NavLink>
          <NavLink to="/signup" className={activeClassName}>
            Signup
          </NavLink>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
