import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <div>
      <Link to = "/login">Login</Link>
      <Route>
        <div className="App">
          <PrivateRoute exact path="/" component={Login} />
        </div>
      </Route>
    </div>
  );
}

export default App;
