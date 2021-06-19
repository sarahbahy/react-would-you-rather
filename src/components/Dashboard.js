import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Poll from './questions'
import TitleBar from './TitleBar'
import { handleInitialquestions } from '../actions/shared'

class Dashboard extends Component {
    state = {
        selectedTab: 'unanswered'
    }

    componentDidMount () {
        this.props.dispatch(handleInitialquestions())
    }

    render () {
        const { answeredquestions, unansweredquestions,loadingBar } = this.props
            return (
            <Fragment>
                <TitleBar />
                <ul className='toggler'>
                    <li 
                        className={ this.state.selectedTab === 'unanswered' ? 'active' : 'li-hover'}
                        onClick={() => {this.setState({ selectedTab: 'unanswered'})}}>
                        Unanswered
                    </li>
                    <li 
                        className={ this.state.selectedTab === 'answered' ? 'active' : 'li-hover'}
                        onClick={() => {this.setState({ selectedTab: 'answered'})}}>
                        Answered
                    </li>
                </ul>
                {
                    !loadingBar.default && Object.keys(unansweredquestions).length === 0 && this.state.selectedTab === 'unanswered'
                    ? <p className='no-results'>no results</p>
                    : null
                }
                {
                    !loadingBar.default && Object.keys(answeredquestions).length === 0 && this.state.selectedTab === 'answered'
                    ? <p className='no-results'>no results</p>
                    : null
                }
                { 
                    loadingBar.default
                    ? <p className='loading'>Loading ...</p>
                    : this.state.selectedTab === 'unanswered' && Object.keys(unansweredquestions).length !== 0
                        ? <div className='question-form margin'>
                            {unansweredquestions.map((id) => (
                            <Poll key={id} id={id}/> ))}
                        </div>     
                        : this.state.selectedTab === 'answered' && Object.keys(answeredquestions).length !== 0
                        ? <div className='question-form margin'>
                            {answeredquestions.map((id) => (
                            <Poll key={id} id={id}/> ))}
                        </div>     
                        : null
                 }             
            </Fragment>
            )
    }
}

function mapStateToProps ({ questions, authedUser, users, loadingBar }) {
    const user = users[authedUser]

    const answeredquestions = Object.keys(questions).length !== 0
        ? Object.keys(user.answers)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
        : []

    const unansweredquestions = Object.keys(questions).length !== 0
        ? Object.keys(questions)
            .filter(pollID => !answeredquestions.includes(pollID))
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
        : []

    return {
        answeredquestions,
        unansweredquestions,
        loadingBar,
    }
}

export default connect(mapStateToProps)(Dashboard)