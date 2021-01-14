import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './views/home';
import Topics from './views/topics';
import SignUp from './views/signup';
import Time2 from './views/time2';
import Closing from './views/closingMessage';
import Matching from './views/matching';
import Matching2 from './views/matching2';
import Nav from './components/nav';
import Time3 from './views/time3';
import Top from './components/top';
import Video from './components/video';
import Login from './components/login'

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
                {/* <Top/> */}
                <Nav {...props} />
                <Home {...props}/>
                {/* <Top/> */}
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
          exact path = "/time3"
          render = {
            props => {
              return (
                <Time3 {...props}/>
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
                <Matching2 {...props}/>
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
