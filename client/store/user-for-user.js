import axios from 'axios'

const GOT_SINGLE_USER = 'GOT_SINGLE_USER'

const gotSingleUser = singleUser => {
  return {
    type: GOT_SINGLE_USER,
    singleUser
  }
}

export const getSingleUser = userId => async dispatch => {
  try {
    let {data} = await axios.get(`/api/users/${userId}`)
    dispatch(gotSingleUser(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case GOT_SINGLE_USER:
      return action.singleUser
    default:
      return state
  }
}
