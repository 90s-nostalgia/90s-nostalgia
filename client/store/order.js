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

export const addToOrder = (productId, userId) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${userId}/orders`, userId)
    dispatch(addedToOrder(data || defaultOrder))
  } catch (err) {
    console.error(err)
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
