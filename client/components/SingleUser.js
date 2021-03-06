import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleUser} from '../store/user-for-user'
import {getUnfulfilledOrder} from '../store/order'
import {fulfillOrder} from '../store/order'

// import {Link} from 'react-router-dom'
import Cart from './Cart'

export class SingleUser extends Component {
  constructor() {
    super()
    this.state = {
      showCart: false
    }
    this.checkOut = this.checkOut.bind(this)
    this.showCart = this.showCart.bind(this)
  }

  componentDidMount() {
    // state.user
    const userId = this.props.match.params.userId
    this.props.getSingleUser(userId)
    this.props.getUnfulfilledOrder(userId)
  }

  checkOut(event) {
    const userId = this.props.match.params.userId
    event.preventDefault()
    this.props.fulfillOrder(userId)
  }

  showCart() {
    const currentShowCart = this.state.showCart
    this.setState({
      showCart: !currentShowCart
    })
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
          onClick={this.showCart}
        >
          View Cart
        </button>
        <pre>
          {this.state.showCart && (
            <div>
              <div>
                <Cart order={this.props.unfulfilledOrder[0] || {}} />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.checkOut}
                >
                  Check Out
                </button>
              </div>
            </div>
          )}
        </pre>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // state.user
  return {
    singleUser: state.singleUser,
    userId: state.user.id,
    unfulfilledOrder: state.order.unfulfilledOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleUser: anonymousData => dispatch(getSingleUser(anonymousData)),
    getUnfulfilledOrder: userId => dispatch(getUnfulfilledOrder(userId)),
    fulfillOrder: userId => dispatch(fulfillOrder(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
