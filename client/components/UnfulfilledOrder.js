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
    console.log(this.props)
    const unfulfilledOrder = this.props.unfulfilledOrder
    return (
      <div>
        <h1>HI MOM!</h1>
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
