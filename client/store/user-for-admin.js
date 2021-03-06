import axios from 'axios'

const defaultUsers = {
  allUsers: [],
  singleUser: {}
}

const GOT_ALL_USERS = 'GOT_ALL_USERS'

const gotAllUsers = allUsers => {
  return {
    type: GOT_ALL_USERS,
    allUsers
  }
}

export const getAllUsers = () => async dispatch => {
  try {
    let {data} = await axios.get('/api/users')
    dispatch(gotAllUsers(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultUsers, action) {
  switch (action.type) {
    case GOT_ALL_USERS:
      return {...state, allUsers: action.allUsers}
    default:
      return state
  }
}
