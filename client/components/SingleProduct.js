import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/product'
import {addToOrder} from '../store/order'
import {Link} from 'react-router-dom'

export class SingleProduct extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getSingleProduct(productId)
    console.log(productId)
  }

  handleClick(event) {
    const productId = this.props.match.params.productId
    event.preventDefault()
    this.props.addToOrder(productId)
  }

  render() {
    return (
      <div>
        {this.props.singleProduct ? (
          <img src={this.props.singleProduct.imageUrl} />
        ) : null}
        <button type="button" onClick={this.handleClick}>
          Add to cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.product.singleProduct,
    orders: state.order.orders
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const productId = ownProps.match.params.productId
  return {
    getSingleProduct: () => dispatch(getSingleProduct(productId)),
    addToOrder: () => dispatch(addToOrder(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
