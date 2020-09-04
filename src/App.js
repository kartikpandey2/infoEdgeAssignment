import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import AddTask from "./pages/addTask";
import UpdateTask from "./pages/updateTask";
import ViewTask from "./pages/viewTask";
import "./app.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add" component={AddTask} />
        <Route exact path="/:taskId" component={ViewTask} />
        <Route path="/update/:taskId" component={UpdateTask} />
      </Switch>
    </Router>
  );
}

export default App;
