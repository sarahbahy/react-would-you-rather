import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import TitleBar from './TitleBar'
import { handleaddquestion } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class addquestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false,
    }
    
    handleOptionOne = (e) => {
        this.setState({
            optionOne: e.target.value
        })
    }

    handleOptionTwo = (e) => {
        this.setState({
            optionTwo: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { optionOne, optionTwo} = this.state
        this.props.addquestion(optionOne, optionTwo)
        this.setState(() => ({
            toHome: true
        }))
    }

    render () {
        const { toHome } = this.state
        const { optionTwo } = this.state
        const { optionOne } = this.state
        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <Fragment>
                <TitleBar />
                <div className='form margin poll-details-form'>
                    <div className='form-header'>
                        <p className='form-title'>Would You Rather ?</p>
                    </div>
                {
                    <form onSubmit={this.handleSubmit} id='addquestion-form' className='form-body'>
                        <div className='input-text-container'>
                            <textarea  
                                className='block input-text' 
                                name="optionOne" 
                                placeholder='Option One'
                                required
                                spellCheck="false"
                                onChange={this.handleOptionOne}
                                />

                            <textarea  
                                className='block input-text' 
                                name="optionTwo"
                                placeholder='Option Two'
                                required
                                spellCheck="false"
                                onChange={this.handleOptionTwo}
                                />
                        </div>

                        <button className={optionOne === '' || optionTwo === '' ? 'button disabled':'button enabled'} disabled={optionOne === '' || optionTwo === '' ? true : false}>Submit</button>
                    </form>
                }
                </div>
            </Fragment>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addquestion: (optionOne, optionTwo) => {
            dispatch(handleaddquestion(optionOne, optionTwo))
        }
    }
}

export default connect(null, mapDispatchToProps)(addquestion)