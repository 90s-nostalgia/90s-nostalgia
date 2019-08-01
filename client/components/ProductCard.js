import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  console.log(props.product)
  return (
    <div key={props.product.id}>
      <div>
        <img src={props.product.imageUrl} />

        <Link to={`/products/${props.product.id}`}>
          {props.product.name} {props.product.price}
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
