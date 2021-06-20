import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import Login from '../components/Login'
import { connect } from 'react-redux'
import { handleInitialUsers } from '../actions/shared'
import Dashboard from './Dashboard'
import questionDetails from './questionDetails'
import LoadingBar from 'react-redux-loading'
import addquestion from './AddQuestion'
import Leaderboard from './Leaderboard'
import PageNotFound from './PageNotFound'

class App extends Component {
  componentDidMount() {
    const AUTHED_ID = null;
    this.props.dispatch((handleInitialUsers(AUTHED_ID)))
  }
  // function Greeting(props) {
  //   const isLoggedIn = props.isLoggedIn;
  //   if (isLoggedIn) {
  //     return <UserGreeting />;
  //   }
  //   return <GuestGreeting />;
  // }
  // <Greeting isLoggedIn={false} />,
  render() {
    const { authedUser } = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar style={{ backgroundColor: '#25baa2'}}/>
            
            <Switch>
            <Route path='/' exact component={ authedUser === null ? Login:Dashboard} />
            {/* <Route   component={ Dashboard} /> */}
            <Route path='/questions/:question_id' component={ questionDetails} />
            <Route path='/add' exact component={addquestion } />
            <Route path='/leaderboard' exact component={ Leaderboard } />
            <Route path='*' component={PageNotFound} />
            </Switch>
            
        </Fragment>
      </Router>

    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)
