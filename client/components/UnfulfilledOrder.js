import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUnfulfilledOrder} from '../store/order'
import {Link} from 'react-router-dom'

export class UnfulfilledOrder extends Component {
  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getUnfulfilledOrder(userId)
  }

  render() {
    const unfulfilledOrder = this.props.unfulfilledOrder
    console.log(unfulfilledOrder)

    return (
      <div>
        <h1>Cart</h1>
        {/* {singleProduct ? <img src={singleProduct.imageUrl} /> : null} */}
        {unfulfilledOrder ? <h1>{unfulfilledOrder.id}</h1> : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    unfulfilledOrder: state.order.unfulfilledOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUnfulfilledOrder: userId => dispatch(getUnfulfilledOrder(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnfulfilledOrder)
