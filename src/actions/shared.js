import { receiveUsers, saveUserAnswer, addUserPoll } from '../actions/users'
import { receivequestions, savePollAnswer, addquestion } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { getInitialUsers } from '../utils/api'
import { getInitialquestions } from '../utils/api'
import { savePollAnswerAPI } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { savePollAPI } from '../utils/api'

export function handleInitialquestions () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialquestions()
            .then((questions) => {
                dispatch(receivequestions(questions))
                dispatch(hideLoading())
            })
    }
}

export function handleInitialUsers (AUTHED_ID) {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialUsers()
            .then((users) => {
                dispatch(receiveUsers(users))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
        })
    }
  }

export function handleSavePollAnswer (qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return savePollAnswerAPI({authedUser, qid, answer})
            .then(() => {
                dispatch(savePollAnswer(authedUser, qid, answer))
                dispatch(saveUserAnswer(authedUser, qid, answer))
                dispatch(hideLoading())
            })  
    }
}

export function handleaddquestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const author = authedUser
        dispatch(showLoading())
        return savePollAPI({optionOneText, optionTwoText, author})
            .then((poll) => {
                dispatch(addquestion(poll))
                dispatch(addUserPoll(authedUser, poll.id))
                dispatch(hideLoading())
            })
    }
}