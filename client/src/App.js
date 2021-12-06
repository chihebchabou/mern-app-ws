import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Account from "./components/pages/Account";
import AccountLogin from "./components/pages/AccountLogin";
import AccountRegister from "./components/pages/AccountRegister";
import Home from "./components/pages/Home";
import PrivateRoute from "./components/routing/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="container mt-4">
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/account" component={Account} />
            <Route path="/account/login" component={AccountLogin} />
            <Route path="/account/register" component={AccountRegister} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
