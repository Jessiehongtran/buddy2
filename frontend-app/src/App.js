import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './views/home';
import Topics from './views/topics';
import Time from './views/time'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact path = "/"
          render = {
            props => {
              return (
                <Home {...props}/>
              )
            }
          }
        />
        <Route
          exact path = "/topics"
          render = {
            props => {
              return (
                <Topics {...props}/>
              )
            }
          }
        />
        <Route
          exact path = "/time"
          render = {
            props => {
              return (
                <Time {...props}/>
              )
            }
          }
        />
      </Switch>
      
    </div>
  );
}

export default App;
