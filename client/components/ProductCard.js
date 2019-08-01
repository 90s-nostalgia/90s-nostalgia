import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  const product = props.product
  return (
    <div key={product.id}>
      <div>
        <img src={product.imageUrl} />
        <Link to={`/products/${product.id}`}>
          {product.name} {product.price}
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
