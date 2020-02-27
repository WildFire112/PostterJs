import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { isLoggedIn } from './store/user/actions';
import NavBar from './components/NavBar';

class App extends Component {
  componentDidMount() {
    this.props.isLoggedIn()
  }

  render() {
    return (
      <Router>
        <NavBar />
        <div className="container" >
          <Switch>
          </Switch>
          {test(this.props)}
        </div>
      </Router>
    )
  }
}

const test = (props) => {
  return (
    <div className="Test">
      {props.LoggedIn ?
        <div>Logged In</div>
        :
        <div>Unauthorized</div>
      }
      <dir>
        {props.user.name ?
          <>
            <div>User:</div>
            <div>-{props.user.name}</div>
            <div>-{props.user.idName}</div>
            <div>-{props.user.email}</div>
            <div>-{props.user.status}</div>
          </>
          : ''
        }
      </dir>
      <div>
        {props.registerErrors !== undefined ?
          <div>
            <div>Registration errors:</div>
            {Object.values(props.registerErrors).map(err => {
              return (<div>-{err.msg}</div>)
            })}
          </div>
          : ''}
        {props.loginErrors !== undefined ?
          <div>
            <div>Login errors:</div>
            {Object.values(props.loginErrors).map(err => {
              return (<div>-{err.msg}</div>)
            })}
          </div>
          : ''}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    LoggedIn: state.user.isLoggedIn,
    user: state.user.data,
    registerErrors: state.errors.registrationErrors,
    loginErrors: state.errors.loginErrors
  }
}

const mapDispatchToProps = {
  isLoggedIn
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
