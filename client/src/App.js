import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BubblePage from './components/BubblePage';
import Login from "./components/Login";
import { PrivateRoute } from './components/PrivateRoute';
import "./Style.scss";

function App() {
  return (
    <div>
      <Link to = "/login" >Login</Link>    
      <Link to = "/bubblepage" >Bubble Page</Link>    
      <Router>
        <div className="App">
          <Route exact path="/login" component={Login} />
          {/* 
            Build a PrivateRoute component that will 
            display BubblePage when you're authenticated 
          */}
          <PrivateRoute path = "/bubblepage" component = {BubblePage}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
