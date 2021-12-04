import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getUser, login } from "../../actions/authActions";

const AccountLogin = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

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
    if (email === "" || password === "") {
      alert("Please fill in all fields");
    } else {
      dispatch(login({ email, password }));
      // console.log("login submit");
    }
  };

  useEffect(() => {
    !usr && dispatch(getUser());
    if (isAuthenticated) {
      // console.log(props);
      props.history.push("/");
    }
    if (error === "Invalid Credentials") {
      alert(error);
      dispatch(clearErrors());
    }
  }, [usr, error, isAuthenticated]);
  return (
    <div className="row">
      <div className="col-lg-6 offset-lg-3">
        <h1 className="h3 mb-3 text-center">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="form-control"
              placeholder="Email Address"
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="mt-3 d-grid">
            <button type="submit" className="btn btn-lg btn-primary">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountLogin;
