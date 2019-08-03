import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADDED_TO_ORDER = 'ADDED_TO_ORDER'
const GOT_UNFULFILLED_ORDER = 'GOT_UNFULFILLED_ORDER'

/**
 * INITIAL STATE
 */
const defaultOrder = {
  unfulfilledOrder: []
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
const gotUnfulfilledOrder = unfulfilledOrder => {
  return {
    type: GOT_UNFULFILLED_ORDER,
    unfulfilledOrder
  }
}

/**
 * THUNK CREATORS
 */

export const addToOrder = (productId, userId) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${userId}/orders`, {productId})
    dispatch(addedToOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const getUnfulfilledOrder = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/orders`)
    dispatch(gotUnfulfilledOrder(data))
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
      return {
        ...state,
        unfulfilledOrder: [...state.unfulfilledOrder, action.newOrder]
      }
    case GOT_UNFULFILLED_ORDER:
      return {...state, unfulfilledOrder: action.unfulfilledOrder}
    default:
      return state
  }
}
