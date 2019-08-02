import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProduct = {
  allProducts: [],
  singleProduct: {}
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

const gotSingleProduct = singleProduct => {
  return {
    type: GOT_SINGLE_PRODUCT,
    singleProduct
  }
}

/**
 * THUNK CREATORS
 */
export const getAllProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(gotAllProducts(data))
  } catch (err) {
    console.error(err)
  }
}

export const getSingleProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(gotSingleProduct(data))
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
    case GOT_SINGLE_PRODUCT:
      return {...state, singleProduct: action.singleProduct}
    default:
      return state
  }
}
