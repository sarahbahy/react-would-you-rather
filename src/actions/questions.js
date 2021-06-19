export const RECEIVE_questions = 'RECEIVE_questions'
export const SAVE_POLL_ANSWER = 'SAVE_POLL_ANSWER'
export const SAVE_POLL = 'SAVE_POLL'
export const ADD_POLL = 'ADD_POLL'

export function receivequestions (questions) {
    return {
        type: RECEIVE_questions,
        ...questions
    }
}

export function savePollAnswer (authedUser, qid, answer) {
    return {
        type: SAVE_POLL_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function addquestion (poll) {
    return {
        type: ADD_POLL,
        poll,
    }
}