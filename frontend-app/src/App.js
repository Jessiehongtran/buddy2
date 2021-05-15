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
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props){
    super(props)
  }

  render(){

    const { new_vocab } = this.props.state

    return (
      <div className="App">
        {new_vocab.word
        ? <div className="new_vocab" style={{ position: 'absolute', left: '80%', top: '80%', backgroundColor: '#DC5C3B', color: 'white', padding: '20px', margin: '20px', borderRadius: '6px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
            <p style={{  fontSize: '14px'}}>Hey, do you know this word</p>
            <p className="new_word" style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '18px'}}>{new_vocab.word}</p>
            <p className="explain" style={{ fontStyle: 'italic',}}>{new_vocab.explain}</p>
          </div>
        : null}
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
            component = {Topics}
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
            component = {MyMatch}
          />
          <ProtectedRoute
            exact path = "/times"
            component = {Time}
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
            component = {Matching}
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
}

const mapStateToProps = state => {
  return {
    state
  }
}

export default connect(mapStateToProps, {})(App);
