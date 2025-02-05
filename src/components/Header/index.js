import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaHome} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-bg-container">
      <nav className="header-lg-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <ul className="header">
          <li>
            <Link className="home-jobs" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="home-jobs" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
        <button className="logout-button" type="button" onClick={onLogout}>
          Logout
        </button>
      </nav>
      <nav className="header-sm-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <ul className="header">
          <li>
            <Link className="home-jobs" to="/">
              <FaHome color="#ffffff" fontSize="25px" />
            </Link>
          </li>
          <li>
            <Link className="home-jobs" to="/jobs">
              <BsBriefcaseFill color="#ffffff" fontSize="25px" />
            </Link>
          </li>
        </ul>
        <button className="logout-button" type="button" onClick={onLogout}>
          <FiLogOut color="#ffffff" fontSize="20px" />
        </button>
      </nav>
    </div>
  )
}

export default withRouter(Header)
