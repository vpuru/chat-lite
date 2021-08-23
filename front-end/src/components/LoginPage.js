import React from "react";
import "./tailwind.css";
const axios = require("axios");
// send user name and password to database

// store signed jwt

const LoginPage = () => {
  const handleSubmit = () => {
    axios.post("http://localhost:5000/", {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    });

    return false;
  };

  return (
    <div>
      <div className="w-full h-screen space-y-4">
        <a href="/register">
          <div className="w-full max-w-4xl border h-14 mt-20 mx-auto bg-green-300 hover:bg-green-400 duration-200 rounded-lg shadow-sm text-center">
            <div className="w-full h-full flex justify-center items-center">
              <h1 className="font-bold">Go to Register Page!</h1>
            </div>
          </div>
        </a>
        <div className="w-full max-w-4xl border h-1/2 mx-auto rounded-lg bg-gray-300 text-center">
          <h1 className="text-3xl my-10">Login Page</h1>
          <div className="w-full h-3/5 flex justify-center">
            <form onSubmit={() => handleSubmit()}>
              Username:
              <input id="username" type="text" />
              <br />
              <br />
              Password:
              <input id="password" type="text" />
              <br />
              <br />
              <input type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
