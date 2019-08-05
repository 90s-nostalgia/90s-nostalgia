import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllUsers} from '../store/user-for-admin'

export class AllUsers extends Component {
  componentDidMount() {
    this.props.getAllUsers()
  }

  render() {
    const allUsers = this.props.allUsers
    return (
      <div className="container">
        <div className="row">
          {allUsers
            ? allUsers.map(user => (
                <div key={user.id}>
                  <Link to={`/users/${user.id}`}>
                    {user.name} {user.email}
                  </Link>
                </div>
              ))
            : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allUsers: state.users.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
