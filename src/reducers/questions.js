import { RECEIVE_questions, SAVE_POLL_ANSWER, ADD_POLL } from '../actions/questions'

export default function questions(state= {}, action) {
    switch(action.type) {
        case RECEIVE_questions:
            return {
                ...state,
                ...action.questions
            }
        case SAVE_POLL_ANSWER:
        const { authedUser, qid, answer } = action
        return {
            ...state,
            [qid]: {
              ...state[qid],
              [answer]: {
                ...state[qid][answer],
                votes: state[qid][answer].votes.concat([authedUser])
              }
            }
          }
        case ADD_POLL: 
          return {
            ...state,
            [action.poll.id]: action.poll
          }
        default:
            return state
    }
}