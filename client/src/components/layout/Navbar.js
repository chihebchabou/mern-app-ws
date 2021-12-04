import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/authActions";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => dispatch(logout());

  const authLinks = (
    <Fragment>
      <li className="nav-iyem">
        <Link className="nav-link" to="/account/register">
          Profile
        </Link>
      </li>
      <li className="nav-iyem">
        <a className="nav-link" href="#!" onClick={onLogout}>
          Logout
        </a>
      </li>
    </Fragment>
  );

  const notAuthLinks = (
    <Fragment>
      <li className="nav-iyem">
        <Link className="nav-link" to="/account/register">
          Register
        </Link>
      </li>
      <li className="nav-iyem">
        <Link className="nav-link" to="/account/login">
          Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container">
        <Link to="/" className="navbar-brand">
          GMC-MERN
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? authLinks : notAuthLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
