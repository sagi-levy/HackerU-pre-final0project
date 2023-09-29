import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { getUser } from "../services/userApiServices";

const Navbar = () => {
  const { user } = useAuth() || {};
  return (
    <>
      <nav
        className="navbar navbar-expand-sm navbar-dark bg-dark"
        aria-label="Sixth navbar example"
      >
        <div className="container-fluid">
          <Link to="/">
            {" "}
            <i className="bi bi-house-door"></i>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample06"
            aria-controls="navbarsExample06"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-xl-0">
              {user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="cards/all-activity-cards" className="nav-link">
                      all Cards
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="about" className="nav-link">
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="sign-out" className="nav-link">
                      Sign Out
                    </NavLink>
                  </li>{" "}
                </>
              ) : (
                <>
                  {/* <li className="nav-item">
                    <NavLink to="sign-up-biz" className="nav-link">
                      sign up admin
                    </NavLink>
                  </li> */}
                  <li className="nav-item">
                    <NavLink to="sign-in" className="nav-link">
                      sign in
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="sign-up" className="nav-link">
                      sign up
                    </NavLink>
                  </li>{" "}
                </>
              )}
              {user && user.biz && (
                <li className="nav-item">
                  <NavLink to="cards/my-activity-cards" className="nav-link">
                    My Cards
                  </NavLink>
                </li>
              )}
              {user && !user.biz && (
                <>
                  {/* <li className="nav-item">
                    <NavLink to="sign-up-biz" className="nav-link">
                      sign up admin
                    </NavLink>
                  </li>{" "} */}
                  <li className="nav-item">
                    <NavLink to="send-mail" className="nav-link">
                      send us mail
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
