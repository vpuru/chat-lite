import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import "./tailwind.css";

const Room = () => {
  const roomName = useParams().id;
  const [sendBox, setSendBox] = useState("");
  const [messages, setMessages] = useState(["message #1"]);

  useEffect(() => {
    // connect to our room
    socket.emit("join room", roomName);

    console.log("use effect triggered");

    // listen for new messages
    socket.on("new message", (message) => {
      setMessages([...messages, message]);
    });
  }, [roomName]);

  return (
    <div className="w-full h-screen p-10">
      <a href="/dashboard">
        <div
          onClick={() => socket.emit("leave room", roomName)}
          className="mx-auto p-3 my-3 w-full max-w-7xl flex justify-center bg-green-300 rounded-lg shadow-sm"
        >
          <h1 className="font-bold">Back to Dashboard</h1>
        </div>
      </a>
      <div className="mx-auto flex justify-center max-w-7xl w-full h-4/5 bg-gray-200 rounded-lg">
        <div>
          <h1 className="text-3xl mx-40 mt-4 mb-10 font-bold">{roomName} Chat</h1>
          <ul>
            {messages.map((message, count) => {
              return <li key={count}>{message}</li>;
            })}
          </ul>

          <input type="text" value={sendBox} onChange={(e) => setSendBox(e.target.value)} />
          <input
            type="submit"
            value="Send"
            onClick={() => {
              if (sendBox.length !== 0) {
                console.log("Submitting " + sendBox);
                socket.emit("message room", sendBox, roomName);
                setSendBox("");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Room;
