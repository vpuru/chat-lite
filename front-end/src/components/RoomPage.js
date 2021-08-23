import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import "./tailwind.css";

// import io from "socket.io-client";
// const socket = io("ws://localhost:5000/", { transports: ["websocket"] });

const Room = () => {
  const roomName = useParams().id;
  const [sendBox, setSendBox] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // submit function
  const handleSubmit = () => {
    if (sendBox.length !== 0) {
      console.log("Submitting " + sendBox);
      socket.emit("message room", sendBox, roomName);
      setSendBox("");
    }
  };

  useEffect(() => {
    // connect to our room
    socket.emit("join room", roomName);

    // listen for new chatMessages
    socket.on("new message", (message) => {
      setChatMessages((oldArr) => [...oldArr, message]);

      // auto scroll to most recent message
      var objDiv = document.getElementById("msgBox");
      objDiv.scrollTop = objDiv.scrollHeight;
    });

    return;
  }, [roomName]);

  return (
    <div className="w-full h-screen p-10">
      {/* back to dashboard button*/}
      <a href="/dashboard">
        <div
          onClick={() => socket.emit("leave room", roomName)}
          className="mx-auto p-3 my-3 w-full max-w-7xl flex justify-center bg-green-300 rounded-lg shadow-sm"
        >
          <h1 className="font-bold">Back to Dashboard</h1>
        </div>
      </a>

      {/* Gray Chat box*/}
      <div className="mx-auto max-w-7xl w-full h-4/5 bg-gray-200 rounded-lg p-3">
        <div className="w-full h-full ">
          <h1 className="text-3xl text-center mx-auto ml-10 mt-4 my-10 font-bold">{roomName} Chat</h1>
          <div className="w-4/5 mx-auto bg-white shadow-md">
            {/* message box */}
            <div id="msgBox" className="box-size overflow-y-auto">
              <ul>
                {chatMessages.map((message, count) => {
                  return count % 2 === 0 ? (
                    <li className="bg-green-100 w-full h-12" key={count}>
                      {message}
                    </li>
                  ) : (
                    <li className="w-full h-12" key={count}>
                      {message}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Submit box */}
            <div className="flex w-full m-auto px-3 py-4 bg-green-400 justify-center shadow-md ">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                {/* Text box */}
                <input className="w-80" type="text" value={sendBox} onChange={(e) => setSendBox(e.target.value)} />
                {/* Submit button */}
                <input className="w-10" type="submit" value="Send" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
