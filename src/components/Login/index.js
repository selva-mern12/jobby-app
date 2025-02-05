import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {BsEye, BsEyeSlash} from 'react-icons/bs'
import './index.css'

class Login extends Component {
  state = {
    userName: '',
    passWord: '',
    isLoginFailed: false,
    errorMsg: '',
    isPasswordShow: false,
  }

  onChangeUserName = event => this.setState({userName: event.target.value})

  onChangePassword = event => this.setState({passWord: event.target.value})

  onLoginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onLoginFailure = errorMsg => this.setState({isLoginFailed: true, errorMsg})

  onLogin = async event => {
    event.preventDefault()
    const {userName, passWord} = this.state
    const userDetails = {username: userName, password: passWord}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  passwordControl = () => {
    this.setState(prevState => ({isPasswordShow: !prevState.isPasswordShow}))
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {
      userName,
      passWord,
      isLoginFailed,
      errorMsg,
      isPasswordShow,
    } = this.state
    const passwordType = isPasswordShow ? 'text' : 'password'
    return (
      <div className="login-container">
        <form onSubmit={this.onLogin} className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="input-container">
            <label className="login-label" htmlFor="userName">
              USERNAME
            </label>
            <input
              className="username-input"
              type="text"
              id="userName"
              value={userName}
              placeholder="Username"
              onChange={this.onChangeUserName}
            />
          </div>
          <div className="input-container">
            <label className="login-label" htmlFor="password">
              PASSWORD
            </label>
            <div className="password-container">
              <input
                className="password-input"
                type={passwordType}
                id="password"
                value={passWord}
                placeholder="Password"
                onChange={this.onChangePassword}
              />
              <button
                className="password-show-button"
                type="button"
                onClick={this.passwordControl}
              >
                {isPasswordShow ? (
                  <BsEye style={{color: 'white', fontSize: '18px'}} />
                ) : (
                  <BsEyeSlash style={{color: 'white', fontSize: '18px'}} />
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {isLoginFailed && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
