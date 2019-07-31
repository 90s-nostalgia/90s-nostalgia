import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/product'
import {Link} from 'react-router-dom'

export class SingleProduct extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getSingleProduct(productId)
    console.log(productId)
  }

  render() {
    console.log(this.props.singleProduct)
    return (
      <div>
        {this.props.singleProduct ? (
          <img src={this.props.singleProduct.imageUrl} />
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.product.singleProduct
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const productId = ownProps.match.params.productId
  return {
    getSingleProduct: () => dispatch(getSingleProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
