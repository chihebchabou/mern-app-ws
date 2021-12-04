import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getUser, register } from "../../actions/authActions";

const AccountRegister = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const {
    isAuthenticated,
    error,
    user: usr,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || password2 === "") {
      alert("Please enter all fields");
    } else if (password !== password2) {
      alert("Passwords do not match");
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  useEffect(() => {
    !usr && dispatch(getUser());
    if (isAuthenticated) {
      // console.log(props);
      props.history.push("/");
    }
    if (error === "User already exists") {
      alert(error);
      dispatch(clearErrors());
    }
  }, [usr, error, isAuthenticated]);

  return (
    <div className="row">
      <h1 className="h3 mb-3 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            id="name"
            placeholder="Full Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            id="password"
            placeholder="Password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password2" className="form-label">
            Confirm Password
          </label>
          <input
            className="form-control"
            type="password"
            name="password2"
            value={password2}
            onChange={handleChange}
            id="password2"
            placeholder="Confirm Password"
          />
        </div>
        <div className="mt-3 d-grid">
          <button type="submit" className="btn btn-lg btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountRegister;
