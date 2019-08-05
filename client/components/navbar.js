import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
// eslint-disable-next-line no-extra-boolean-cast

const Navbar = ({handleClick, userId}) => {
  return (
    <div>
      <nav className="navbar-expand-sm navbar-dark bg-primary">
        <Link to="/" className="navbar-brand">
          90s Nostalgia
        </Link>
        {userId ? (
          <div className="navbar-nav">
            {/* The navbar will show these links after you log in */}
            <Link to="/home" className="nav-item nav-link">
              Home
            </Link>
            <a href="#" className="nav-item nav-link" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div className="navbar-nav">
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className="nav-item nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-item nav-link">
              Sign Up
            </Link>
          </div>
        )}
        <div className="navbar-nav">
          <Link to="/products" className="nav-item nav-link">
            All Products
          </Link>
          <Link to={`/user/${userId}/orders`} className="nav-item nav-link">
            Cart
          </Link>
        </div>
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // isLoggedIn: !!state.user.id
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired
}
