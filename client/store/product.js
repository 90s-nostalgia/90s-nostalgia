import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'

/**
 * INITIAL STATE
 */
const defaultProduct = {
  allProducts: []
}

/**
 * ACTION CREATORS
 */
const gotAllProducts = allProducts => {
  return {
    type: GOT_ALL_PRODUCTS,
    allProducts
  }
}

/**
 * THUNK CREATORS
 */
export const getAllProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(gotAllProducts(data || defaultProduct))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return {...state, allProducts: action.allProducts}
    default:
      return state
  }
}
