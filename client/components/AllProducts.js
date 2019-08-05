import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import ProductCard from './ProductCard'

export class AllProducts extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    const {allProducts} = this.props
    return (
      <div className="container">
        <div className="row">
          {allProducts &&
            allProducts.map(product => (
              <ProductCard key={product.name} product={product} />
            ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.product.allProducts
  }
}

const mapDispatchToProps = {getAllProducts}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
