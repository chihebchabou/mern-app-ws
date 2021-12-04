import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/authActions";

const Home = () => {
  const { loading, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user ? `Welcome ${user.name}` : "Home"}</h1>
    </div>
  );
};

export default Home;
