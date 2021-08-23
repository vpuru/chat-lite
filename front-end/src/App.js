import React, { useEffect } from "react";
import DashboardPage from "./components/DashboardPage";
import RoomPage from "./components/RoomPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

function App() {
  useEffect(() => {});

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route path="/room/:id" component={RoomPage} />
          <Redirect to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
