import React from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import '../styles/VoteScore.css'

const VoteScore = props => {
    const { object } = props
    return (
        <div className='vote-score'>
            <button className='icon-button' onClick={props.onClickVoteUp}>
                <FontAwesome.FaThumbsOUp className='post-icon' />
            </button>
            {object && object.voteScore !== 0 && <span className='icon-info'>{object.voteScore}</span>}
            <button className='icon-button' onClick={props.onClickVoteDown}>
                <FontAwesome.FaThumbsODown className='post-icon' />
            </button>
        </div>
    )
}

export default VoteScore
