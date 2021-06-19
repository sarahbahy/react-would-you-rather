import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import TitleBar from './TitleBar'

class Leaderboard extends Component {
    render () {
        const { users, data } = this.props
        return (
            <Fragment>
                <TitleBar />
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th className='padding-right'>User</th>
                            <th>Questions Asked</th>
                            <th>Questions Answered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((user, index) => (
                               <tr key={user.uid}>
                                   <td>{index + 1}</td>
                                   <td>
                                    <ul className='fix-nav nav nav-account'>
                                        <li className='nav-li user-name'>
                                            <img 
                                                src={users[user.uid].avatarURL} 
                                                alt={`Avatar for ${users[user.uid].name}`}
                                                className='profile-pic scale-down-mid'/>
                                        </li>
                                        <li className='nav-li user-name'>{users[user.uid].name}</li>
                                    </ul>
                                   </td>
                                   <td>{user.questionsCreated}</td>
                                   <td>{user.questionsAnswered}</td>
                               </tr> 
                            ))
                        }
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

function mapStateToProps ({ users }) {
    const data = Object.keys(users).map((uid) => {
      return {
        uid,
        questionsCreated: users[uid].questions.length,
        questionsAnswered: Object.keys(users[uid].answers).length
      }  
    }).sort((a, b) => (b.questionsCreated + b.questionsAnswered) - (a.questionsCreated + a.questionsAnswered))

    return {
        users,
        data
    }
}

export default connect(mapStateToProps)(Leaderboard)