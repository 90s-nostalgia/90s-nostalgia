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
  }

  handleClick(event) {
    const productId = this.props.match.params.productId
    const userId = this.props.userId
    event.preventDefault()
    this.props.addToOrder(productId, userId)


  }

  render() {
    console.log('these are the props', this.props)
    const singleProduct = this.props.singleProduct
    return (
      <div>
        {singleProduct ? <img src={singleProduct.imageUrl} /> : null}
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleClick}
        >
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.product.singleProduct,
    userId: state.user.id

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const productId = ownProps.match.params.productId
  return {
    getSingleProduct: () => dispatch(getSingleProduct(productId)),
    addToOrder: userId => dispatch(addToOrder(productId, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
