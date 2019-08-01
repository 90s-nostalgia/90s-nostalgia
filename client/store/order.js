import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADDED_TO_ORDER = 'ADDED_TO_ORDER'

/**
 * INITIAL STATE
 */
const defaultOrder = {
  orders: []
}

/**
 * ACTION CREATORS
 */
const addedToOrder = newOrder => {
  return {
    type: ADDED_TO_ORDER,
    newOrder
  }
}

/**
 * THUNK CREATORS
 */

export const addToOrder = productId => {
  return async dispatch => {
    const res = await axios.post(`/api/products/${productId}`)
    dispatch(addedToOrder(res.data))
  }
}

/**
 * REDUCER
 */
export default function(state = defaultOrder, action) {
  switch (action.type) {
    case ADDED_TO_ORDER:
      return {...state, orders: [...state.orders, action.newOrder]}
    default:
      return state
  }
}
