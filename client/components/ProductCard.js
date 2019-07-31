import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  return (
    <div key={props.product.id}>
      <div>
        <img src={props.product.imageUrl} />
        <Link to={'/products/' + props.product.id}>
          {props.product.name} {props.product.price} {props.product.description}
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
