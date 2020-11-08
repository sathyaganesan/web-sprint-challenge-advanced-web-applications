import React, { useState } from "react";
import axios from 'axios';

const Login = (props) => {

  console.log("Props from LOGIN", props);

  const [loginUser, setLoginUser] = useState([
    {
      username: "",
      password: ""
    }
  ]);

  const changeHandler = (e) => {
    e.persist();
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const submitChange = (e) => {
    console.log("SUBMIT CLICK");
    e.prevenDefault();
    axios
      .post(`http://localhost:5000/api/login`, {username: loginUser.username, password: loginUser.password})
      .then((res) => {
        console.log('LOGIN POST REQUEST', res);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubblepage');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit = {submitChange}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={loginUser.username}
            onChange = {changeHandler}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginUser.password}
            onChange = {changeHandler}
          />
        </div>
        <div>
          <button type = "submit">Login</button>
        </div>
      </form>
    </>
  );
};

export default Login;
