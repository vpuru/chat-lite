import React, { useEffect } from "react";
import DashboardPage from "./components/DashboardPage";
import RoomPage from "./components/RoomPage";
import LoginPage from "./components/LoginPage";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  useEffect(() => {});

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route path="/room/:id" component={RoomPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
