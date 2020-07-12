import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './views/home';
import Topics from './views/topics';
import Time from './views/time';
import SignUp from './views/signup';
import Sorry from './views/sorry';
import Time2 from './views/time2';
import Closing from './views/closingMessage';

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
                <Time2 {...props}/>
              )
            }
          }
        />
        <Route
          exact path = "/signup"
          render = {
            props => {
              return (
                <SignUp {...props}/>
              )
            }
          }
        />
        <Route
          exact path = "/end"
          render = {
            props => {
              return (
                <Closing {...props}/>
              )
            }
          }
        />
      </Switch>
      
    </div>
  );
}

export default App;
