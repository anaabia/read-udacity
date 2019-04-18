import React from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import '../styles/VoteScore.css'

const VoteScore = props => {
    const { object } = props
    return (
        <div className='vote-score'>
            <button id={`vote-up-${props.id}`} className='icon-button' onClick={props.onClickVoteUp}>
                <FontAwesome.FaThumbsOUp className='post-icon' />
            </button>
            {object && object.voteScore !== 0 && <span id={`vote-info-${props.id}`} className='icon-info'>{object.voteScore}</span>}
            <button id={`vote-down-${props.id}`} className='icon-button' onClick={props.onClickVoteDown}>
                <FontAwesome.FaThumbsODown className='post-icon' />
            </button>
        </div>
    )
}

export default VoteScore
