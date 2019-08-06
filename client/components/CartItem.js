// import React, {Component} from 'react'
import {connect} from 'react-redux'
import React from 'react'
import {Link} from 'react-router-dom'
import {removeFromOrder} from '../store/order'

// export class CartItem extends Component {
//   constructor() {
//     super()
//     this.handleClick = this.handleClick.bind(this)
//   }

//   render() {

//   }
// }

const CartItem = props => {
  const product = props.product
  return (
    <div key={product.id}>
      <div className="col-sm">
        <div>
          <img src={product.imageUrl} />
          <div>
            <Link to={`/products/${product.id}`}>{product.name}</Link> <br />
            ${product.price / 100}
            <br />
            {product.orderProduct.quantity}
            <button type="button" className="btn-primary">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
