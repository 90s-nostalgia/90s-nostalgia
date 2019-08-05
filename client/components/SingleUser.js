import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleUser} from '../store/user-for-user'
import {Link} from 'react-router-dom'

export class SingleUser extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getSingleUser(userId)
  }

  handleClick(event) {
    const userId = this.props.match.params.userId
    event.preventDefault()
    this.props.getSingleUser(userId)
    //this is going to change so that it fires a getCart thunk
  }

  render() {
    const singleUser = this.props.singleUser
    return (
      <div>
        {singleUser ? (
          <div>
            Hello {singleUser.name}! You've told us that your email is{' '}
            {singleUser.email}. Your shipping address is{' '}
            {singleUser.defaultShipping} and we will be billing you at{' '}
            {singleUser.defaultBilling}. If you would like to specify a
            different address for your order, you can do so at checkout.
            Otherwise, we will default to these addresses.
          </div>
        ) : null}

        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleClick}
        >
          View Cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleUser: state.singleUser,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleUser: anonymousData => dispatch(getSingleUser(anonymousData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
