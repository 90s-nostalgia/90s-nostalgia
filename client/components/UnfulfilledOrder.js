import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {getUnfulfilledOrder} from '../store/order'
// import {Link} from 'react-router-dom'
import CartProductCard from './CartProductCard'

const UnfulfilledOrder = props => {
  const products = props.order.products
  console.log(products)
  return (
    <div key={products.id}>
      <div>
        {products
          ? products.map(product => (
              <CartProductCard key={product.name} product={product} />
            ))
          : null}
      </div>
    </div>
  )
}

export default UnfulfilledOrder

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
