import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { StatefulToolTip } from 'react-portal-tooltip'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/pro-solid-svg-icons'

import { logout,postUser,registerNewUser } from '../store/user/actions'

import '../styles/NavBar.css'

class NavBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loginIsOn: false,
      registerIsOn: false,
      registerName: '',
      registerEmail: '',
      registerIdName: '',
      registerPassword: '',
      registerRepeatPassword: '',
      loginEmail: '',
      loginPassword: ''

    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  postUser = e => {
    const userData = {
      email: this.state.loginEmail,
      password: this.state.loginPassword
    }
    this.props.postUser(userData)
  }

  registerUser = e => {
    const userData = {
      name: this.state.registerName,
      email: this.state.registerEmail,
      idName: this.state.registerIdName,
      password: this.state.registerPassword,
      repeatPassword: this.state.registerRepeatPassword
    }
    this.props.registerNewUser(userData)
  }

  onIdNameChange = e => {
    // eslint-disable-next-line
    const value = '@' + e.target.value.trim().replace(/[^\w\.]/gi, '')
    this.setState({ idName: value === '@' ? '' : value })
  }

  logOut = e => {
    this.props.logout()
  }

  loginSwitch = e => {
    if (this.state.loginIsOn)
      this.setState({
        loginIsOn: !this.state.loginIsOn
      })
    else
      this.setState({
        loginIsOn: !this.state.loginIsOn,
        registerIsOn: false
      })
  }

  registerSwitch = e => {
    if (this.state.registerIsOn)
      this.setState({
        registerIsOn: !this.state.registerIsOn
      })
    else
      this.setState({
        registerIsOn: !this.state.registerIsOn,
        loginIsOn: false
      })
  }

  render() {
    return (
      <div className="nav-container">
        <div className="nav">
          <div className="nav-logo-container">
            <Link to="/" className="nav-logo">Postter</Link>
          </div>
          <div className="nav-center">
            {/* TODO: change links */}
            <Link to="/" className="nav-center-btn">Главная</Link>
            <Link to="/" className="nav-center-btn">Мой блог</Link>
          </div>
          <div className="nav-right">
            <div className="nav-search">
              <FontAwesomeIcon icon={faSearch} color="#808080" />
            </div>
            {this.props.user.isLoggedIn ? logoutBtn(this) : authBtns(this)}
          </div>
        </div>
      </div >
    )
  }
}

const logoutBtn = t => {
  return (
    <div class="nav-btn-login" onClick={t.logOut}>
      Выйти
    </div>
  )
}

const authBtns = t => {
  return (
    <div>
      < div className="nav-btn-register-container" >
        <div className="nav-btn-register" onClick={t.registerSwitch}>
          Регистрация
        </div>
        <div className={t.state.registerIsOn ? "auth-wrap register-wrap" : "display-none"}>
          <input
            type="email"
            name="registerEmail"
            placeholder="e-mail"
            className="auth-input"
            value={t.state.registerEmail}
            onChange={t.onChange}
          />
          <input
            type="text"
            name="registerName"
            placeholder="имя"
            className="auth-input"
            value={t.state.registerName}
            onChange={t.onChange}
          />
          <input
            type="text"
            name="registerIdName"
            placeholder="id"
            className="auth-input"
            value={t.state.registerIdName}
            onChange={t.onIdNameChange}
          />
          <input
            type="password"
            name="registerPassword"
            placeholder="пароль"
            className="auth-input"
            value={t.state.registerPassword}
            onChange={t.onChange}
          />
          <input
            type="password"
            name="registerRepeatPassword"
            placeholder="повторите пароль"
            className="auth-input"
            value={t.state.registerRepeatPassword}
            onChange={t.onChange}
          />
          <div className="submit-btn" onClick={t.registerUser}>Зарегистрироваться</div>
        </div>
      </div >
      < div className="nav-btn-login-container" >
        <div className="nav-btn-login" onClick={t.loginSwitch}>
          Войти
        </div>
        <div className={t.state.loginIsOn ? "auth-wrap login-wrap" : "display-none"}>
          <input
            type="text"
            name="loginEmail"
            autoComplete="off"
            placeholder="e-mail"
            spellCheck={false}
            className="auth-input"
            value={t.state.loginEmail}
            onChange={t.onChange}
          />
          <input
            type="password"
            name="loginPassword"
            placeholder="пароль"
            className="auth-input"
            value={t.state.loginPassword}
            onChange={t.onChange}
          />
          <div className="submit-btn" onClick={t.postUser}>Войти</div>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  postUser,
  registerNewUser,
  logout
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar)