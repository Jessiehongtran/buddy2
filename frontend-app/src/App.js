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
import ProtectedRoute from './components/protectedRoute';

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
        <ProtectedRoute
          exact path = "/topics"
          render = {
            props => {
              return (
                <>
                  <Nav {...props} />
                  <Topics {...props}/>
                </>
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
         <ProtectedRoute
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
        <ProtectedRoute
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
        <ProtectedRoute
          exact path = "/matching"
          render = {
            props => {
              return (
                <>
                  <Nav {...props} />
                  <Matching {...props}/>
                </>
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
