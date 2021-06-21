import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import TitleBar from './TitleBar'
import { formatDate } from '../utils/helpers'
import FaCheck from 'react-icons/lib/fa/check'
import { handleSavePollAnswer } from '../actions/shared'

class questionDetails extends Component {
    state = {
        selectedOption: ''
    }

    selectRadio = (e) => {
        this.setState({
            selectedOption: e.target.value
        })
    }

    submitAnswer = (e) => {
        e.preventDefault()

        const { savePollAnswer } = this.props
        const answer = this.state.selectedOption

        // i have succesfully got the answer text now check the _data file to see what is the expected arguments

        savePollAnswer(answer)
    }

    render () {
        const { poll, authorAvatar, author, optionOne, optionTwo, answered, isOneAnswered, isTwoAnswered } = this.props
        const {selectedOption} = this.state
        const optionOneVotes = poll.optionOne.votes.length
        const optionTwoVotes = poll.optionTwo.votes.length
        const optionOnePercentage = (optionOneVotes / (optionOneVotes + optionTwoVotes) * 100).toFixed(2)
        const optionTwoPercentage = (optionTwoVotes / (optionOneVotes + optionTwoVotes) * 100).toFixed(2)
        return (
            <Fragment>
                <TitleBar />
                <div className='form margin poll-details-form'>
                <div className='user-details'>
                    <p className="padding-left">{author} asks</p>
                    </div>
                    <div className='form-header'>
                        <img 
                        src={authorAvatar}
                        alt={`Avatar of ${author}`}
                        className='scale-down-mid profile-pic vertical-align'/>
                        
                        <span className=""> Would You Rather ? </span>
                        
                    </div>
                    
                    {
                        answered
                        ? (
                            <div className='form-body no-bottom-round'>
                            <ul className='no-padding no-margin'>
                                <li className='fix-answered-li full-width'>
                                    <span className={isOneAnswered ? 'answered' : ''}>{optionOne}</span>
                                    {isOneAnswered ? <FaCheck className='padding-left answered'/> : null}
                                    <span className='vote-result'>{`${optionOneVotes} vote(s) | ${optionOnePercentage}%`}</span>
                                </li>
                                <li className='no-padding fix-answered-li full-width'>
                                    <div className='or-seperator'>
                                        <p className='inline-p'>OR</p>
                                    </div>
                                </li>
                                <li className='padding-bottom fix-answered-li full-width'>
                                    <span className={isTwoAnswered ? 'answered' : ''}>{optionTwo}</span>
                                    {isTwoAnswered ? <FaCheck className='padding-left answered'/> : null}
                                    <span className='vote-result'>{`${optionTwoVotes} vote(s) | ${optionTwoPercentage}%`}</span>
                                </li>
                            </ul>
                            </div>
                        )
                        : (
                            <form onSubmit={this.submitAnswer} className='form-body no-bottom-round'>
                                <div className='radio_container-div'>
                                    <label className='radio_container'>
                                        <span className='input_radio'>{optionOne}</span>
                                        <input  
                                            className='hide'
                                            type="radio" 
                                            name='select_option' 
                                            value="optionOne"
                                            onClick={this.selectRadio}/>
                                        <span className='checkmark'></span>
                                    </label>

                                    <label className='radio_container'>
                                        <span className='input_radio'>{optionTwo}</span>
                                        <input 
                                            className='hide' 
                                            type="radio" 
                                            name='select_option' 
                                            value="optionTwo"
                                            onClick={this.selectRadio}/>
                                        <span className='checkmark'></span>
                                    </label>
                                </div>
                                <button className={selectedOption === '' ? 'button disabled' :'button enabled'} disabled={selectedOption === ''}>Submit</button>
                            </form>
                        ) 
                    }
                    
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps ({authedUser, questions, users}, props) {
    const { question_id } = props.match.params
    const poll = questions[question_id]
    const authorAvatar = users[poll.author].avatarURL
    const author = users[poll.author].id
    // const timestamp = formatDate (poll.timestamp)
    const optionOne = poll.optionOne.text
    const optionTwo = poll.optionTwo.text
    const isOneAnswered = poll.optionOne.votes.includes(authedUser)
    const isTwoAnswered = poll.optionTwo.votes.includes(authedUser)
    const answered = isOneAnswered || isTwoAnswered

    return {
        authorAvatar,
        author,
        // timestamp,
        optionOne,
        optionTwo,
        answered,
        isOneAnswered,
        isTwoAnswered,
        poll,
        users,
        questions,
        authedUser,
        question_id,
    }
}

function mapDispatchToProps (dispatch, props) {
    const { question_id } = props.match.params
    return {
        savePollAnswer : (answer) => {
            dispatch(handleSavePollAnswer(question_id, answer))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(questionDetails)