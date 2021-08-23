import React, { useState } from "react";
import "./tailwind.css";
const axios = require("axios");
// send user name and password to database

// store signed jwt

const LoginPage = () => {
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/register", {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      })
      .then((response) => {
        setResponseMsg(response.data.msg);
      });

    return false;
  };

  return (
    <div>
      <div className="w-full h-screen space-y-4">
        <a href="/login">
          <div className="w-full max-w-4xl border h-14 mt-20 mx-auto bg-green-300 hover:bg-green-400 duration-200 rounded-lg shadow-sm text-center">
            <div className="w-full h-full flex justify-center items-center">
              <h1 className="font-bold">Go to Login Page!</h1>
            </div>
          </div>
        </a>
        <div className="w-full max-w-4xl border h-1/2 mx-auto rounded-lg bg-gray-300 text-center">
          <h1 className="text-3xl my-10">Register Page</h1>
          <div className="w-full h-3/5 flex justify-center">
            <form
              action="/login"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Username:
              <input id="username" type="text" />
              <br />
              <br />
              Password:
              <input id="password" type="text" />
              <br />
              <br />
              <input type="submit" value="Register" className="py-1 px-2" />
            </form>
          </div>
          <div>{responseMsg}</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
