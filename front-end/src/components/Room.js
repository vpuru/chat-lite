import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./tailwind.css";

const Room = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState(["message #1"]);

  return (
    <div className="w-full h-screen p-10">
      <a href="/">
        <div className="mx-auto p-3 my-3 w-full max-w-7xl flex justify-center border border-black">
          <h1>Back to Dashboard</h1>
        </div>
      </a>
      <div className="mx-auto flex justify-center max-w-7xl w-full h-4/5 border border-black">
        <div>
          <h1 className="text-3xl mx-40 font-bold">Chat page for {id}</h1>
          <ul>
            {messages.map((message, count) => {
              return <li key={count}>{message}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Room;
