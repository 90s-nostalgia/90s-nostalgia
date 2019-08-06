import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {getUnfulfilledOrder} from '../store/order'
// import {Link} from 'react-router-dom'
import CartItem from './CartItem'

const Cart = props => {
  console.log('props.order', props.order)
  const products = props.order.products //not semantic, but shrug
  console.log('products', products)
  return (
    <div key={products.id}>
      <div>
        {products &&
          products.map(product => (
            <CartItem key={product.name} product={product} />
          ))}
      </div>
    </div>
  )
}

export default Cart

// export class UnfulfilledOrder extends Component {
//   componentDidMount() {
//     console.log(this.props)
//     const userId = this.props.userId
//     this.props.getUnfulfilledOrder(userId)
//   }

//   render() {
//     const unfulfilledOrder = this.props.unfulfilledOrder
//     console.log(unfulfilledOrder)

//     return (
//       <div>
//         <h1>Cart</h1>
//         {unfulfilledOrder ? <h1>'hi'</h1> : null}
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     unfulfilledOrder: state.order.unfulfilledOrder
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     getUnfulfilledOrder: userId => dispatch(getUnfulfilledOrder(userId))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(UnfulfilledOrder)
