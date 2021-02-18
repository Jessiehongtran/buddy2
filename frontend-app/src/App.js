import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './views/home';
import Topics from './views/topics';
import SignUp from './views/signup';
import Closing from './views/closingMessage';
import Matching from './views/matching';
import Nav from './components/nav';
import Time from './views/time';
import Video from './components/video';
import Login from './components/login';
import MyMatch from './views/mymatch';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact path = "/"
          render = {
            props => {
              return (
                <>
                <Nav {...props} />
                <Home {...props}/>
                </>
                
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
          exact path = "/login"
          render = {
            props => {
              return (
                <Login {...props}/>
              )
            }
          }
        />
         <Route
          exact path = "/mymatch"
          render = {
            props => {
              return (
                <>
                  <Nav {...props} />
                  <MyMatch {...props}/>
                </>
              )
            }
          }
        />
        <Route
          exact path = "/times"
          render = {
            props => {
              return (
                <>
                  <Nav {...props} />
                  <Time {...props}/>
                </>
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
          exact path = "/call"
          render = {
            props => {
              return (
                <Video {...props}/>
              )
            }
          }
        />
        <Route
          exact path = "/matching"
          render = {
            props => {
              return (
                <Matching {...props}/>
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
