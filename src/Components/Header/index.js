import './index.css'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'
import {TiHome} from 'react-icons/ti'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

const Header = props => {
  const onClickingLogoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="home-nav">
      <Link to="/">
        <img
          alt="website logo"
          className="nav-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </Link>

      <ul className="links-icons-con">
        <li>
          <Link to="/" className="link">
            <TiHome className="link-icon" />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link">
            <BsBriefcaseFill className="link-icon" />
          </Link>
        </li>
        <button
          className="logout-btn-in-sm"
          type="button"
          onClick={onClickingLogoutBtn}
          aria-label="logout"
        >
          <FiLogOut className="logout-icon-in-sm" />
        </button>
      </ul>

      <ul className="links-con">
        <Link to="/" className="link">
          <li>Home</li>
        </Link>

        <Link to="/jobs" className="link">
          <li>jobs</li>
        </Link>
      </ul>
      <button
        className="logout-btn-in-lg"
        type="button"
        onClick={onClickingLogoutBtn}
      >
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
