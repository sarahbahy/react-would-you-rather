import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
    state = {
        selectedUser: ''
    }

    handleLogin = (e) => {
        e.preventDefault()
        const { selectedUser } = this.state
        const { setAuthedUser } = this.props

        if (selectedUser) {
            setAuthedUser(selectedUser)
        } 

    }

    onSelectUser = (selectedUser) => this.setState({ selectedUser })

    render () {
        const { users } = this.props
        const { selectedUser } = this.state

        return (
            <Fragment>
                <div className='form signin-form'>
                    <div className='form-header'>
                        <p className='form-title'>Would You Rather - Log in</p>
                    </div>
                    <div className='form-body'>
                        <form onSubmit={this.handleLogin}>
                            <label className='sigin-body-p'>Select a user </label>
                            <div className='signin-body-form'>
                                <img 
                                    src={selectedUser === '' 
                                    ? 'https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png'
                                    : users[selectedUser].avatarURL}
                                    alt={users[selectedUser]}
                                    className='profile-pic'/> 
                                <select 
                                    className='login-user-select' 
                                    onChange={(e) => this.onSelectUser(e.target.value)}>
                                    <option value=""> Select a user</option>
                                    {
                                        Object.keys(users).map(user => 
                                            <option className='test' key={user} value={user}>
                                                {user}
                                            </option>)
                                    }
                                </select>                        
                            </div>

                            <button className={selectedUser === '' ? 'button disabled':'button enabled'} disabled={selectedUser === '' ? true : false}>Log In</button>
                        </form>
                    </div>
                </div>
            </Fragment>

        )
    }
}

function mapStateToProps ({ users }) {
    return {
        users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAuthedUser: (id) => {
            dispatch(setAuthedUser(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)