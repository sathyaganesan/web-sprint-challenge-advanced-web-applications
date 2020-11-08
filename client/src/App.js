import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route, Link } from 'react-router-dom';
import BubblePage from './components/BubblePage';
import Login from "./components/Login";
// import { PrivateRoute } from './components/PrivateRoute';
import "./Style.scss";

function App() {
  return (
    <div>
      <Router>

        <Link to = "/login" >Login</Link>    
        <Link to="/bubblepage" >Bubble Page</Link>    
     
        <div className="App">
          <Switch>
            <Route exact path="/login" component={Login} />
            {/* 
              Build a PrivateRoute component that will 
              display BubblePage when you're authenticated 
            */}
            <Route path="/bubblepage" component={BubblePage} />
          </Switch>
        </div>

      </Router>
    </div>
  );
}

export default App;
