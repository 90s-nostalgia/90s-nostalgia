import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/product'
import {addToOrder} from '../store/order'
import {Link} from 'react-router-dom'
import {removeFromOrder} from '../store/order'

export class SingleProduct extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getSingleProduct(productId)
  }
  // remove userId
  handleClick(event) {
    const productId = this.props.match.params.productId
    const userId = this.props.userId
    let updateQuantity = 0
    event.preventDefault()
    console.log(event.target.value)
    if (event.target.value === 'remove') {
      updateQuantity = -1
    } else {
      updateQuantity = +1
    }
    this.props.addToOrder(productId, userId, updateQuantity)
  }

  render() {
    console.log(this.props.order)
    const singleProduct = this.props.singleProduct
    return (
      <div>
        {singleProduct ? <img src={singleProduct.imageUrl} /> : null}
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleClick}
        >
          Add
        </button>

        <button
          type="button"
          className="btn btn-primary"
          value="remove"
          onClick={this.handleClick}
        >
          Remove
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.product.singleProduct,
    userId: state.user.id,
    order: state.order.unfulfilledOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: productId => dispatch(getSingleProduct(productId)),
    addToOrder: (productId, userId, updateQuantity) =>
      dispatch(addToOrder(productId, userId, updateQuantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
