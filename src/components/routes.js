import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class Routes extends Component {
    componentDidMount() {
      const AUTHED_ID = null;
      this.props.dispatch((handleInitialUsers(AUTHED_ID)))
    }
  
    render() {
      const { authedUser } = this.props
      return (
        
  
      );
    }
  }
  
  function mapStateToProps ({ authedUser }) {
    return {
      authedUser
    }
  }
  
  export default connect(mapStateToProps)(Routes)

 