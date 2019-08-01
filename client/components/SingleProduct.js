import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/product'
import {addToOrder} from '../store/order'
import {me} from '../store/user'
import {Link} from 'react-router-dom'

export class SingleProduct extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getSingleProduct(productId)
    this.props.me()
    console.log('these are the props', this.props)
  }

  handleClick(event) {
    const productId = this.props.match.params.productId
    event.preventDefault()
    this.props.addToOrder(productId, 1)
  }

  render() {
    const singleProduct = this.props.singleProduct
    return (
      <div>
        {singleProduct ? <img src={singleProduct.imageUrl} /> : null}
        <button type="button" onClick={this.handleClick}>
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.product.singleProduct,
    user: state.user.userId //this needs to change
    // orders: state.order.orders might not need this, currently []
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const productId = ownProps.match.params.productId
  return {
    getSingleProduct: () => dispatch(getSingleProduct(productId)),
    addToOrder: () => dispatch(addToOrder(productId)),
    me: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
