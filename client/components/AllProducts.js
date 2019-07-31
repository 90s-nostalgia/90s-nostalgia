import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import ProductCard from './ProductCard'

export class AllProducts extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    return (
      <div>
        {this.props.allProducts
          ? this.props.allProducts.map(product => (
              <ProductCard key={product.name} product={product} />
            ))
          : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.product.allProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
