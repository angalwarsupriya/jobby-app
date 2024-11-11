import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  para = {
    color: 'red',
  }

  state = {username: '', password: '', errorMessage: ''}

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const Url = 'https://apis.ccbp.in/login'
    const sendingDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(sendingDetails),
    }
    const fetching = await fetch(Url, options)
    const waitingForData = await fetching.json()
    console.log(waitingForData)
    const responseStatus = fetching.ok
    if (responseStatus) {
      const {history} = this.props
      Cookies.set('jwt_token', waitingForData.jwt_token, 30)
      history.replace('/')
    } else {
      console.log(waitingForData.error_msg)
      this.setState({errorMessage: waitingForData.error_msg})
    }
  }

  render() {
    const {username, password, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-con">
        <div className="form-con">
          <img
            alt="website logo"
            className="login-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <form className="form" onSubmit={this.onSubmitDetails}>
            <div>
              <label className="lab" htmlFor="name">
                USERNAME
              </label>
              <input
                id="name"
                type="text"
                value={username}
                className="input"
                placeholder="Use: rahul"
                onChange={this.onChangeName}
              />
            </div>
            <div>
              <label className="lab" htmlFor="password">
                PASSWORD
              </label>
              <input
                id="password"
                type="text"
                value={password}
                className="input"
                placeholder="Use: rahul@2021"
                onChange={this.onChangePassword}
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
            <p className="error-msg" style={this.para}>
              {errorMessage}
            </p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
