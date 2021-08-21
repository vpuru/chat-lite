import React from "react";
// import io from "socket.io-client";
import Dashboard from "./components/Dashboard";
import Room from "./components/Room";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// socket connections
// const socket = io("ws://localhost:5000/", { transports: ["websocket"] });

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/room/:id" component={Room} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
